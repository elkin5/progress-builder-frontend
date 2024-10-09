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
            label: 'Tareas completadas',
            backgroundColor: '#d4edda', // Color verde claro para tareas completadas
            data: [] // Número de tareas completadas para cada proyecto
          },
          {
            label: 'Tareas pendientes',
            backgroundColor: 'rgba(182,80,102,0.8)', // Otro color para tareas pendientes
            data: [] // Número de tareas no completadas para cada proyecto
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true, // Empieza en 0 en el eje Y
            title: {
              display: true,
              text: 'Número de Tareas'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Proyectos'
            }
          }
        }
      }
    };
  },
  mounted() {
    // Cargar datos de los proyectos y las tareas
    this.fetchProjectTaskData();
  },
  methods: {
    async fetchProjectTaskData() {
      // Simulación de llamada a un servicio que devuelve proyectos con tareas completadas y pendientes
      const projectTaskData = await this.getProjectsWithTasks(); // Reemplaza esto con tu llamada al servicio

      // Actualizar los datos del gráfico
      this.chartData = {
        labels: projectTaskData.map(proj => proj.projectName),
        // labels: projectTaskData.projectName,
        datasets: [
          {
            label: 'Tareas completadas',
            backgroundColor: '#d4edda', // Color verde claro para tareas completadas
            data: projectTaskData.map(proj => proj.completedTasks) // Tareas completadas
            // data: projectTaskData.completedTasks // Tareas completadas
          },
          {
            label: 'Tareas pendientes',
            backgroundColor: 'rgba(192,114,130,0.8)', // Otro color para tareas pendientes
            data: projectTaskData.map(proj => proj.pendingTasks) // Tareas pendientes
            // data: projectTaskData.pendingTasks // Tareas pendientes
          }
        ]
      };
    },

    async getProjectsWithTasks() {
      // Simulación de los datos obtenidos desde un API
      return [{ projectName: 'Proyecto A', completedTasks: 10, pendingTasks: 5 }]
      // return [
      //   { projectName: 'Proyecto A', completedTasks: 10, pendingTasks: 5 },
      //   { projectName: 'Proyecto B', completedTasks: 15, pendingTasks: 10 },
      //   { projectName: 'Proyecto C', completedTasks: 8, pendingTasks: 2 },
      //   { projectName: 'Proyecto D', completedTasks: 20, pendingTasks: 5 },
      //   { projectName: 'Proyecto E', completedTasks: 12, pendingTasks: 8 }
      // ];
    }
  }
};
</script>

<style scoped>
/* Opcional: Puedes agregar estilos personalizados para ajustar el tamaño del gráfico */
</style>