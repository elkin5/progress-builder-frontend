<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <v-card class="pa-4">
            <!-- Título de la pantalla -->
            <v-card-title>
              <h3>Proyectos y tareas</h3>
            </v-card-title>
            <ProjectTaskBarChart />
          </v-card>

          <!-- Título de la pantalla -->
          <v-card-title>
            <h3>Usuarios por tipo</h3>
          </v-card-title>
          <UsersTypeBarChart />
        </v-card>

        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h3>Clientes por tipo</h3>
          </v-card-title>
          <ClientTypeBarChart />
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectTaskBarChart from '@/components/reports/ProjectTaskBarChart.vue';
import UsersTypeBarChart from "@/components/reports/UsersTypeBarChart.vue";
import ClientTypeBarChart from "@/components/reports/ClientTypeBarChart.vue";

export default {
  components: {
    ClientTypeBarChart,
    UsersTypeBarChart,
    ProjectTaskBarChart
  }
};
</script>