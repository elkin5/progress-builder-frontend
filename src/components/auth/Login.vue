<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Iniciar Sesión</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <!-- Campo Correo Electrónico -->
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Correo Electrónico"
                  required
                ></v-text-field>
              </v-col>

              <!-- Campo Contraseña -->
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  label="Contraseña"
                  :type="showPassword ? 'text' : 'password'"
                  required
                >
                  <template v-slot:append>
                    <v-btn icon @click="showPassword = !showPassword">
                      <v-icon>{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>

              <!-- Botón de Inicio de Sesión -->
              <v-col cols="12">
                <v-btn :disabled="!valid" color="success" @click="submit" block>
                  Iniciar Sesión
                </v-btn>
              </v-col>

              <!-- Mensajes de éxito y error -->
              <v-col cols="12">
                <success-message v-if="showSuccessMessage" :message="successMessage" />
                <error-message v-if="showErrorMessage" :message="errorMessage" />
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authService from '@/services/authService'; // Servicio para manejar las peticiones de autenticación

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      showPassword: false,
      showSuccessMessage: false,
      successMessage: '¡Inicio de sesión exitoso!',
      showErrorMessage: false,
      errorMessage: 'Error al iniciar sesión.',
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
        email: value => {
          const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          return pattern.test(value) || 'Correo electrónico no válido.';
        },
      }
    };
  },
  methods: {
    async submit() {
      this.resetMessages();
      if (this.$refs.form.validate()) {
        try {
          // Realiza la petición de login y obtiene el token
          const response = await authService.login({
            email: this.email,
            password: this.password
          });

          const token = response.data.token; // Asegúrate de que la respuesta contenga el token
          // Guarda el token en localStorage
          localStorage.setItem('token', token);

          this.showSuccessMessage = true;

          // Redirigir a la página principal o dashboard
          this.$router.push('/'); // Cambia la ruta según tu aplicación
        } catch (error) {
          this.showErrorMessage = true;
          console.error('Error al iniciar sesión:', error);
        }
      }
    },

    resetMessages() {
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
