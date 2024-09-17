<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
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

            <!-- Botón de Enviar -->
            <v-btn :disabled="!valid" color="success" @click="submit" block>
              Crear Usuario
            </v-btn>
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
      if (this.$refs.form.validate()) {
        try {
          const newUser = {
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            identification: this.identification,
            // position: this.position,
            position: '---',
          };

          // Esperar la respuesta del servicio
          await userService.createUser(newUser);

          alert('¡Usuario creado exitosamente!');
          this.$router.push('/users');  // Redirigir después de la creación
        } catch (error) {
          console.error('Error al crear el usuario:', error.message);
          alert('Hubo un error al crear el usuario.');
        }
      }
    }
  }
};
</script>