<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2>Tareas</h2>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goToCreateTask">Crear Tarea</v-btn>
          </v-card-title>

          <v-data-table :headers="headers" :items="tasks" class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editTask(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteTask(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.project ? item.project.name : 'Sin proyecto' }}</td> <!-- Solución -->
                <td>
                  <v-btn color="yellow darken-2" icon elevation="10" @click="editTask(item)">
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

    <!-- Diálogo de confirmación para eliminar tarea -->
    <confirm-dialog v-if="showDeleteDialog"
                    :message="'¿Estás seguro de que deseas eliminar la tarea ' + selectedTask.name + '?'"
                    @confirm="confirmDeleteTask" @cancel="closeDeleteDialog" />

    <!-- Mensajes de éxito y error -->
    <success-message v-if="showSuccessMessage" :message="successMessage" />
    <error-message v-if="showErrorMessage" :message="errorMessage" />
  </v-container>
</template>

<script>
import taskService from "@/services/taskService"; // Importa el servicio de tareas
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue"; // Importa el componente de confirmación

export default {
  components: {
    ConfirmDialog // Registrar el componente
  },
  data() {
    return {
      tasks: [], // Lista vacía, se llenará con los datos reales
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Proyecto", value: "project.name" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      search: '', // Para realizar la búsqueda
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: '',
      showDeleteDialog: false, // Estado para mostrar el diálogo de confirmación
      selectedTask: null // Tarea seleccionada para eliminar
    };
  },
  created() {
    this.loadTasks(); // Cargar la lista de tareas cuando el componente se monte
  },
  methods: {
    // Método para cargar la lista de tareas desde la API
    async loadTasks() {
      try {
        this.tasks = await taskService.getAllTasks(); // Llamada al servicio para obtener tareas
      } catch (error) {
        this.showError('Error al cargar la lista de tareas');
      }
    },

    // Método para redirigir a la edición de tarea
    editTask(task) {
      this.$router.push(`/tasks/edit/${task.id}`);
    },

    // Abrir diálogo de confirmación antes de eliminar
    openDeleteDialog(task) {
      this.selectedTask = task; // Guardar la tarea seleccionada
      this.showDeleteDialog = true; // Mostrar el diálogo
    },

    // Método para cerrar el diálogo de confirmación
    closeDeleteDialog() {
      this.selectedTask = null;
      this.showDeleteDialog = false; // Cerrar el diálogo
    },

    // Método para confirmar la eliminación de una tarea
    async confirmDeleteTask() {
      try {
        await taskService.deleteTask(this.selectedTask.id); // Llamada al servicio para eliminar tarea
        this.tasks = this.tasks.filter(task => task.id !== this.selectedTask.id); // Filtrar la lista local
        this.showSuccess('Tarea eliminada con éxito');
      } catch (error) {
        this.showError('Error al eliminar la tarea');
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
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>