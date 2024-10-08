<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Proyectos</h2>
          </v-card-title>

          <!-- Botón Crear Cliente alineado a la derecha -->
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="goToCreateProject">Crear Proyecto</v-btn>
            </v-col>
          </v-row>

          <!-- Campo de búsqueda -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>

          <!-- Tabla de proyectos -->
          <v-data-table :items="projects" :headers="headers" :search="search" class="elevation-1">
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ formatDate(item.start_date) }}</td> <!-- Formatear fecha de inicio -->
                <td>{{ formatDate(item.end_date) }}</td> <!-- Formatear fecha de fin -->
                <td>{{ item.Client ? item.Client.name : 'Sin cliente'}}</td>
                <td>
                  <!-- Botón para editar proyecto -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="yellow darken-2"
                        icon
                        elevation="10"
                        @click="editProject(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-pencil</v-icon> <!-- Ícono para agregar avance -->
                      </v-btn>
                    </template>
                    <span>Editar proyecto</span>
                  </v-tooltip>

                  <!-- Botón para eliminar proyecto -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red darken-2"
                        icon
                        elevation="10"
                        @click="openDeleteDialog(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-delete</v-icon> <!-- Ícono para agregar avance -->
                      </v-btn>
                    </template>
                    <span>Eliminar proyecto</span>
                  </v-tooltip>

                  <!-- Botón para agregar tarea -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="green darken-2"
                        icon
                        elevation="10"
                        @click="addTask(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-file-plus</v-icon> <!-- Ícono para agregar avance -->
                      </v-btn>
                    </template>
                    <span>Agregar tarea</span>
                  </v-tooltip>
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
      search: '', // Campo de búsqueda
      headers: [
        { text: "ID", value: "id" }, // Nueva columna para el ID
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Fecha de Inicio", value: "start_date" }, // Nueva columna para la fecha de inicio
        { text: "Fecha de Fin", value: "end_date" }, // Nueva columna para la fecha de fin
        { text: "Cliente", value: "client.name" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
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

    // Formatear fecha en dd-mm-yyyy
    formatDate(date) {
      if (!date) return ''; // Si la fecha es nula o indefinida, devuelve una cadena vacía
      const d = new Date(date);
      const day = (`0${d.getDate()}`).slice(-2); // Asegurar que el día tenga dos dígitos
      const month = (`0${d.getMonth() + 1}`).slice(-2); // Asegurar que el mes tenga dos dígitos
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    },

    // Método para redirigir a la edición de proyecto
    editProject(project) {
      this.$router.push(`/projects/edit/${project.id}`);
    },

    // Método para redirigir a la creación de tarea asociada a un proyecto
    addTask(project) {
      this.$router.push({
        path: '/tasks/create', query: { projectId: project.id } // Asegúrate de enviar el projectId en la query
      });
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