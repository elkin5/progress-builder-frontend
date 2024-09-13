<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <!-- Name Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    :rules="[rules.required]"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
  
                <!-- Email Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
  
                <!-- Password Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required]"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
  
                <!-- Phone Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="phone"
                    :rules="[rules.required]"
                    label="Phone"
                    required
                  ></v-text-field>
                </v-col>
  
                <!-- Identification Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="identification"
                    :rules="[rules.required]"
                    label="Identification"
                    required
                  ></v-text-field>
                </v-col>
  
                <!-- Position Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="position"
                    :rules="[rules.required]"
                    label="Position"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
  
              <!-- Submit Button -->
              <v-btn :disabled="!valid" color="success" @click="submit" block>
                Create User
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        name: '',
        email: '',
        password: '',
        phone: '',
        identification: '',
        position: '',
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            return pattern.test(value) || 'Invalid email.'
          },
        },
      };
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          alert('Form Submitted!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  
  <!-- submit() {
    if (this.$refs.form.validate()) {
        alert('Form Submitted!');
        // userService.createUser(this.user).then(() => {
        //     this.$router.push('/users');
        // });
    }
}, -->