<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h3>Proyectos y tareas</h3>
          </v-card-title>
          <v-card class="pa-4">
            <v-row>
              <v-col cols="12" md="5">
                <v-card class="pa-4">
                  <v-card-title>
                    <h5>Selecciona un Proyecto</h5>
                  </v-card-title>
                  <!-- Selector de Proyectos -->
                  <v-select
                    v-model="selectedProject"
                    :items="projects"
                    item-text="name"
                    item-value="id"
                    label="Seleccione un Proyecto"
                    @change="onProjectSelect"
                    return-object
                  ></v-select>
                </v-card>
              </v-col>
              <v-col cols="12" md="7">
                <ProjectTaskPieChart v-if="selectedProject" :projectId="selectedProject.id" />
              </v-col>
            </v-row>
          </v-card>

          <!-- Título de la pantalla -->
          <v-card class="pa-4">
            <v-card-title>
              <h3>Usuarios por tipo</h3>
            </v-card-title>
            <UsersTypeBarChart/>
          </v-card>

          <v-card class="pa-4">
            <!-- Título de la pantalla -->
            <v-card-title>
              <h3>Clientes por tipo</h3>
            </v-card-title>
            <ClientTypeBarChart/>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectTaskPieChart from '@/components/reports/ProjectTaskPieChart.vue';
import UsersTypeBarChart from "@/components/reports/UsersTypeBarChart.vue";
import ClientTypeBarChart from "@/components/reports/ClientTypeBarChart.vue";
import projectService from '@/services/projectService';

export default {
  data() {
    return {
      projects: [], // Lista de proyectos
      selectedProject: null, // Proyecto seleccionado
    };
  },
  async created() {
    await this.loadProjects();
  },
  components: {
    ClientTypeBarChart,
    UsersTypeBarChart,
    ProjectTaskPieChart
  },
  methods: {
    // Cargar proyectos desde el API
    async loadProjects() {
      try {
        this.projects = await projectService.getAllProjects(); // Llamada al API para obtener los proyectos
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    },
    // Acción al seleccionar un proyecto
    onProjectSelect(project) {
      this.$emit('project-selected', project.id); // Emitir el id del proyecto seleccionado
    },
  },
};
</script>