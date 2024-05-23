import React, { useState, useEffect, useRef } from "react";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);


const JobLineGraph = ({ data }) => {
  const [jobCounts, setJobCounts] = useState({});
  const [averageSalaries, setAverageSalaries] = useState({});
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const calculateJobData = () => {
      const counts = {};
      const salarySums = {};
      const salaryCounts = {};
      const averages = {};
      data.forEach((job) => {
        const year = job.work_year;

        if (!counts[year]) {
          counts[year] = 0;
          salarySums[year] = 0;
          salaryCounts[year] = 0;
          averages[year] = job.average_salary;
        }

        counts[year] += job.total_jobs;
      });
      setJobCounts(counts);
      setAverageSalaries(averages);
    };

    calculateJobData();
  }, [data]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(jobCounts).sort(),
        datasets: [
          {
            label: "Number of Jobs",
            pointHoverBackgroundColor: "red",
            data: Object.keys(jobCounts)
              .sort()
              .map((year) => jobCounts[year]),
            fill: true,
            borderColor: "rgba(65, 192, 192, 1)",
            tension: 0.1,
            yAxisID: "y-axis-jobs",
          },
          {
            label: "Average Salary (USD)",
            pointHoverBackgroundColor: "red",
            data: Object.keys(averageSalaries)
              .sort()
              .map((year) => averageSalaries[year]),
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.1,
            pointStyle:"circle",
            yAxisID: "y-axis-salary",
          },
        ],
      },
      options: {
        scales: {
          "y-axis-jobs": {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Jobs",
              color: "rgba(65, 192, 192, 1)",
            },
            position: "left",
          },
          "y-axis-salary": {
            beginAtZero: true,
            title: {
              display: true,
              text: "Average Salary (USD)",
              color: "rgba(255, 99, 132, 1)",
            },
            position: "right",
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
          x: {
            title: {
              display: true,
              text: "Year",
              color: "red",
            },
          },
        },
      },
    });
  }, [jobCounts, averageSalaries]);

  return (
    <canvas ref={canvasRef} id="jobLineGraph" width="400" height="200"></canvas>
  );
};

const Graph = ({ jobsData }) => {
  return (
    <div className=" mt-8">
      <h2 className=" text-[2rem] p-3">Number of Jobs Over Time (2020-2024)</h2>
      <JobLineGraph data={jobsData} />
    </div>
  );
};

export default Graph;
