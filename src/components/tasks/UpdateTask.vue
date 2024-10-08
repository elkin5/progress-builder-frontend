<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Editar Tarea</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="Nombre de la tarea"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="description"
              label="Descripción de la tarea"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <!-- Selección del proyecto asociado -->
            <v-autocomplete
              v-model="selectedProject"
              :items="projects"
              :rules="[rules.required]"
              label="Proyecto"
              item-text="name"
              item-value="id"
              return-object
            ></v-autocomplete>

            <v-btn :disabled="!valid" color="success" @click="submit" block>
              Actualizar Tarea
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import taskService from '@/services/taskService';
import projectService from '@/services/projectService';

export default {
  data() {
    return {
      valid: false,
      name: '',
      description: '',
      selectedProject: null,
      projects: [],
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    };
  },
  created() {
    this.fetchProjects();
    this.loadTaskData();
  },
  methods: {
    // Cargar lista de proyectos para asociar la tarea a uno
    async fetchProjects() {
      try {
        this.projects = await projectService.getAllProjects();
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    },

    // Cargar los datos de la tarea existente
    async loadTaskData() {
      const taskId = this.$route.params.id; // Obtener el ID de la tarea desde la URL
      try {
        const task = await taskService.getTaskById(taskId);
        this.name = task.name;
        this.description = task.description;
        this.selectedProject = this.projects.find(
          project => project.id === task.project_id
        );
      } catch (error) {
        console.error('Error al cargar los datos de la tarea:', error);
      }
    },

    // Enviar los datos actualizados de la tarea
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const updatedTask = {
            name: this.name,
            description: this.description,
            project_id: this.selectedProject.id,
          };
          await taskService.updateTask(this.$route.params.id, updatedTask);
          this.$router.push('/tasks'); // Redirigir a la lista de tareas
        } catch (error) {
          console.error('Error al actualizar la tarea:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>