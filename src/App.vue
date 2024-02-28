<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <h1 class="card-title">Dashboard</h1>
    <div class="wrapper">
      <div class="content-wrapper">
        <div class="content">
          <DatePicker />
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-4">
                <ChartContainer />
              </div>
              <div class="col-lg-4">
                <ColumnChartContainer
                  chart-title="Free Member This Year"
                  column-chart-id="revenue-chart-column"
                />
              </div>
              <div class="col-lg-4">
                <DonutChartContainer />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <TableContainer table-title="Free Member By Section" />
              </div>
              <div class="col-lg-9">
                <TableSectionContainer table-title="Free Member In Jan 2024" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
import ChartContainer from "@/components/ChartContainer.vue";
import TableContainer from "@/components/TableContainer.vue";
import TableSectionContainer from "@/components/TableSectionContainer.vue";
import ColumnChartContainer from "@/components/ColumnChartContainer.vue";
import DonutChartContainer from "@/components/DonutChartContainer.vue";

export default {
  components: {
    DatePicker,
    ChartContainer,
    TableContainer,
    ColumnChartContainer,
    DonutChartContainer,
    TableSectionContainer
  }
};
</script>