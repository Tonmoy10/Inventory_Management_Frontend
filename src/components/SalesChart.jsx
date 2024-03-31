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

      const dates = Result.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-GB'); // Adjust for timezone difference and format as 'yyyy-MM-dd'
      });

      const sales = Result.map(item => item.sale);
      const expenses = Result.map(item => item.expense); // Assuming you have an 'expense' property in your data

      setChartData({
        options: {
          chart: {
            id: 'sales-chart',
            toolbar: {
              show: false // Hide the chart toolbar
            }
          },
          xaxis: {
            categories: dates,
            labels: {
              style: {
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px'
              },
              formatter: function (value) {
                // Function to format large numbers
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'K';
                }
                return value;
              }
            }
          },
          legend: {
            show: true,
            labels: {
              useSeriesColors: true // Use colors from series for legend
            },
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '14px'
          },
          colors: ['#008FFB', '#FF4560'], // Custom line colors
          dataLabels: {
            enabled: false // Hide data labels
          },
          stroke: {
            curve: 'smooth' // Smooth curve for the lines
          },
          grid: {
            borderColor: '#f1f1f1' // Grid line color
          }
        },
        series: [{
          name: 'Sales',
          data: sales,
        }, {
          name: 'Expenses',
          data: expenses,
        }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Daily Cash Flow</h2>
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
