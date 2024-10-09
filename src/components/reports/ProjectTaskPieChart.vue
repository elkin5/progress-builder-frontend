<template>
  <div style="max-width: 600px; max-height: 500px;">
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import reportService from "@/services/reportService";

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  components: { Pie },
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        datasets: []
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tareas completadas vs pendientes por proyecto'
          }
        }
      }
    };
  },
  watch: {
    // Cuando el prop projectId cambia, se cargan las tareas asociadas a ese proyecto
    projectId: {
      immediate: true,
      handler(newProjectId) {
        if (newProjectId) {
          this.fetchProjectTaskData(newProjectId);
        }
      }
    }
  },
  methods: {
    async fetchProjectTaskData() {
      console.log('project id:', this.projectId);

      // Servicio que devuelve proyectos con tareas completadas y pendientes
      const projectTaskData = await this.getProjectsWithTasks(); // Reemplaza esto con tu llamada al servicio
      const dataList = [projectTaskData.completedTasks, projectTaskData.pendingTasks];

      // Actualizar los datos del gráfico
      this.chartData = {
        labels: ['Tareas Completadas', 'Tareas Pendientes'],
        datasets: [
          {
            label: 'Total',
            backgroundColor: ['#d4edda', 'rgba(192,114,130,0.8)'], // Colores para las tareas completadas y pendientes
            data: dataList
          }
        ]
      };
    },

    async getProjectsWithTasks() {
      // Datos obtenidos desde un API
      return await reportService.getCountTaskCompleteByProject(this.projectId);
    }
  }
};
</script>

<style scoped>
/* Opcional: Puedes agregar estilos personalizados para ajustar el tamaño del gráfico */
</style>