<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Editar Avance</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="Nombre del avance"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="description"
              label="Descripción del avance"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <!-- Selección de la tarea asociada -->
            <v-autocomplete
              v-model="selectedTask"
              :items="tasks"
              :rules="[rules.required]"
              label="Tarea"
              item-text="name"
              item-value="id"
              return-object
            ></v-autocomplete>

            <v-btn :disabled="!valid" color="success" @click="submit" block>
              Actualizar Avance
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import advanceService from '@/services/advanceService';
import taskService from '@/services/taskService';

export default {
  data() {
    return {
      valid: false,
      name: '',
      description: '',
      selectedTask: null,
      tasks: [],
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    };
  },
  created() {
    this.fetchTasks();
    this.loadAdvanceData();
  },
  methods: {
    // Cargar lista de tareas para asociar el avance a una
    async fetchTasks() {
      try {
        this.tasks = await taskService.getAllTasks();
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    },

    // Cargar los datos del avance existente
    async loadAdvanceData() {
      const advanceId = this.$route.params.id; // Obtener el ID del avance desde la URL
      try {
        const advance = await advanceService.getAdvanceById(advanceId);
        this.name = advance.name;
        this.description = advance.description;
        this.selectedTask = this.tasks.find(
          task => task.id === advance.task_id
        );
      } catch (error) {
        console.error('Error al cargar los datos del avance:', error);
      }
    },

    // Enviar los datos actualizados del avance
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const updatedAdvance = {
            name: this.name,
            description: this.description,
            task_id: this.selectedTask.id,
          };
          await advanceService.updateAdvance(this.$route.params.id, updatedAdvance);
          await this.$router.push('/advances'); // Redirigir a la lista de avances
        } catch (error) {
          console.error('Error al actualizar el avance:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>