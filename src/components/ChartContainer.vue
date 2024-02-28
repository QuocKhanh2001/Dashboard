<template>
  <div class="chart-container">
    <h4>Free Member By Section</h4>
    <div :id="chartId" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { apiUrl } from "@/main";
const chartId = "amchart";

let totalLabel;

window.getTotalEmployeeCount = function(data) {
  return data.length;
};

onMounted(() => {
  axios
    .get(apiUrl, { withCredentials: true })
    .then(response => {
      const employeeData = response.data.data;

      if (Array.isArray(employeeData)) {
        const uniqueSections = [
          ...new Set(employeeData.map(employee => employee.section_name))
        ];

        const sectionData = uniqueSections.reduce((acc, section) => {
          const filteredData = employeeData.filter(
            employee => employee.section_name === section
          );
          acc[section] = window.getTotalEmployeeCount(filteredData);
          return acc;
        }, {});

        const chartData = Object.entries(sectionData).map(
          ([section, count]) => ({
            category: section,
            value: count
          })
        );

        const chart = am4core.create(chartId, am4charts.PieChart3D);
        chart.data = chartData;

        const series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "value";
        series.innerRadius = am4core.percent(50);

        const fadeInState = chart.states.create("fadeIn");
        fadeInState.properties.opacity = 1;

        chart.events.on("ready", () => {
          totalLabel = chart.seriesContainer.createChild(am4core.Label);
          totalLabel.text = window.getTotalEmployeeCount(employeeData);
          totalLabel.horizontalCenter = "middle";
          totalLabel.verticalCenter = "middle";
          totalLabel.fontSize = 30;
          totalLabel.fill = am4core.color("#333");

          chart.animate({ opacity: 1 }, 1000, am4core.ease.sinInOut);
        });
      } else {
        console.error("Error: Employee data is not an array.");
      }
    })
    .catch(error => {
      console.error("Error fetching data from API:", error);
    });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
