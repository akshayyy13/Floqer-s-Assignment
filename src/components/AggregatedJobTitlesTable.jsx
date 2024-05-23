import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import jobData from "../data/Salaries.json";
const AggregatedJobTitlesTable = ({ year }) => {
  // Filter job data for the selected year
  const filteredJobs = jobData.filter((job) => job.work_year === parseInt(year));
  // Calculate aggregated job titles and their counts
  const aggregatedJobTitles = filteredJobs.reduce((acc, job) => {
    // console.log("Inside agg")
    if (acc[job.job_title]) {
      // console.log("Inside incr")
      acc[job.job_title]++;
    } else {
      // console.log("Inside create")
      acc[job.job_title] = 1;
    }
    return acc;
  }, {});
  return (
    <div className=" mt-8">
      <h3 className=" text-[2rem] p-3">Aggregated Job Titles for {year}</h3>
      <Table className=" text-center  mt-5">
        <Thead className=" text-richblack-200">
          <Tr className="border border-richblack-500 group">
            <Th>No.</Th>
            <Th className=" font-semibold tracking-wider p-4 ">Job Title</Th>
            <Th>Number of Jobs</Th>
          </Tr>
        </Thead>
        <Tbody className=" text-center ">
          {Object.keys(aggregatedJobTitles).map((jobTitle,index) => (
            <Tr key={jobTitle} className=" border border-richblack-500 group">
              <Td className="p-3 text-[rgb(255,60,60)]">{ index+ 1}</Td>
              <Td>{jobTitle}</Td>
              <Td>{aggregatedJobTitles[jobTitle]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default AggregatedJobTitlesTable;
