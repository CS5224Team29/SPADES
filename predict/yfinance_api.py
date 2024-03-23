################################
#
# Yahoo finance API example to retrieve stock historical data 
#
################################

import yfinance as yf

ticker = "NVDA"
period = "1y"

stock = yf.Ticker(ticker)

# get all stock info
#print(msft.info)

# get historical market data
hist = stock.history(period=period)

# show meta information about the history (requires history() to be called first)
#print(msft.history_metadata)

print(hist[:30])
print(hist[-30:])