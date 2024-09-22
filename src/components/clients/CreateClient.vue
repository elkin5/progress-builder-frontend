<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">

          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Crear Cliente</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <!-- Campo Nombre -->
              <v-col cols="12">
                <v-text-field v-model="name" :rules="[rules.required, rules.name]" label="Nombre"
                  required></v-text-field>
                <v-alert v-if="!rules.name(name)" type="error" dense>El nombre debe contener solo letras.</v-alert>
              </v-col>

              <!-- Campo Correo Electrónico -->
              <v-col cols="12">
                <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Correo Electrónico"
                  required></v-text-field>
              </v-col>

              <!-- Campo Teléfono -->
              <v-col cols="12">
                <v-text-field v-model="phone" :rules="[rules.required, rules.phone]" label="Teléfono"
                  required></v-text-field>
              </v-col>

              <!-- Campo Identificación -->
              <v-col cols="12">
                <v-text-field v-model="identification" :rules="[rules.required, rules.identification]"
                  label="Identificación" required></v-text-field>
              </v-col>

              <!-- Campo Tipo -->
              <v-col cols="12">
                <v-autocomplete v-model="type" :items="types" :rules="[rules.required]" label="Tipo"
                  required filterable return-object item-text="text"></v-autocomplete>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-col cols="12">
              <v-btn :disabled="!valid" color="success" @click="submit" block>
                Crear Cliente
              </v-btn>
            </v-col>

             <!-- Mensajes de éxito y error -->
             <v-col cols="12">
              <SuccessMessage v-if="showSuccessMessage" :message="successMessage" />
              <ErrorMessage v-if="showErrorMessage" :message="errorMessage" />
            </v-col>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import clientService from '@/services/clientService';

export default {
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      phone: '',
      identification: '',
      type: null,
      showSuccessMessage: false,
      successMessage: '¡Cliente creado exitosamente!',
      showErrorMessage: false,
      errorMessage: 'Hubo un error al crear el cliente.',
      types: [
        { text: 'Natural' },
        { text: 'Legal' }
      ],
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
        email: value => {
          const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          return pattern.test(value) || 'Correo electrónico no válido.';
        },
        name: value => /^[a-zA-Z\s]+$/.test(value) || 'El nombre debe contener solo letras.',
        phone: value => /^[0-9]{10}$/.test(value) || 'El teléfono debe tener 10 dígitos numéricos.',
        identification: value => /^[0-9]+$/.test(value) || 'La identificación debe ser numérica.'
      }
    };
  },
  methods: {
    async submit() {
      this.resetMessages();
      if (this.$refs.form.validate()) {
        try {
          const newClient = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            identification: this.identification,
            type: this.type?.text || ''
          };

          // Esperar la respuesta del servicio
          await clientService.createClient(newClient);

          // Mostrar el mensaje de éxito
          this.showSuccessMessage = true;

          // Ocultar el mensaje después de unos segundos
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.$router.push('/clients');  // Redirigir después de la creación
          }, 3000);

        } catch (error) {
          console.error('Error al crear el cliente:', error.message);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      }
    },

    // Método para reiniciar los mensajes de éxito y error
    resetMessages() {
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
    },

    // Mostrar mensaje de éxito y ocultarlo automáticamente
    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessMessage = true;
      this.showErrorMessage = false;

      // Ocultar el mensaje automáticamente después de 3 segundos (3000 ms)
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    },

    // Mostrar mensaje de error
    showError(message) {
      this.errorMessage = message;
      this.showErrorMessage = true;
      this.showSuccessMessage = false;

      // Ocultar el mensaje de error automáticamente después de 3 segundos
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
