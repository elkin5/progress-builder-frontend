<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import reportService from "@/services/reportService";

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: { Bar },
  data() {
    return {
      projects: [], // Array de proyectos con datos de tareas
      chartData: {
        labels: [], // Etiquetas para el eje X (nombres de proyectos)
        datasets: [
          {
            label: 'Tipo de usuario',
            backgroundColor: '#d4edda',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Usuarios'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tipos de usuario'
            }
          }
        }
      }
    };
  },
  mounted() {
    // Cargar datos de los proyectos y las tareas
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      // Simulación de llamada a un servicio que devuelve proyectos con tareas completadas y pendientes
      const responseData = await this.getDataFromServer(); // Reemplaza esto con tu llamada al servicio

      // Actualizar los datos del gráfico
      this.chartData = {
        labels: responseData.map(proj => proj.userType),
        datasets: [
          {
            label: 'Tipo de usuario',
            backgroundColor: '#d4edda', // Color verde claro para tareas completadas
            data: responseData.map(proj => proj.count) // Tareas completadas
          }
        ]
      };
    },

    async getDataFromServer() {
      // Datos obtenidos desde un API
      return await reportService.getCountUsersByType();
    }
  }
};
</script>

<style scoped>
/* Opcional: Puedes agregar estilos personalizados para ajustar el tamaño del gráfico */
</style>