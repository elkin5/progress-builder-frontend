<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Listado de Avances</h2>
          </v-card-title>

          <!-- Botón Crear Avance alineado a la derecha -->
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="goToCreateAdvance">Crear Avance</v-btn>
            </v-col>
          </v-row>

          <!-- Campo de búsqueda -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>

          <!-- Tabla de avances -->
          <v-data-table :headers="headers" :items="advances" :search="search" class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <!-- Botón para editar avance -->
              <v-icon small @click="editAdvance(item)">mdi-pencil</v-icon>

              <!-- Botón para eliminar avance -->
              <v-icon small @click="showDeleteDialog(item)">mdi-delete</v-icon>

              <!-- Botón para ver multimedia -->
              <v-icon small @click="viewMultimedia(item)" color="blue">mdi-image-multiple</v-icon>
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
                        <v-icon>mdi-pencil</v-icon> <!-- Ícono para editar avance -->
                      </v-btn>
                    </template>
                    <span>Editar avance</span>
                  </v-tooltip>

                  <!-- Botón para eliminar avance -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red darken-2"
                        icon
                        elevation="10"
                        @click="openDeleteDialog(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-delete</v-icon> <!-- Ícono para eliminar avance -->
                      </v-btn>
                    </template>
                    <span>Eliminar avance</span>
                  </v-tooltip>

                  <!-- Botón para ver archivos multimedia -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="blue darken-2"
                        icon
                        elevation="10"
                        @click="viewMultimedia(item)"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-image-multiple</v-icon> <!-- Ícono para ver archivos multimedia -->
                      </v-btn>
                    </template>
                    <span>Ver archivos multimedia</span>
                  </v-tooltip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal para ver archivos multimedia -->
    <v-dialog v-model="showMultimediaModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          Evidencias del Avance {{ selectedAdvance ? selectedAdvance.name : '' }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-if="multimediaFiles.length">
              <v-col v-for="file in multimediaFiles" :key="file.id" cols="12" md="6">
<!--                <td>{{ file.id }}</td>-->
<!--                <td>{{ file.file_path }}</td>-->

                <!-- Mostrar imagen, video o audio según el tipo v-if="file.file_path.includes('png') -->
                <!-- Card para cada archivo multimedia -->
                <v-card class="mb-4">
                  <!-- Imagen en el card -->
                  <v-img :src="getFileByUrl(file.file_path)" :alt="file.file_path" aspect-ratio="1.75"></v-img>
                  <!-- Subtítulo con el número de imagen -->
                  <v-card-subtitle>
                    Evidencia #{{ file.id }}
                  </v-card-subtitle>
                </v-card>
<!--                <template v-if="file.type.includes('video')">-->
<!--                  <video controls :src="file.url" style="width: 100%"></video>-->
<!--                </template>-->
<!--                <template v-if="file.type.includes('audio')">-->
<!--                  <audio controls :src="file.url" style="width: 100%"></audio>-->
<!--                </template>-->
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <p>No hay archivos multimedia asociados a este avance.</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="showMultimediaModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import multimediaService from '@/services/multimediaService'; // Servicio para multimedia
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue"; // Importa el componente de confirmación

export default {
  components: {
    ConfirmDialog // Registrar el componente
  },
  data() {
    return {
      advances: [], // Lista vacía, se llenará con los datos reales
      multimediaFiles: [], // Lista de archivos multimedia
      showMultimediaModal: false, // Controla la visibilidad del modal
      // selectedAdvance: {}, // Almacena el avance seleccionado
      headers: [
        { text: 'ID', value: 'id' },
        { text: "Nombre", value: "name" },
        { text: "Descripción", value: "description" },
        { text: "Tarea", value: "Task.name" }, // Se muestra el nombre de la tarea si existe
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
        console.error('Error al cargar la lista de avances:', error);
      }
    },

    // Método para ver archivos multimedia asociados a un avance
    async viewMultimedia(advance) {
      try {
        this.selectedAdvance = advance; // Almacena el avance seleccionado
        this.multimediaFiles = await multimediaService.getFilesByAdvance(advance.id); // Obtener los archivos multimedia

        console.log('advance:', advance);
        console.log('Archivos multimedia:', this.multimediaFiles);
        console.log('Avance seleccionado:', this.selectedAdvance);
        console.log('Mostrar modal:', this.showMultimediaModal);
        this.showMultimediaModal = true; // Muestra el modal
      } catch (error) {
        console.error('Error al cargar archivos multimedia:', error);
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
    },

    // Método que construye la URL completa del archivo multimedia
    getFileByUrl(filePath) {
      // Accede a la variable de entorno para la URL base de la API
      const baseUrl = process.env.VUE_APP_API_URL;
      // Devuelve la URL completa basada en el file_path devuelto por el servidor
      return `${baseUrl}/files/public/${filePath}`;
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>