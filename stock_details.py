import json
import numpy
import yfinance as yf
from models.base import *
from datetime import datetime, timedelta
from sqlalchemy import func

from fastapi import FastAPI
from mangum import Mangum
from fastapi.responses import JSONResponse
import uvicorn

session = get_session()

app = FastAPI()
handler = Mangum(app)


def get_stock_basic_data(ticker):
    stock = yf.Ticker(ticker)
    keys = [
        "symbol",
        "longName",
        "industry",
        "website",
        "sector",
        "longBusinessSummary",
    ]
    data = stock.info
    final_data = {}
    for key in keys:
        value = ""
        if key in data:
            value = data[key]
        final_data[key] = value
    return final_data


def update_history(ticker, ticker_id):
    current_date = datetime.now()
    yesterday_date = datetime.now() - timedelta(days=1)
    stock = yf.Ticker(ticker)
    final_data = dict(ticker_id)
    try:
        hist = stock.history(period="2d")
        current = hist.iloc[-1]
        prev = hist.iloc[-2]
    except:
        hist = stock.history(period="5d")
        current = hist.iloc[-1]
        try:
            prev = hist.iloc[-2]
        except:
            prev = {"Open": 0, "Close": 0, "High": 0, "Low": 0, "Volume": 0}
    final_data["open_price"] = current["Open"]
    final_data["close_price"] = current["Close"]
    final_data["high"] = current["High"]
    final_data["low"] = current["Low"]
    final_data["volume"] = current["Volume"]
    final_data["prev_close_price"] = prev["Close"]
    final_data["change"] = final_data["close_price"] - final_data["prev_close_price"]
    final_data["change_percentage"] = (
        (final_data["close_price"] - final_data["prev_close_price"])
        / final_data["prev_close_price"]
        if final_data["prev_close_price"] != 0
        else 0
    )
    curr_history = TickerPrice(
        ticker_id=ticker_id.id,
        open_price=final_data["open_price"],
        close_price=final_data["close_price"],
        high=final_data["high"],
        low=final_data["low"],
        volume=final_data["volume"],
        date=current_date,
    )
    session.add(curr_history)
    session.commit()
    prev_history = TickerPrice(
        ticker_id=ticker_id.id,
        open_price=prev["Open"],
        close_price=prev["Close"],
        high=prev["High"],
        low=prev["Low"],
        volume=prev["Volume"],
        date=yesterday_date,
    )
    session.add(prev_history)
    session.commit()
    return final_data


def get_stock_data(ticker):
    ticker_id = session.query(Tickers).filter(Tickers.symbol == ticker).first()
    if not ticker_id:
        return "ticker not found"
    current_date = datetime.now().date()
    yesterday_date = datetime.now().date() - timedelta(days=1)
    curr_history = (
        session.query(TickerPrice)
        .filter(
            func.date(TickerPrice.date) == current_date,
            TickerPrice.ticker_id == ticker_id.id,
        )
        .first()
    )
    prev_history = (
        session.query(TickerPrice)
        .filter(
            func.date(TickerPrice.date) == yesterday_date,
            TickerPrice.ticker_id == ticker_id.id,
        )
        .first()
    )
    if not curr_history or not prev_history:
        final_data = update_history(ticker, ticker_id)
    else:
        final_data = {}
        ticker = dict(ticker_id)
        keys = [
            "id",
            "symbol",
            "name",
            "industry",
            "website",
            "sector",
        ]
        for key in keys:
            final_data[key] = str(ticker[key])
        curr_history = dict(curr_history)
        keys = ["open_price", "close_price", "high", "low", "volume"]
        for key in keys:
            final_data[key] = round(curr_history[key], 3)
        final_data["prev_close_price"] = round(prev_history.close_price, 3)
        final_data["change"] = (
            final_data["close_price"] - final_data["prev_close_price"]
        )
        final_data["change_percentage"] = (
            (final_data["close_price"] - final_data["prev_close_price"])
            / final_data["prev_close_price"]
            if final_data["prev_close_price"] != 0
            else 0
        )
    keys = ["open_price", "close_price", "high", "low", "volume"]
    for key in keys:
        final_data[key] = round(final_data[key], 3)
    final_data["change"] = round(final_data["change"], 3)
    final_data["prev_close_price"] = round(final_data["prev_close_price"], 3)
    final_data["change_percentage"] = round(final_data["change_percentage"], 3)
    return final_data


def lambda_handler(event, context):
    event_body = event.get("body")
    body = json.loads(event_body)
    ticker = body.get("ticker", "")
    final_data = get_stock_data(ticker)
    return {"statusCode": 200, "body": json.dumps(final_data)}


@app.get("/")
def read_root():
    return {"Welcome to": "SPADES"}


@app.get("/ticker/name")
def get_tickers_by_name(name):
    tickers = (
        session.query(Tickers)
        .filter(func.lower(Tickers.name).contains(name.lower()))
        .all()
    )
    ticker_details = []
    for ticker in tickers[:5]:
        ticker_details.append(get_stock_data(ticker.symbol))
    return {"data": ticker_details}


@app.get("/ticker/sector")
def get_tickers_by_sectors(sector):
    sectors = session.query(Tickers).filter(Tickers.sector == sector).all()
    sector_details = []
    for ticker in sectors[:5]:
        sector_details.append(get_stock_data(ticker.symbol))
    return {"data": sector_details}


@app.get("/watchlist/get")
def get_watchlist(user_id):
    user = session.query(User).get(user_id)
    stocks = session.query(UserStocks).filter(UserStocks.user_id == user_id).all()
    print(stocks)
    stock_details = []
    for ticker in stocks:
        ticker = session.query(Tickers).get(ticker.ticker_id)
        stock_details.append(get_stock_data(ticker.symbol))
    return {"data": stock_details}


@app.delete("/watchlist/delete")
def delete_watchlist(user_id, ticker_id):
    user_ticker = (
        session.query(UserStocks)
        .filter(UserStocks.user_id == user_id, UserStocks.ticker_id == ticker_id)
        .first()
    )
    session.delete(user_ticker)
    session.commit()
    stocks = session.query(UserStocks).filter(UserStocks.user_id == user_id)
    stock_details = []
    for ticker in stocks:
        stock_details.append(get_stock_data(ticker.symbol))
    return {"data": stock_details}


@app.post("/watchlist/add")
def add_watchlist(user_id, ticker_id):
    stock_exist = (
        session.query(UserStocks)
        .filter(UserStocks.user_id == user_id, UserStocks.ticker_id == ticker_id)
        .first()
    )
    print(stock_exist)
    if stock_exist:
        return {"data": "stock exist"}
    user_ticker = UserStocks(user_id=user_id, ticker_id=ticker_id)
    session.add(user_ticker)
    session.commit()
    stocks = session.query(UserStocks).filter(UserStocks.user_id == user_id)
    stock_details = []
    for ticker in stocks:
        ticker = session.query(Tickers).get(ticker_id)
        stock_details.append(get_stock_data(ticker.symbol))
    return {"data": stock_details}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
