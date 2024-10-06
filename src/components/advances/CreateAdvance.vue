<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Crear Avance</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" label="Nombre del avance" :rules="[rules.required]" required></v-text-field>
            <v-textarea v-model="description" label="Descripción del avance" :rules="[rules.required]" required></v-textarea>

            <!-- Selección de la tarea asociada -->
            <v-autocomplete v-model="selectedTask" :items="tasks" :rules="[rules.required]" label="Tarea"
                            item-text="name" item-value="id" return-object></v-autocomplete>

            <v-btn :disabled="!valid" color="success" @click="submit" block>Crear Avance</v-btn>
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
      }
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
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const newAdvance = {
            name: this.name,
            description: this.description,
            task_id: this.selectedTask.id
          };
          await advanceService.createAdvance(newAdvance);
          this.$router.push('/advances');
        } catch (error) {
          console.error('Error al crear el avance:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>