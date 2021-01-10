<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
              <h5 class="card-category">SET DATA</h5>
              <h2 class="card-title">SET INDEX</h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle"
                :class="isRTL ? 'float-left' : 'float-right'"
                data-toggle="buttons"
              >
                <label
                  v-for="(option, index) in bigLineChartCategories"
                  :key="option.name"
                  class="btn btn-sm btn-primary btn-simple"
                  :class="{ active: bigLineChart.activeIndex === index }"
                  :id="index"
                >
                  <input
                    type="radio"
                    @click="initBigChart(index)"
                    name="options"
                    autocomplete="off"
                    :checked="bigLineChart.activeIndex === index"
                  />
                  <span class="d-none d-sm-block">{{ option.name }}</span>
                  <span class="d-block d-sm-none">
                    <i :class="option.icon"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "@/components/Dashboard/TaskList";
import config from "@/config";
import { Table, TableColumn } from "element-ui";

let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: "rgba(255,255,255,0)",
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
};

export default {
  name: "dashboard",
  middleware: "checklogin",
  components: {
    LineChart,
    BarChart,
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      bigLineChart: {},
      bigChartData: [],
      bigChartLabels: [],
    };
  },
  async fetch() {
    let data = await fetch(
      "https://fsdapigateway.herokuapp.com/api/funds"
    ).then((res) => res.json());
    this.bigChartLabels = data.reduce(
      (a, o) => (a.push(convertDate(o.date)), a),
      []
    );
    this.bigChartLabels = this.bigChartLabels.filter(onlyUnique);
    let set = data.reduce(
      (a, o) => (o.indexName == "SET" && a.push(o.index), a),
      []
    );
    this.bigChartData.push(set);
    let set50 = data.reduce(
      (a, o) => (o.indexName == "SET50" && a.push(o.index), a),
      []
    );
    this.bigChartData.push(set50);
    let set100 = data.reduce(
      (a, o) => (o.indexName == "SET100" && a.push(o.index), a),
      []
    );
    this.bigChartData.push(set100);

    this.bigLineChart = {
      activeIndex: 0,
      chartData: {
        datasets: [
          {
            ...bigChartDatasetOptions,
            data: this.bigChartData[0],
          },
        ],
        labels: this.bigChartLabels,
      },
      extraOptions: chartConfigs.purpleChartOptions,
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
      categories: [],
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return [
        { name: "SET", icon: "tim-icons icon-single-02" },
        {
          name: "SET50",
          icon: "tim-icons icon-gift-2",
        },
        { name: "SET100", icon: "tim-icons icon-tap-02" },
      ];
    },
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            ...bigChartDatasetOptions,
            data: this.bigChartData[index],
          },
        ],
        labels: this.bigChartLabels,
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
};
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function convertDate(date) {
  let today = new Date(date);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
}
</script>

