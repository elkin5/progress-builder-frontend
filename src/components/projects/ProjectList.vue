<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2>Proyectos</h2>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goToCreateProject">Crear Proyecto</v-btn>
          </v-card-title>

          <v-data-table :headers="headers" :items="projects" class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editProject(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteProject(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import projectService from '@/services/projectService';

export default {
  data() {
    return {
      projects: [],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Descripción', value: 'description' },
        { text: 'Fecha de inicio', value: 'start_date' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ]
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        this.projects = await projectService.getAllProjects();
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    },
    goToCreateProject() {
      this.$router.push('/projects/create');
    },
    editProject(project) {
      this.$router.push(`/projects/edit/${project.id}`);
    },
    async deleteProject(project) {
      try {
        await projectService.deleteProject(project.id);
        this.fetchProjects(); // Actualiza la lista
      } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>