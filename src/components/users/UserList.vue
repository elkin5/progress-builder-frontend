<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12"> <!-- Se usa toda la columna en versiones desktop -->
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Listado de Usuarios</h2>
          </v-card-title>

          <!-- Botón Crear Usuario alineado a la derecha -->
          <v-row justify="end">
            <v-col cols="auto">

              <v-btn @click="$router.push('/users/create')" color="primary">
                Crear Usuario
              </v-btn>
            </v-col>
          </v-row>

          <!-- Campo de búsqueda -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
            hide-details></v-text-field>

          <!-- Tabla de usuarios -->
          <v-data-table :items="users" :headers="headers" :search="search" class="elevation-1">
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.identification }}</td> <!-- Identificación -->
                  <td>{{ item.position }}</td> <!-- Posición -->
                  <td>
                    <!-- Botón para editar -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="yellow darken-2"
                          icon
                          elevation="10"
                          @click="editUser(item)"
                          v-bind="attrs"
                          v-on="on">
                          <v-icon>mdi-pencil</v-icon> <!-- Ícono para agregar avance -->
                        </v-btn>
                      </template>
                      <span>Editar usuario</span>
                    </v-tooltip>

                    <!-- Botón para eliminar -->
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
                      <span>Eliminar usuario</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación para eliminar usuario -->
    <confirm-dialog v-if="showDeleteDialog"
      :message="'¿Estás seguro de que deseas eliminar al usuario ' + selectedUser.name + '?'"
      @confirm="confirmDeleteUser" @cancel="closeDeleteDialog" />

    <!-- Mensajes de éxito y error -->
    <success-message v-if="showSuccessMessage" :message="successMessage" />
    <error-message v-if="showErrorMessage" :message="errorMessage" />
  </v-container>
</template>

<script>
import userService from "@/services/userService"; // Importa el servicio
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue"; // Importa el componente de confirmación

export default {
  components: {
    ConfirmDialog // Registrar el componente
  },
  data() {
    return {
      users: [], // Lista vacía, se llenará con los datos reales
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Email", value: "email" },
        { text: "Identificación", value: "identification" },
        { text: "Posición", value: "position" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      search: '', // Para realizar la búsqueda
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: '',
      showDeleteDialog: false, // Estado para mostrar el diálogo de confirmación
      selectedUser: null // Usuario seleccionado para eliminar
    };
  },
  created() {
    this.loadUsers(); // Cargar la lista de usuarios cuando el componente se monte
  },
  methods: {
    // Método para cargar la lista de usuarios desde la API
    async loadUsers() {
      try {
        this.users = await userService.getAllUsers(); // Llamada al servicio para obtener usuarios
      } catch (error) {
        this.showError('Error al cargar la lista de usuarios');
      }
    },

    // Método para redirigir a la edición de usuario
    editUser(user) {
      this.$router.push(`/users/edit/${user.id}`);
    },

    // Abrir diálogo de confirmación antes de eliminar
    openDeleteDialog(user) {
      this.selectedUser = user; // Guardar el usuario seleccionado
      this.showDeleteDialog = true; // Mostrar el diálogo
    },

    // Método para cerrar el diálogo de confirmación
    closeDeleteDialog() {
      this.selectedUser = null;
      this.showDeleteDialog = false; // Cerrar el diálogo
    },

    // Método para confirmar la eliminación de un usuario
    async confirmDeleteUser() {
      try {
        await userService.deleteUser(this.selectedUser.id); // Llamada al servicio para eliminar usuario
        this.users = this.users.filter(user => user.id !== this.selectedUser.id); // Filtrar la lista local
        this.showSuccess('Usuario eliminado con éxito');
      } catch (error) {
        this.showError('Error al eliminar el usuario');
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
