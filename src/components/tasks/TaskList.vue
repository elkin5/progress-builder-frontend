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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import taskService from '@/services/taskService';

export default {
  data() {
    return {
      tasks: [],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Descripción', value: 'description' },
        { text: 'Proyecto', value: 'project.name' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ]
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await taskService.getAllTasks();
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    },
    goToCreateTask() {
      this.$router.push('/tasks/create');
    },
    editTask(task) {
      this.$router.push(`/tasks/edit/${task.id}`);
    },
    async deleteTask(task) {
      try {
        await taskService.deleteTask(task.id);
        this.fetchTasks(); // Actualiza la lista
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    }
  }
};
</script>