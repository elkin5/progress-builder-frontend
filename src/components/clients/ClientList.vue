<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Listado de Clientes</h2>
          </v-card-title>

          <!-- Botón Crear Cliente alineado a la derecha -->
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn @click="$router.push('/clients/create')" color="primary">
                Crear Cliente
              </v-btn>
            </v-col>
          </v-row>

          <!-- Campo de búsqueda -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>

          <!-- Tabla de clientes -->
          <v-data-table :items="clients" :headers="headers" :search="search" class="elevation-1">
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.identification }}</td>
                <td>{{ item.type }}</td> <!-- Tipo -->
                <td>
                  <!-- Botón para editar cliente -->
                  <v-btn color="yellow darken-2" icon elevation="10" @click="editClient(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <!-- Botón para eliminar cliente -->
                  <v-btn color="red darken-2" icon elevation="10" @click="openDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>

                  <!-- Botón para crear un proyecto asociado a este cliente -->
                  <v-btn color="blue darken-2" icon elevation="10" @click="createProjectForClient(item)">
                    <v-icon>mdi-briefcase-plus</v-icon> <!-- Ícono de crear proyecto -->
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación para eliminar cliente -->
    <confirm-dialog v-if="showDeleteDialog"
                    :message="'¿Estás seguro de que deseas eliminar al cliente ' + selectedClient.name + '?'"
                    @confirm="confirmDeleteClient" @cancel="closeDeleteDialog" />

    <!-- Mensajes de éxito y error -->
    <success-message v-if="showSuccessMessage" :message="successMessage" />
    <error-message v-if="showErrorMessage" :message="errorMessage" />
  </v-container>
</template>

<script>
import clientService from "@/services/clientService"; // Importa el servicio
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue"; // Importa el componente de confirmación

export default {
  components: {
    ConfirmDialog // Registrar el componente
  },
  data() {
    return {
      clients: [], // Lista vacía, se llenará con los datos reales
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Email", value: "email" },
        { text: "Teléfono", value: "phone" },
        { text: "Identificación", value: "identification" },
        { text: "Tipo", value: "type", sortable: false },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      search: '', // Para realizar la búsqueda
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: '',
      showDeleteDialog: false, // Estado para mostrar el diálogo de confirmación
      selectedClient: null // Cliente seleccionado para eliminar
    };
  },
  created() {
    this.loadClients(); // Cargar la lista de clientes cuando el componente se monte
  },
  methods: {
    // Método para cargar la lista de clientes desde la API
    async loadClients() {
      try {
        this.clients = await clientService.getAllClients(); // Llamada al servicio para obtener clientes
      } catch (error) {
        this.showError('Error al cargar la lista de clientes');
      }
    },

    // Método para redirigir a la edición de cliente
    editClient(client) {
      this.$router.push(`/clients/edit/${client.id}`);
    },

    // Método para redirigir a la creación de un proyecto para un cliente específico
    createProjectForClient(client) {
      this.$router.push({ path: '/projects/create', query: { clientId: client.id } });
    },

    // Abrir diálogo de confirmación antes de eliminar
    openDeleteDialog(client) {
      this.selectedClient = client; // Guardar el cliente seleccionado
      this.showDeleteDialog = true; // Mostrar el diálogo
    },

    // Método para cerrar el diálogo de confirmación
    closeDeleteDialog() {
      this.selectedClient = null;
      this.showDeleteDialog = false; // Cerrar el diálogo
    },

    // Método para confirmar la eliminación de un cliente
    async confirmDeleteClient() {
      try {
        await clientService.deleteClient(this.selectedClient.id); // Llamada al servicio para eliminar cliente
        this.clients = this.clients.filter(client => client.id !== this.selectedClient.id); // Filtrar la lista local
        this.showSuccess('Cliente eliminado con éxito');
      } catch (error) {
        this.showError('Error al eliminar el cliente');
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