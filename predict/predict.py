## Python script for predicting next-day stock price
## Usage: python3 predict.py <stock_ticker>
## Return an updated pd with predicted data
## Use Yahoo finance API to retrieve historical prices (internet requried) 
## Author: Raymond LUO
## Date: 2024 MAR 23

import sys
import pandas as pd
import numpy as np
import yfinance as yf

# from pandas_datareader.data import DataReader

# yf.pdr_override()

from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM

# symbol = 'NVDA'  # Replace with your stock symbol
period = '1y'


def predict_stock_price(symbol):
    stock = yf.download(symbol, period=period)
    #print(stock)

    # Create a new dataframe with only the Close column 
    df_close = stock.filter(["Close"])
    # print(df_close)

    # Convert the dataframe to a numpy array
    np_close = df_close.values
    # print(np_close)

    # Get the number of rows to train the model on - 95%
    training_data_len = int(np.ceil( len(np_close) * .95 ))
    # print(len(np_close))
    # print(training_data_len)

    scaler = MinMaxScaler(feature_range=(0,1))
    scaled_data = scaler.fit_transform(np_close)
    # print(scaled_data)

    # Create the scaled training data set
    train_data = scaled_data[0:int(training_data_len), :]
    # print(train_data)
    
    # Split the data into x_train and y_train data sets
    x_train = []
    y_train = []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i-60:i, 0])
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
    model.add(LSTM(128, return_sequences=True, input_shape= (x_train.shape[1], 1)))
    model.add(LSTM(64, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))

    # Compile the model
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model
    model.fit(x_train, y_train, batch_size=1, epochs=1)

    # Create the testing data set
    # Create a new array containing scaled values from index 1543 to 2002 
    test_data = scaled_data[training_data_len - 60: , :]
    # Create the data sets x_test and y_test
    x_test = []
    y_test = np_close[training_data_len:, :]
    for i in range(60, len(test_data)):
        x_test.append(test_data[i-60:i, 0])
        
    # Convert the data to a numpy array
    x_test = np.array(x_test)

    # Reshape the data
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1 ))
    #print(np.shape(x_test))
    # Get the models predicted price values 
    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)
    #print(predictions)

    # Get the root mean squared error (RMSE)
    rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))
    #print(rmse)

    # Plot the data
    train = df_close[:training_data_len]
    valid = df_close[training_data_len:]
    valid['Predictions'] = predictions
    print(valid)

    # Extend testing data for one more day
    last_60_points = scaled_data[-60:]
    #next_day_data = np.append(last_60_points[1:], [[predictions[-1][0]]], axis=0)
    last_60_points = np.reshape(last_60_points, (1, last_60_points.shape[0], 1))

    # Predict price for the next day
    next_day_prediction = model.predict(last_60_points)#next_day_data)
    next_day_prediction = scaler.inverse_transform(next_day_prediction)
    print("Predicted price for next day:", next_day_prediction[0][0])

    # Add the predicted price to the original dataframe
    next_day_close = next_day_prediction[0][0]
    next_day_date = stock.index[-1] + pd.Timedelta(days=1)
    next_day_data = pd.DataFrame({'Close': [next_day_close]}, index=[next_day_date])
    updated_df_close = df_close._append(next_day_data)

    return updated_df_close

# Main function
def main():
    if len(sys.argv) != 2:
        print("Usage: python predict.py <stock_ticker>")
        sys.exit(1)

    symbol = sys.argv[1]
    predicted_price = predict_stock_price(symbol)
    print(predicted_price)



if __name__ == "__main__":
    main()