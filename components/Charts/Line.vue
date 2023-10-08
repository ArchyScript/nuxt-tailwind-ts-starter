<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { Chart, LineController, CategoryScale, ChartOptions } from 'chart.js';

  Chart.register(LineController, CategoryScale);

  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill?: boolean;
    }[];
  }

  const props = defineProps<{
    chartData: ChartData;
    chartOptions?: ChartOptions;
  }>();

  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  let chart: Chart | null = null;

  onMounted(() => {
    if (chartCanvas.value) {
      const ctx = chartCanvas.value.getContext('2d');
      if (ctx) {
        chart = new Chart(ctx, {
          type: 'line',
          data: props.chartData,
          options: props.chartOptions || {},
        });
      }
    }
  });
</script>
