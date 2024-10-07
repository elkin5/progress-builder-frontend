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
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.client ? item.client.name : 'Sin cliente' }}</td> <!-- Comprobación de client -->
                <td>
                  <v-btn color="yellow darken-2" icon elevation="10" @click="editProject(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn color="red darken-2" icon elevation="10" @click="openDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación para eliminar proyecto -->
    <confirm-dialog v-if="showDeleteDialog"
                    :message="'¿Estás seguro de que deseas eliminar el proyecto ' + selectedProject.name + '?'"
                    @confirm="confirmDeleteProject" @cancel="closeDeleteDialog" />

    <!-- Mensajes de éxito y error -->
    <success-message v-if="showSuccessMessage" :message="successMessage" />
    <error-message v-if="showErrorMessage" :message="errorMessage" />
  </v-container>
</template>

<script>
import projectService from "@/services/projectService"; // Importa el servicio de proyectos
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue"; // Importa el componente de confirmación

export default {
  components: {
    ConfirmDialog // Registrar el componente
  },
  data() {
    return {
      projects: [], // Lista vacía, se llenará con los datos reales
      headers: [
        {text: "Nombre", value: "name"},
        {text: "Descripción", value: "description"},
        {text: "Cliente", value: "client.name"}, // Se muestra el nombre del cliente si existe
        {text: "Acciones", value: "actions", sortable: false}
      ],
      search: '', // Para realizar la búsqueda
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: '',
      showDeleteDialog: false, // Estado para mostrar el diálogo de confirmación
      selectedProject: null // Proyecto seleccionado para eliminar
    };
  },
  created() {
    this.loadProjects(); // Cargar la lista de proyectos cuando el componente se monte
  },
  methods: {
    // Método para cargar la lista de proyectos desde la API
    async loadProjects() {
      try {
        this.projects = await projectService.getAllProjects(); // Llamada al servicio para obtener proyectos
      } catch (error) {
        this.showError('Error al cargar la lista de proyectos');
      }
    },

    // Método para redirigir a la edición de proyecto
    editProject(project) {
      this.$router.push(`/projects/edit/${project.id}`);
    },

    // Abrir diálogo de confirmación antes de eliminar
    openDeleteDialog(project) {
      this.selectedProject = project; // Guardar el proyecto seleccionado
      this.showDeleteDialog = true; // Mostrar el diálogo
    },

    // Método para cerrar el diálogo de confirmación
    closeDeleteDialog() {
      this.selectedProject = null;
      this.showDeleteDialog = false; // Cerrar el diálogo
    },

    // Método para confirmar la eliminación de un proyecto
    async confirmDeleteProject() {
      try {
        await projectService.deleteProject(this.selectedProject.id); // Llamada al servicio para eliminar proyecto
        this.projects = this.projects.filter(project => project.id !== this.selectedProject.id); // Filtrar la lista local
        this.showSuccess('Proyecto eliminado con éxito');
      } catch (error) {
        this.showError('Error al eliminar el proyecto');
      } finally {
        this.closeDeleteDialog(); // Cerrar el diálogo después de la operación
      }
    },

    // Mostrar mensaje de éxito
    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
    },

    // Mostrar mensaje de error
    showError(message) {
      this.errorMessage = message;
      this.showErrorMessage = true;
      this.showSuccessMessage = false;
    },

    // Método para redirigir a la creación de proyecto
    goToCreateProject() {
      this.$router.push('/projects/create');
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>