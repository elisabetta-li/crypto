<template>
<div class="diagram">
  <div class="diagram-pie">
    <vue3-chart-js  v-bind="{ ...pieChart }" />
  </div>
</div>  
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  components: {
    Vue3ChartJs,
  },
      props: {
        crypto: {}
    },
  setup(props) {
    const pieChart = {
      type: "pie",
      data: {
        labels: ["BTC", "ETH", "USD"],
        datasets: [
          {
            backgroundColor: ["#e3c9a6", "#eed4b1", "#f3e7d7"],
            data: props.crypto,
          },
        ],
      },
    };
    return {
      pieChart,
    };
  }
}
</script>
<style>
.diagram {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgb(243, 231, 215)
}
.diagram-pie {
    max-width: 250px
}
</style>
