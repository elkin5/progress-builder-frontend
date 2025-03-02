<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">

          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Crear Usuario</h2>
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

              <!-- Campo Contraseña -->
              <v-col cols="12">
                <v-text-field v-model="password" :rules="[rules.required, rules.password]" label="Contraseña"
                  :type="showPassword ? 'text' : 'password'" required>
                  <template v-slot:append>
                    <v-btn icon @click="showPassword = !showPassword">
                      <v-icon>{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
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

              <!-- Campo Posición -->
              <v-col cols="12">
                <v-autocomplete v-model="position" :items="positions" :rules="[rules.required]" label="Posición"
                  required filterable return-object item-text="text"></v-autocomplete>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-col cols="12">
              <v-btn :disabled="!valid" color="success" @click="submit" block>
                Crear Usuario
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
import userService from '@/services/userService';

export default {
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      password: '',
      phone: '',
      identification: '',
      position: null,
      showPassword: false,
      showSuccessMessage: false, // Variable para mostrar el mensaje de éxito
      successMessage: '¡Usuario creado exitosamente!',
      showErrorMessage: false, // Variable para mostrar el mensaje de error
      errorMessage: 'Hubo un error al crear el usuario.',
      positions: [
        { text: 'Admin' },
        { text: 'Jefe de Obra' },
        { text: 'Arquitecto' },
        { text: 'Albañil' },
        { text: 'Ayudante' }
      ],
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
        email: value => {
          const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          return pattern.test(value) || 'Correo electrónico no válido.';
        },
        name: value => /^[a-zA-Z\s]+$/.test(value) || 'El nombre debe contener solo letras.',
        phone: value => /^[0-9]{10}$/.test(value) || 'El teléfono debe tener 10 dígitos numéricos.',
        password: value => /^[a-zA-Z0-9]{8,16}$/.test(value) || 'La contraseña debe ser alfanumérica de 8 a 16 caracteres.',
        identification: value => /^[0-9]+$/.test(value) || 'La identificación debe ser numérica.'
      }
    };
  },
  methods: {
    async submit() {
      this.resetMessages();
      if (this.$refs.form.validate()) {
        try {
          const newUser = {
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            identification: this.identification,
            position: this.position?.text || '', // Toma solo el texto de la posición
            // position: this.position
          };

          // Esperar la respuesta del servicio
          await userService.createUser(newUser);

          // Mostrar el mensaje de éxito
          this.showSuccessMessage = true;

          // Ocultar el mensaje después de unos segundos
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.$router.push('/users');  // Redirigir después de la creación
          }, 3000);

        } catch (error) {
          console.error('Error al crear el usuario:', error.message);
          // Mostrar el mensaje de éxito
          this.showErrorMessage = true;

          // Ocultar el mensaje después de unos segundos
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
