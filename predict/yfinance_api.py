################################
#
# Yahoo finance API example to retrieve stock historical data 
# Usage: python3 predict.py <stock_symbol>
#
################################

import sys
import yfinance as yf
import json
from datetime import datetime

#ticker = "NVDA"
period = "1y"

#stock = yf.Ticker(ticker)
#hist = stock.history(period=period)

def get_stock_data(symbol):
    # Download historical stock data for the past one year
    stock = yf.download(symbol, period="1y")

    # Prepare the data in the specified JSON format
    stock_data = []
    for index, row in stock.iterrows():
        data = {
            "date": index.strftime('%Y-%m-%d'),
            "open": round(row['Open'], 2),
            "high": round(row['High'], 2),
            "low": round(row['Low'], 2),
            "close": round(row['Close'], 2),
            "volume_ltc": round(row['Volume'], 2),  # Assuming 'Volume' represents volume in LTC (Litecoin)
            "volume_usd": round(row['Volume'] * row['Close'], 2)  # Volume in USD
        }
        stock_data.append(data)

    return stock_data

# show meta information about the history (requires history() to be called first)
#print(msft.history_metadata)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predict.py <stock_ticker>")
        sys.exit(1)

    symbol = sys.argv[1]
    stock_data = get_stock_data(symbol)

    # Print the formatted JSON data
    print(json.dumps(stock_data, indent=2))