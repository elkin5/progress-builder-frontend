<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Crear Tarea</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" label="Nombre de la tarea" :rules="[rules.required]" required></v-text-field>
            <v-text-field v-model="description" label="Descripción de la tarea" :rules="[rules.required]"
                          required></v-text-field>

            <!-- Selección del proyecto asociado -->
            <!--            <v-autocomplete v-model="selectedProject" :items="projects" :rules="[rules.required]" label="Proyecto"-->
            <!--                            item-text="name" item-value="id" return-object></v-autocomplete>-->

            <!-- Si no hay projectId, mostrar el selector de proyectos -->
            <v-autocomplete
              v-if="!projectId"
              v-model="selectedProject"
              :items="projects"
              item-text="name"
              item-value="id"
              label="Seleccionar Proyecto"
              :rules="[rules.required]"
              required
            ></v-autocomplete>

            <v-btn :disabled="!valid" color="success" @click="submit" block>Crear Tarea</v-btn>
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
      projectId: null,
      selectedProject: null,
      projects: [],
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      }
    };
  },
  created() {
    this.projectId = this.$route.query.projectId || null; // Obtiene projectId de los parámetros de consulta

    if (!this.projectId) {
      this.fetchProjects(); // Si no hay projectId, carga la lista de proyectos
    }
  },
  methods: {
    async fetchProjects() {
      try {
        this.projects = await projectService.getAllProjects();
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const newTask = {
            name: this.name,
            description: this.description,
            project_id: this.projectId || this.selectedProject.id
          };
          await taskService.createTask(newTask);
          await this.$router.push('/tasks');
        } catch (error) {
          console.error('Error al crear la tarea:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>