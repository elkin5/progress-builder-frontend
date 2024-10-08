<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Crear Avance</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="advanceName" label="Nombre del avance" :rules="[rules.required]"
                          required></v-text-field>
            <v-text-field v-model="advanceDescription" label="Descripción del avance" :rules="[rules.required]"
                          required></v-text-field>

            <!-- Selección de la tarea asociada -->
            <v-autocomplete
              v-if="!taskId"
              v-model="selectedTask"
              :items="tasks"
              item-text="name"
              item-value="id"
              label="Seleccionar Tarea"
              :rules="[rules.required]"
              required
            ></v-autocomplete>

            <v-card class="pa-3">
              <!-- Botón para seleccionar archivos -->
              <v-file-input
                multiple
                v-model="selectedFiles"
                label="Agregar archivos"
                prepend-icon="mdi-paperclip"
                show-size
                @change="handleFileSelection"
              ></v-file-input>

              <!-- Botón adicional como link button -->
              <v-btn text small @click="$refs.fileInput.click()">
                Agregar más archivos
              </v-btn>
              <input ref="fileInput" type="file" @change="handleMoreFileSelection" multiple style="display: none;"/>

              <!-- Lista de archivos seleccionados -->
              <v-list v-if="files.length">
                <v-list-item v-for="(file, index) in files" :key="index">
                  <v-list-item-content>{{ file.name }}</v-list-item-content>
                  <v-btn icon @click="removeFile(index)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-card>

            <!-- Botón para crear avance -->
            <v-btn :disabled="!valid" color="success" @click="submit" block>Crear Avance</v-btn>

            <!-- Indicador de progreso (opcional para los archivos) -->
            <v-progress-linear v-if="uploadProgress > 0" :value="uploadProgress" color="green"></v-progress-linear>

            <!-- Mensajes de éxito y error -->
            <success-message v-if="showSuccessMessage" :message="successMessage"/>
            <error-message v-if="showErrorMessage" :message="errorMessage"/>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import advanceService from '@/services/advanceService'; // Para crear avances
import taskService from '@/services/taskService';
import multimediaService from '@/services/multimediaService'; // Para subir archivos

export default {
  data() {
    return {
      valid: false,
      advanceName: '',
      advanceDescription: '',
      taskId: null,
      selectedTask: null,
      tasks: [],
      selectedFiles: [], // Archivos seleccionados por el usuario
      files: [], // Almacenar múltiples archivos
      uploadProgress: 0, // Progreso de la subida
      showSuccessMessage: false,
      successMessage: '¡Avance y archivos subidos exitosamente!',
      showErrorMessage: false,
      errorMessage: 'Error al crear el avance o subir archivos.',
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      }
    };
  },
  created() {
    this.taskId = this.$route.query.taskId || null; // Obtiene projectId de los parámetros de consulta

    if (!this.taskId) {
      this.fetchTasks(); // Si no hay taskId, carga la lista de proyectos
    }
  },
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await taskService.getAllTasks();
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    },

    handleFileSelection(files) {
      this.files = [...files]; // Almacenar los archivos seleccionados inicialmente
    },

    handleMoreFileSelection(event) {
      const moreFiles = Array.from(event.target.files); // Convertir a array los archivos seleccionados
      this.files.push(...moreFiles); // Agregar los nuevos archivos al array de files
    },

    removeFile(index) {
      this.files.splice(index, 1); // Eliminar un archivo del array si es necesario
    },

    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.resetMessages();

          // Crear el avance
          const newAdvance = {
            name: this.advanceName,
            description: this.advanceDescription,
            task_id: this.taskId || this.selectedTask
          };
          console.log('Nuevo avance:', newAdvance);
          const response = await advanceService.createAdvance(newAdvance);
          const advanceId = response.id; // Obtener el ID del avance creado

          // Subir los archivos asociados al avance
          if (this.files.length > 0) {
            await this.uploadFiles(advanceId); // Subir los archivos
          }

          // Mostrar mensaje de éxito
          this.showSuccessMessage = true;
          this.resetForm();
          await this.$router.push('/advances');
        } catch (error) {
          console.error('Error al crear el avance o subir archivos:', error);
          this.showErrorMessage = true;
        }
      }
    },

    async uploadFiles(advanceId) {
      this.uploadProgress = 0;
      for (const file of this.files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('advance_id', advanceId); // Usar el advance_id como parámetro

        await multimediaService.uploadMultimediaFile(formData, progressEvent => {
          this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        });
      }
    },

    resetForm() {
      this.advanceName = '';
      this.advanceDescription = '';
      this.files = [];
      this.valid = false;
    },

    resetMessages() {
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>