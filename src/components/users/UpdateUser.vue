<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">

          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Actualizar Usuario</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <!-- Name Field -->
              <v-col cols="12">
                <v-text-field v-model="name" :rules="[rules.required]" label="Nombre" required></v-text-field>
              </v-col>

              <!-- Email Field -->
              <v-col cols="12">
                <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Email"
                  required></v-text-field>
              </v-col>

              <!-- Password Field -->
              <!-- <v-col cols="12">
                <v-text-field v-model="password" :rules="[rules.required]" label="Contraseña" type="password" required>
                  <template #append>
                    <v-btn @click="showPassword = !showPassword" icon>
                      <v-icon>{{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    </v-btn>
                  </template>
</v-text-field>
</v-col> -->

              <!-- Phone Field -->
              <v-col cols="12">
                <v-text-field v-model="phone" :rules="[rules.required, rules.numeric, rules.phone]" label="Teléfono"
                  required></v-text-field>
              </v-col>

              <!-- Identification Field -->
              <v-col cols="12">
                <v-text-field v-model="identification" :rules="[rules.required, rules.numeric]" label="Identificación"
                  required></v-text-field>
              </v-col>

              <!-- Position Field -->
              <v-col cols="12">
                <v-select v-model="position" :items="positions" :rules="[rules.required]" label="Posición"
                  required></v-select>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-col cols="12">
              <v-btn :disabled="!valid" color="success" @click="submit" block>
                Actualizar Usuario
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
      // password: '',
      phone: '',
      identification: '',
      position: '',
      showPassword: false,
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
        // password: value => /^[a-zA-Z0-9]{8,16}$/.test(value) || 'La contraseña debe ser alfanumérica de 8 a 16 caracteres.',
        identification: value => /^[0-9]+$/.test(value) || 'La identificación debe ser numérica.'
      },
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  created() {
    const userId = this.$route.params.id; // Obtener el ID del usuario desde la ruta
    this.loadUserData(userId); // Cargar los datos del usuario
  },
  methods: {
    // Método para cargar los datos del usuario desde la API
    async loadUserData(id) {
      try {
        const user = await userService.getUserById(id); // Llamada a UserService para obtener los datos del usuario
        this.name = user.name;
        this.email = user.email;
        this.identification = user.identification;
        this.position = user.position;
        this.phone = user.phone;
      } catch (error) {
        this.showError('Error al cargar los datos del usuario');
      }
    },

    // Método para enviar la actualización del usuario
    async submit() {
      this.resetMessages();
      if (this.$refs.form.validate()) {
        try {
          const updatedUser = {
            name: this.name,
            email: this.email,
            // password: this.password,
            phone: this.phone,
            identification: this.identification,
            position: this.position
          };
          // Llamada a UserService para actualizar los datos del usuario
          await userService.updateUser(this.$route.params.id, updatedUser);
          this.showSuccess('¡Usuario actualizado con éxito!');
        } catch (error) {
          this.showError('Error al actualizar el usuario');
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
