import React, { useState, useEffect } from "react";
import JobStatsTable from "./JobStatsTable"; // Assuming the component is in a separate file
import jobData from "../data/Salaries.json"; // Assuming your JSON file is named data.json
import Graph from "./Graph";
import AggregatedJobTitlesTable from "./AggregatedJobTitlesTable";
import Loading from "./Loading";

const MainTable = () => {
  const [jobStats, setJobStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading,setLoading] =useState(true);
  useEffect(() => {
    // Function to process the data
    const processData = (data) => {
      // Accumulate total jobs year-wise
      const jobsByYear = data.reduce((acc, curr) => {
        const year = curr.work_year;
        if (acc[year]) {
          acc[year]++;
        } else {
          acc[year] = 1;
        }
        return acc;
      }, {});

      // Calculate average salary year-wise
      const averageSalaryByYear = data.reduce((acc, curr) => {
        const year = curr.work_year;
        const salaryUSD = parseFloat(curr.salary_in_usd);
        if (acc[year]) {
          acc[year].totalSalary += salaryUSD;
          acc[year].count++;
        } else {
          acc[year] = { totalSalary: salaryUSD, count: 1 };
        }
        return acc;
      }, {});

      // Convert accumulated data to the format needed for JobStatsTable
      const jobStatsData = Object.keys(jobsByYear).map((year) => ({
        work_year: year,
        total_jobs: jobsByYear[year],
        average_salary: (
          averageSalaryByYear[year].totalSalary /
          averageSalaryByYear[year].count
        ).toFixed(2),
      }));

      // Set the processed data to state
      setJobStats(jobStatsData);
      setLoading(false);
    };

    // Fetch data from JSON file
    processData(jobData);
  }, []);

  const handleRowClick = (year) => {
    setSelectedYear(year);
  };
  return (
    <div className=" p-10 flex flex-col justify-center ">
      <h1 className=" text-[2.2rem] p-3">Job Statistics</h1>
      {!loading &&

      <JobStatsTable data={jobStats} onRowClick={handleRowClick} />
      }
      {
        loading && <Loading/>
      }

      {selectedYear && (
        <AggregatedJobTitlesTable year={selectedYear} />
      )}
      <Graph jobsData={jobStats}  />
    </div>
  );
};

export default MainTable;
