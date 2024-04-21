import React, { useEffect, useState } from 'react';

import CanvasJSReact from '@canvasjs/react-stockcharts';
import { fetchStocksBySymbol } from '../../Services/stocks';


var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const Stocks = () => {


  const [isLoaded, setIsLoaded] = useState(false);
  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const [dataPoints3, setDataPoints3] = useState([]);





  useEffect(() => {
    const fetchInitialWatchlistData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const symbol = searchParams.get('id');
      try {

        const initialStocks = await fetchStocksBySymbol({ symbol: symbol });
        if (initialStocks) {
          console.log({ initialStocks })
        }

      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      }
    };

    fetchInitialWatchlistData();
  }, []);



  useEffect(() => {
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
  }, []);

  const options = {
    theme: "light2",
    title: {
      text: "AAPL:US"
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
    <div>
      <CanvasJSStockChart
        options={options}
        containerProps={containerProps}

      />
    </div>
  );
};

//onRef={ref => this.stockChart = ref}
export default Stocks;