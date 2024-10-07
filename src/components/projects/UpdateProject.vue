<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Editar Proyecto</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- Campo Nombre del Proyecto -->
            <v-text-field v-model="name" label="Nombre" :rules="[rules.required]" required></v-text-field>

            <!-- Campo Descripción del Proyecto -->
            <v-text-field v-model="description" label="Descripción" :rules="[rules.required]" required></v-text-field>

            <!-- Fecha de Inicio -->
            <v-text-field v-model="startDate" label="Fecha de inicio" type="date" :rules="[rules.required]" required></v-text-field>

            <!-- Fecha de Fin -->
            <v-text-field v-model="endDate" label="Fecha de fin" type="date"></v-text-field>

            <!-- Si no se pasa clientId, permite seleccionar un cliente -->
            <v-autocomplete
              v-if="!clientId"
              v-model="selectedClient"
              :items="clients"
              item-text="name"
              item-value="id"
              label="Cliente"
              :rules="[rules.required]"
              required
            ></v-autocomplete>

            <v-btn :disabled="!valid" color="success" @click="submit" block>Guardar Cambios</v-btn>
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
      clientId: null,
      selectedClient: null,
      clients: [],
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    };
  },
  created() {
    const projectId = this.$route.params.id; // Obtener el ID del proyecto desde la URL
    this.loadProject(projectId); // Cargar los datos del proyecto
  },
  methods: {
    // Método para cargar los datos del proyecto a partir de su ID
    async loadProject(id) {
      try {
        const project = await projectService.getProjectById(id);

        // Convertir las fechas al formato 'YYYY-MM-DD' si es necesario
        this.name = project.name;
        this.description = project.description;
        this.startDate = this.formatDate(project.start_date);
        this.endDate = this.formatDate(project.end_date);
        this.clientId = project.client_id;

        if (!this.clientId) {
          this.fetchClients(); // Si no hay clientId, cargar clientes
        }
      } catch (error) {
        console.error('Error al cargar el proyecto:', error);
      }
    },

    // Método para convertir una fecha al formato YYYY-MM-DD
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (`0${d.getMonth() + 1}`).slice(-2); // Asegurar que tenga 2 dígitos
      const day = (`0${d.getDate()}`).slice(-2); // Asegurar que tenga 2 dígitos
      return `${year}-${month}-${day}`;
    },

    // Método para cargar la lista de clientes (en caso de ser necesario)
    async fetchClients() {
      try {
        this.clients = await clientService.getAllClients();
      } catch (error) {
        console.error('Error al cargar la lista de clientes:', error);
      }
    },

    // Método para guardar los cambios del proyecto
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const updatedProject = {
            name: this.name,
            description: this.description,
            start_date: this.startDate,
            end_date: this.endDate,
            client_id: this.clientId || this.selectedClient?.id,
          };

          const projectId = this.$route.params.id;
          await projectService.updateProject(projectId, updatedProject);
          this.$router.push('/projects');
        } catch (error) {
          console.error('Error al actualizar el proyecto:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
</style>