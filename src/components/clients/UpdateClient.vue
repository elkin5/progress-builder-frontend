<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <!-- Título de la pantalla -->
          <v-card-title>
            <h2>Actualizar Cliente</h2>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <!-- Name Field -->
              <v-col cols="12">
                <v-text-field v-model="name" :rules="[rules.required]" label="Nombre" required></v-text-field>
              </v-col>

              <!-- Email Field -->
              <v-col cols="12">
                <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Email" required></v-text-field>
              </v-col>

              <!-- Phone Field -->
              <v-col cols="12">
                <v-text-field v-model="phone" :rules="[rules.required, rules.numeric, rules.phone]" label="Teléfono" required></v-text-field>
              </v-col>

              <!-- Identification Field -->
              <v-col cols="12">
                <v-text-field v-model="identification" :rules="[rules.required, rules.numeric]" label="Identificación" required></v-text-field>
              </v-col>

              <!-- Type Field -->
              <v-col cols="12">
                <v-select v-model="type" :items="types" :rules="[rules.required]" label="Tipo" required></v-select>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-col cols="12">
              <v-btn :disabled="!valid" color="success" @click="submit" block>
                Actualizar Cliente
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
      type: '',
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
        phone: value => /^[0-9]{10}$/.test(value) || 'El teléfono debe tener 10 dígitos numéricos.',
        identification: value => /^[0-9]+$/.test(value) || 'La identificación debe ser numérica.'
      },
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  created() {
    const clientId = this.$route.params.id; // Obtener el ID del cliente desde la ruta
    this.loadClientData(clientId); // Cargar los datos del cliente
  },
  methods: {
    // Método para cargar los datos del cliente desde la API
    async loadClientData(id) {
      try {
        const client = await clientService.getClientById(id); // Llamada a ClientService para obtener los datos del cliente
        this.name = client.name;
        this.email = client.email;
        this.identification = client.identification;
        this.type = client.type;
        this.phone = client.phone;
      } catch (error) {
        this.showError('Error al cargar los datos del cliente');
      }
    },

    // Método para enviar la actualización del cliente
    async submit() {
      this.resetMessages();
      if (this.$refs.form.validate()) {
        try {
          const updatedClient = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            identification: this.identification,
            type: this.type
          };
          // Llamada a ClientService para actualizar los datos del cliente
          await clientService.updateClient(this.$route.params.id, updatedClient);
          this.showSuccess('¡Cliente actualizado con éxito!');
        } catch (error) {
          this.showError('Error al actualizar el cliente');
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
