<template>
  <canvas id="chart"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
  },
  methods: {
    init (dataSet) {
      const chart = document.getElementById('chart')
      if (chart) {
        const chartCtx = chart.getContext('2d')
        this.realtimeChart = new Chart(chartCtx, {
          type: 'doughnut',
          data: {
            datasets: [{ data: Object.values(dataSet), backgroundColor: Object.values(dataSet).map(___ => '#'+(Math.random()*0xFFFFFF<<0).toString(16)) }],
            labels: Object.keys(dataSet)
          },
          options: {
            cutoutPercentage: 2,
            animation: {
              animateScale: true
            }
          }
        })
        // this.updateRealtimeChart()
      } else {
        window.setTimeout(() => this.init(), 300)
      }
    }
  },
  mounted () {
  }
}
</script>
