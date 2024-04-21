import React, { useEffect, useState } from 'react';

import CanvasJSReact from '@canvasjs/react-stockcharts';
import { fetchStocksBySymbol, predictStocksBySymbol } from '../../Services/stocks';
import { Box, CircularProgress, Typography } from '@mui/material';

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const Stocks = () => {


  const [isLoaded, setIsLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const [dataPoints3, setDataPoints3] = useState([]);
  const [Symbol, setSymbol] = useState(null)

  const [predictData, setPredictData] = useState([]);


  useEffect(() => {
    const fetchInitialStockData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const symbol = searchParams.get('id');
      setSymbol(symbol);

      if (symbol) {
        try {
          const data = await fetchStocksBySymbol({ symbol: symbol });

          if (data) {
            var dps1 = [], dps2 = [], dps3 = [];
            for (var i = 0; i < data.length; i++) {
              dps1.push({
                x: new Date(data[i].date),
                y: [
                  Number(data[i].open),
                  Number(data[i].high),
                  Number(data[i].low),
                  Number(data[i].close)
                ]
              });
              dps2.push({ x: new Date(data[i].date), y: Number(data[i].volume_usd) });
              dps3.push({ x: new Date(data[i].date), y: Number(data[i].close) });
            }

            setDataPoints1(dps1);
            setDataPoints2(dps2);
            setDataPoints3(dps3);

          }
          setIsLoaded(true);

        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
        try {
          const data = await predictStocksBySymbol({ symbol: symbol });
          if (data) {
            const predictData = data[data.length - 1];
            setPredictData(predictData)
            setLoad(true)
          }
        } catch (error) {
          console.error("Error fetching predict data:", error);
        }
      } else {
        fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
          .then(res => res.json())
          .then(
            (data) => {

              var dps1 = [], dps2 = [], dps3 = [];
              for (var i = 0; i < data.length; i++) {
                dps1.push({
                  x: new Date(data[i].date),
                  y: [
                    Number(data[i].open),
                    Number(data[i].high),
                    Number(data[i].low),
                    Number(data[i].close)
                  ]
                });
                dps2.push({ x: new Date(data[i].date), y: Number(data[i].volume_usd) });
                dps3.push({ x: new Date(data[i].date), y: Number(data[i].close) });
              }

              setDataPoints1(dps1);
              setDataPoints2(dps2);
              setDataPoints3(dps3);
              setIsLoaded(true);
            }
          )
        try {
          const data = await predictStocksBySymbol({ symbol: "AAPL" });
          if (data) {
            const predictData = data[data.length - 1];
            setPredictData(predictData)
            setLoad(true)
          }
        } catch (error) {
          console.error("Error fetching predict data:", error);
        }
      }

    };

    fetchInitialStockData();
  }, [setSymbol, setPredictData]);





  const options = {
    theme: "light2",
    title: {
      text: `${Symbol ? Symbol : "AAPL"}`
    },
    subtitles: [{
      text: "Price-Volume Trend"
    }],
    charts: [{
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: function (e) {
          return "";
        },
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e) {
            return "";
          }
        }
      },
      axisY: {
        title: "Litecoin Price",
        prefix: "$",
        tickLength: 0
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Price (in USD)",
        yValueFormatString: "$#,###.##",
        type: "candlestick",
        dataPoints: dataPoints1
      }]
    }, {
      height: 100,
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Volume",
        prefix: "$",
        tickLength: 0
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Volume",
        yValueFormatString: "$#,###.##",
        type: "column",
        dataPoints: dataPoints2
      }]
    }],
    navigator: {
      data: [{
        dataPoints: dataPoints3
      }],
      slider: {
        minimum: new Date("2018-05-01"),
        maximum: new Date("2018-07-01")
      }
    }
  };

  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto"
  };

  return (
    <>
      {isLoaded ? (
        <>
          <CanvasJSStockChart
            options={options}
            containerProps={containerProps}

          />
        </>

      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh',
          }}
        >
          <CircularProgress />
        </Box >
      )}

      {load ? (
        <Box sx={{
          flexGrow: 1, p: 3, display: 'flex',
          justifyContent: "center",
          alignItems: 'center'
        }}>
          <Typography variant="h6" noWrap>
            Predict Price On Next Day: {predictData.close}
          </Typography>
        </Box>


      ) : (
        <Box sx={{
          flexGrow: 1, p: 3, display: 'flex',
          justifyContent: "center",
          alignItems: 'center',
        }}>
          <Typography variant="h6" noWrap>
            Predict Price On Next Day:
            <Box
              sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                height: '20vh',
              }}
            >
              <CircularProgress />
            </Box >
          </Typography>
        </Box>

      )}
    </>
  );
}

export default Stocks;