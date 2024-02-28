
<template>
  <div class="chart-container">
    <h4>Members According To Project</h4>
    <div :id="donutChartId" style="width: 100%; height: 300px;"></div>
  </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import axios from "axios";
import { anotherUrl } from "@/main";

export default {
  props: {
    chartTitle: String
  },
  data() {
    return {
      cvProjectsData: []
    };
  },
  computed: {
    chartData() {
      const totalEmployees = this.cvProjectsData.length;
      return this.cvProjectsData.map(projects => ({
        category: projects.project_name,
        value: (1 / totalEmployees) * 100
      }));
    },
    donutChartId() {
      return "donutChart-" + this._uid;
    }
  },
  watch: {
    chartData: {
      handler: "renderChart",
      immediate: true
    }
  },
  methods: {
    async fetchCvProjectsDataFromAPI() {
      try {
        const response = await axios.get(anotherUrl, { withCredentials: true });
        this.cvProjectsData = response.data;
        // Sắp xếp mảng dựa trên số lần xuất hiện của project_name
        this.cvProjectsData.sort((a, b) => b.count - a.count);

        // Chọn 10 phần tử đầu tiên
        this.cvProjectsData = this.cvProjectsData.slice(0, 13);
      } catch (error) {
        console.error("Error fetching data from cv_projects API:", error);
      }
    },

    renderChart() {
      const chart = am4core.create(this.donutChartId, am4charts.PieChart3D);
      chart.data = this.chartData;

      const series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "value";
      series.dataFields.category = "category";
      series.innerRadius = am4core.percent(50);
      series.labels.template.text = "{category}: {value}%";
      series.labels.template.radius = am4core.percent(-20);
      series.labels.template.fill = am4core.color("back");
      series.labels.template.horizontalCenter = "middle";

      const totalLabel = chart.seriesContainer.createChild(am4core.Label);
      totalLabel.text = `${this.cvProjectsData.length}`;
      totalLabel.horizontalCenter = "middle";
      totalLabel.verticalCenter = "middle";
      totalLabel.fontSize = 30;
      totalLabel.fill = am4core.color("#333");
    }
  },
  created() {
    this.fetchCvProjectsDataFromAPI();
  }
};
</script>
