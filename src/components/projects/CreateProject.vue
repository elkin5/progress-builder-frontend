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

            <!-- Si no hay clientId, mostrar el selector de clientes -->
            <v-autocomplete
              v-if="!clientId"
              v-model="selectedClient"
              :items="clients"
              item-text="name"
              item-value="id"
              label="Seleccionar Cliente"
              :rules="[rules.required]"
              required
            ></v-autocomplete>

            <v-btn :disabled="!valid" color="success" @click="submit" block>Crear Proyecto</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import projectService from '@/services/projectService';
import clientService from '@/services/clientService';

export default {
  data() {
    return {
      valid: false,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      clientId: null, // ID del cliente (si se pasa por parámetros)
      selectedClient: null, // Cliente seleccionado si no viene un clientId
      clients: [], // Lista de clientes para seleccionar
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      }
    };
  },
  created() {
    // Verifica si hay un clientId en los parámetros de la URL
    this.clientId = this.$route.query.clientId || null;

    // Si no hay un clientId, carga la lista de clientes
    if (!this.clientId) {
      this.fetchClients();
    }
  },
  methods: {
    // Método para obtener la lista de clientes si no hay clientId
    async fetchClients() {
      try {
        this.clients = await clientService.getAllClients();
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const newProject = {
            name: this.name,
            description: this.description,
            start_date: this.startDate,
            end_date: this.endDate,
            client_id: this.clientId || this.selectedClient // Usar el clientId de la URL o el cliente seleccionado
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

<style scoped>
/* Estilos personalizados si son necesarios */
</style>