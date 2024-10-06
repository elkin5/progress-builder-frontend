<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Crear Proyecto</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" label="Nombre" :rules="[rules.required]" required></v-text-field>
            <v-text-field v-model="description" label="Descripción" :rules="[rules.required]" required></v-text-field>
            <v-text-field v-model="startDate" label="Fecha de inicio" type="date" :rules="[rules.required]" required></v-text-field>
            <v-text-field v-model="endDate" label="Fecha de fin" type="date"></v-text-field>

            <v-btn :disabled="!valid" color="success" @click="submit" block>Crear Proyecto</v-btn>
          </v-form>
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
      valid: false,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      }
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const newProject = {
            name: this.name,
            description: this.description,
            start_date: this.startDate,
            end_date: this.endDate
          };
          await projectService.createProject(newProject);
          this.$router.push('/projects');
        } catch (error) {
          console.error('Error al crear el proyecto:', error);
        }
      }
    }
  }
};
</script>