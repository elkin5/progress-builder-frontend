<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Listado de Tareas</h2>
          </v-card-title>

          <!-- Botón Crear Cliente alineado a la derecha -->
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="goToCreateTask">Crear Tarea</v-btn>
            </v-col>
          </v-row>

          <!-- Campo de búsqueda -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>

          <!-- Tabla de clientes -->
          <v-data-table :items="tasks" :headers="headers" :search="search" class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <!-- Botón para editar tarea -->
              <v-icon small @click="editTask(item)">mdi-pencil</v-icon>

              <!-- Botón para eliminar tarea -->
              <v-icon small @click="deleteTask(item)">mdi-delete</v-icon>

              <!-- Botón para agregar avance -->
              <v-icon small @click="addAdvance(item)" color="green">mdi-plus</v-icon>

              <!-- Botón para dar por terminada la tarea -->
              <v-icon small @click="completeTask(item)" color="blue">mdi-check</v-icon>
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

                  <v-btn color="green darken-2" icon elevation="10" @click="addAdvance(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>

                  <v-btn color="blue darken-2" icon elevation="10" @click="completeTask(item)">
                    <v-icon>mdi-check</v-icon>
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
      search: '', // Campo de búsqueda
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Proyecto", value: "project.name" }, // Se muestra el nombre del proyecto si existe
        { text: "Acciones", value: "actions", sortable: false }
      ],
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

    // Método para agregar avance a una tarea
    addAdvance(task) {
      this.$router.push({ path: '/advances/create', query: { taskId: task.id } });
    },

    // Método para dar por terminada la tarea
    async completeTask(task) {
      try {
        // Actualiza la tarea como completada
        await taskService.updateTask(task.id, { ...task, status: 'completed' });
        this.showSuccess('Tarea marcada como completada');
        await this.loadTasks(); // Recargar la lista de tareas
      } catch (error) {
        this.showError('Error al completar la tarea');
      }
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
    },

    // Método para redirigir a la creación de tarea
    goToCreateTask() {
      this.$router.push('/tasks/create');
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>