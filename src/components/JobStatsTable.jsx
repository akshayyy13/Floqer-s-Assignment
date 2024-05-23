import React, {  useState } from "react";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
const JobStatsTable = ({ data,onRowClick }) => {
  // console.log(data)
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
    // console.log("done")
  };

  return (
    <Table className=" text-center">
      <Thead className="text-richblack-200">
        <Tr className="border border-richblack-500 group">
          <Th className=" font-semibold tracking-wider p-4 ">No.</Th>
          <Th className=" " onClick={() => handleSort("work_year")}>
            <div className=" flex justify-center gap-2 items-center">Year</div>
          </Th>
          <Th className=" " onClick={() => handleSort("total_jobs")}>
            <div className=" flex justify-center gap-2 items-center">
              Total Jobs
            </div>
          </Th>
          <Th className=" " onClick={() => handleSort("average_salary")}>
            <div className=" flex justify-center gap-2 items-center">
              Average Salary($)
            </div>
          </Th>
        </Tr>
      </Thead>
      <Tbody className=" text-center ">
        {sortedData.map((item, index) => (
          <Tr
            key={index}
            className=" border border-richblack-500 group cursor-pointer hover:text-[rgb(255,60,60)]  transition-all duration-200"
            onClick={() => onRowClick(item.work_year)}
          >
            <Td className="p-3 text-[rgb(255,60,60)]">{index + 1}</Td>
            <Td>{item.work_year}</Td>
            <Td>{item.total_jobs}</Td>
            <Td>{item.average_salary}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default JobStatsTable;
