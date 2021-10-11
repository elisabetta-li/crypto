<template>
<div class="graph">
  <vue3-chart-js v-bind="{ ...lineChart }" />
</div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import dataLabels from "chartjs-plugin-datalabels";
export default {
  components: {
    Vue3ChartJs,
  },
      props: {
        cur_full: {},
        date_full:{}
    },
  
  setup(props) {
    const lineChart = {
      type: "line",
      plugins: [dataLabels],
      data: {
        labels: props.date_full,
        datasets: [
          {
            label: "Crypto",
            data: props.cur_full,
            fill: false,
            borderColor: "#fff",
            backgroundColor: "#27262e",
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderRadius: 10,
            color: "#e3c9a6",
            font: {
              weight: "bold",
            },
            formatter: Math.round,
            padding: 6,
          },
        },
      },
    };

    return {
      lineChart,
    };
  }
}
</script>
<style>
.graph {
    width: 95%;
    background: #27262e;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.5);
    padding: 15px; 
}
@media(max-width: 440px) {
  .graph {
    width: 100%;
}
}
</style>
