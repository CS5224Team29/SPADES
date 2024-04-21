import sys
import pandas as pd
import numpy as np
import yfinance as yf
import json
from datetime import datetime, timedelta

# from pandas_datareader.data import DataReader

# yf.pdr_override()

from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM
from fastapi import FastAPI
from mangum import Mangum
from fastapi.responses import JSONResponse
import uvicorn

# symbol = 'NVDA'  # Replace with your stock symbol
period = "1y"

app = FastAPI()
handler = Mangum(app)


@app.post("/predict")
def predict_stock_price(symbol):
    stock = yf.download(symbol, period=period)
    # print(stock)

    # Create a new dataframe with only the Close column
    df_close = stock.filter(["Close"])
    # print(df_close)

    # Convert the dataframe to a numpy array
    np_close = df_close.values
    # print(np_close)

    # Get the number of rows to train the model on - 95%
    training_data_len = int(np.ceil(len(np_close) * 0.95))
    # print(len(np_close))
    # print(training_data_len)

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(np_close)
    # print(scaled_data)

    # Create the scaled training data set
    train_data = scaled_data[0 : int(training_data_len), :]
    # print(train_data)

    # Split the data into x_train and y_train data sets
    x_train = []
    y_train = []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i - 60 : i, 0])
        y_train.append(train_data[i, 0])
        # if i<= 61:
        #     print(x_train)
        #     print(y_train)
        #     print()

    # Convert the x_train and y_train to numpy arrays
    x_train, y_train = np.array(x_train), np.array(y_train)

    # Reshape the data
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    # Build the LSTM model
    model = Sequential()
    model.add(LSTM(128, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(LSTM(64, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))

    # Compile the model
    model.compile(optimizer="adam", loss="mean_squared_error")

    # Train the model
    model.fit(x_train, y_train, batch_size=1, epochs=1)

    # Create the testing data set
    # Create a new array containing scaled values from index 1543 to 2002
    test_data = scaled_data[training_data_len - 60 :, :]
    # Create the data sets x_test and y_test
    x_test = []
    y_test = np_close[training_data_len:, :]
    for i in range(60, len(test_data)):
        x_test.append(test_data[i - 60 : i, 0])

    # Convert the data to a numpy array
    x_test = np.array(x_test)

    # Reshape the data
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
    # print(np.shape(x_test))
    # Get the models predicted price values
    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)
    # print(predictions)

    # Get the root mean squared error (RMSE)
    rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))
    # print(rmse)

    # Plot the data
    train = df_close[:training_data_len]
    valid = df_close[training_data_len:]
    valid["Predictions"] = predictions
    # print(valid)

    # Extend testing data for one more day
    last_60_points = scaled_data[-60:]
    # next_day_data = np.append(last_60_points[1:], [[predictions[-1][0]]], axis=0)
    last_60_points = np.reshape(last_60_points, (1, last_60_points.shape[0], 1))

    # Predict price for the next day
    next_day_prediction = model.predict(last_60_points)  # next_day_data)
    next_day_prediction = scaler.inverse_transform(next_day_prediction)
    print("Predicted price for next day:", next_day_prediction[0][0])

    # Add the predicted price to the original dataframe
    next_day_close = next_day_prediction[0][0]
    next_day_date = stock.index[-1] + pd.Timedelta(days=1)
    # next_day_data = pd.DataFrame({'Close': [next_day_close]}, index=[next_day_date])
    # updated_df_close = df_close._append(next_day_data)

    # Prepare the data in the specified JSON format
    stock_data = []
    for index, row in stock.iterrows():
        data = {
            "date": index.strftime("%Y-%m-%d"),
            "open": round(row["Open"], 2),
            "high": round(row["High"], 2),
            "low": round(row["Low"], 2),
            "close": round(row["Close"], 2),
            "volume_ltc": round(
                row["Volume"], 2
            ),  # Assuming 'Volume' represents volume in LTC (Litecoin)
            "volume_usd": round(row["Volume"] * row["Close"], 2),  # Volume in USD
        }
        stock_data.append(data)
    # print(stock_data)

    predict_data = {
        "date": next_day_date.strftime("%Y-%m-%d"),
        "open": stock_data[-1]["close"],
        "high": round(next_day_close, 2),
        "low": round(next_day_close, 2),
        "close": round(next_day_close, 2),
        "volume_ltc": 0.0,  # Placeholder for volume in LTC
        "volume_usd": 0.0,  # Placeholder for volume in USD
    }
    # print(predict_data)
    stock_data.append(predict_data)

    # Convert all float32 values to float for JSON serialization
    def convert_float(obj):
        if isinstance(obj, np.float32):
            return float(obj)
        return obj

    # Convert to JSON format with proper float conversion
    json_data = json.dumps(stock_data, default=convert_float, indent=2)

    return {"data": json_data}


@app.post("/stock-data")
def get_stock_data(symbol):
    # Download historical stock data for the past one year
    stock = yf.download(symbol, period="1y")

    # Prepare the data in the specified JSON format
    stock_data = []
    for index, row in stock.iterrows():
        data = {
            "date": index.strftime("%Y-%m-%d"),
            "open": round(row["Open"], 2),
            "high": round(row["High"], 2),
            "low": round(row["Low"], 2),
            "close": round(row["Close"], 2),
            "volume_ltc": round(
                row["Volume"], 2
            ),  # Assuming 'Volume' represents volume in LTC (Litecoin)
            "volume_usd": round(row["Volume"] * row["Close"], 2),  # Volume in USD
        }
        stock_data.append(data)

    return {"data": stock_data}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
