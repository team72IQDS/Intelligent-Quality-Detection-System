import React, { useEffect, useState } from "react";
import { mockData } from "../data/tempData";

// react plugin used to create charts
import "chart.js/auto";
import { Chart, Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const DataGraphs = ({ data }) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (!data) return;

    const c = data.filter(
      (item) => item.ClassNames !== undefined && item.ClassNames !== ""
    );

    const c1 = c.sort((a, b) => {
      if (a.date === b.date) {
        return b.time.localeCompare(a.time);
      }
      return b.date.localeCompare(a.date);
    });
    setChartData(
      c1.map((x, k) => ({
        defective:
          x.ClassNames.indexOf("Dent_Can") !== -1 ||
          x.ClassNames.indexOf("Lid_Open") !== -1
            ? "Yes"
            : "No",
        id: k,
        ...x,
      }))
    );
  }, [data]);

  if (!chartData) return;

  // Extract data for the graphs
  const defectiveCount = chartData.filter(
    (item) => item.defective === "Yes"
  ).length;
  const notDefectiveCount = chartData.filter(
    (item) => item.defective === "No"
  ).length;
  const canIds = chartData.map((item) => item.id);

  // Bar Chart Data
  const barChartData = {
    labels: ["Defective", "Not Defective"],
    datasets: [
      {
        label: "Defective vs Not Defective",
        data: [defectiveCount, notDefectiveCount],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ["Defective", "Not Defective"],
    datasets: [
      {
        data: [defectiveCount, notDefectiveCount],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  // Line Chart Data
  const lineChartData = {
    labels: canIds,
    datasets: [
      {
        label: "Defective",
        data: chartData.map((item) => (item.defective === "Yes" ? 1 : 0)),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Not Defective",
        data: chartData.map((item) => (item.defective === "No" ? 1 : 0)),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  // Set options for the Pie chart
  const pieChartOptions = {
    maintainAspectRatio: false, // This property prevents chart from maintaining an aspect ratio
    responsive: true, // This property makes the chart responsive
  };

  return (
    <div className="data-graphs">
      <div className="graph">
        <Bar data={barChartData} />
      </div>
      <div className="graph">
        <Pie
          data={pieChartData}
          options={pieChartOptions}
          width={200} // Adjust the width
          height={200} // Adjust the height
        />
      </div>
      <div className="graph">
        <Line data={lineChartData} />
      </div>
    </div>
  );
};

export default DataGraphs;
