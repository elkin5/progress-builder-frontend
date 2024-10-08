<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Listado de Avances</h2>
          </v-card-title>

          <!-- Botón Crear Cliente alineado a la derecha -->
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="goToCreateAdvance">Crear Avance</v-btn>
            </v-col>
          </v-row>

          <!-- Campo de búsqueda -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>

          <v-data-table :headers="headers" :items="advances" :search="search" class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editAdvance(item)">mdi-pencil</v-icon>
              <v-icon small @click="showDeleteDialog(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.Task ? item.Task.name : 'Sin tarea asignada' }}</td> <!-- Validar tarea -->
                <td>{{ item.createdAt }}</td>
                <td>
                  <!-- Botón para editar avance -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="yellow darken-2"
                        icon
                        elevation="10"
                        @click="editAdvance(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-pencil</v-icon> <!-- Ícono para agregar avance -->
                      </v-btn>
                    </template>
                    <span>Editar avance</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red darken-2"
                        icon
                        elevation="10"
                        @click="openDeleteDialog(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-delete</v-icon> <!-- Ícono para agregar avance -->
                      </v-btn>
                    </template>
                    <span>Eliminar avance</span>
                  </v-tooltip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación para eliminar avance -->
    <confirm-dialog v-if="showDeleteDialog"
                    :message="'¿Estás seguro de que deseas eliminar el avance ' + selectedAdvance.name + '?'"
                    @confirm="confirmDeleteAdvance" @cancel="closeDeleteDialog" />

    <!-- Mensajes de éxito y error -->
    <success-message v-if="showSuccessMessage" :message="successMessage" />
    <error-message v-if="showErrorMessage" :message="errorMessage" />
  </v-container>
</template>

<script>
import advanceService from "@/services/advanceService"; // Importa el servicio de avances
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue"; // Importa el componente de confirmación

export default {
  components: {
    ConfirmDialog // Registrar el componente
  },
  data() {
    return {
      advances: [], // Lista vacía, se llenará con los datos reales
      headers: [
        { text: 'ID', value: 'id' },
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Tarea", value: "task.name" }, // Se muestra el nombre de la tarea si existe
        { text: "Fecha de creación", value: "createdAt" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      search: '', // Para realizar la búsqueda
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: '',
      showDeleteDialog: false, // Estado para mostrar el diálogo de confirmación
      selectedAdvance: null // Avance seleccionado para eliminar
    };
  },
  created() {
    this.loadAdvances(); // Cargar la lista de avances cuando el componente se monte
  },
  methods: {
    // Método para cargar la lista de avances desde la API
    async loadAdvances() {
      try {
        this.advances = await advanceService.getAllAdvances(); // Llamada al servicio para obtener avances
      } catch (error) {
        this.showError('Error al cargar la lista de avances');
      }
    },

    // Método para redirigir a la edición de avance
    editAdvance(advance) {
      this.$router.push(`/advances/edit/${advance.id}`);
    },

    // Abrir diálogo de confirmación antes de eliminar
    openDeleteDialog(advance) {
      this.selectedAdvance = advance; // Guardar el avance seleccionado
      this.showDeleteDialog = true; // Mostrar el diálogo
    },

    // Método para cerrar el diálogo de confirmación
    closeDeleteDialog() {
      this.selectedAdvance = null;
      this.showDeleteDialog = false; // Cerrar el diálogo
    },

    // Método para confirmar la eliminación de un avance
    async confirmDeleteAdvance() {
      try {
        await advanceService.deleteAdvance(this.selectedAdvance.id); // Llamada al servicio para eliminar avance
        this.advances = this.advances.filter(advance => advance.id !== this.selectedAdvance.id); // Filtrar la lista local
        this.showSuccess('Avance eliminado con éxito');
      } catch (error) {
        this.showError('Error al eliminar el avance');
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

    // Método para redirigir a la creación de avance
    goToCreateAdvance() {
      this.$router.push('/advances/create');
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>