import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const SalesChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/sale');
      const { Result } = response.data;

      const dates = Result.map(item => item.date.split("T")[0]);
      const sales = Result.map(item => item.sale);

      setChartData({
        options: {
          chart: {
            id: 'sales-chart',
          },
          xaxis: {
            categories: dates,
          },
        },
        series: [{
          name: 'Sales',
          data: sales,
        }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Sales Chart</h2>
      {chartData && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="500"
        />
      )}
    </div>
  );
};

export default SalesChart;