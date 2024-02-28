<template>
  <div class="chart-container">
    <h4>{{ chartTitle }}</h4>
    <div class="card-body">
      <div class="tab-content">
        <canvas :id="columnChartId" width="500" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import axios from "axios";
import { apiUrl } from "@/main";
export default {
  props: {
    chartTitle: String,
    columnChartId: String
  },
  data() {
    return {
      employeeData: []
    };
  },
  mounted() {
    axios
      .get(apiUrl, { withCredentials: true })
      .then(response => {
        this.employeeData = response.data.data;

        const uniqueSections = [
          ...new Set(this.employeeData.map(employee => employee.section_name))
        ];

        const sectionData = uniqueSections.reduce((acc, section) => {
          const filteredData = this.employeeData.filter(
            employee => employee.section_name === section
          );
          acc[section] = filteredData.length;
          return acc;
        }, {});

        const labels = Object.keys(sectionData);
        const data = Object.values(sectionData);

        const chartData = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#CC00FF",
                "#9999FF",
                "#6633FF",
                "#00B2EE",
                "#9999CC",
                "#B452CD",
                "#33CCFF",
                "#66CCFF",
                "#CC99FF",
                "#669999",
                "#CC6699",
                "#0033CC",
                "#FF0099"
              ],
              borderColor: "#fff",
              borderWidth: 2.5
            }
          ]
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false
        };

        const ctx = document
          .getElementById(this.columnChartId)
          .getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: options
        });
      })
      .catch(error => {
        console.error("Error fetching data from API:", error);
      });
  }
};
</script>
