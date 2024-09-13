<template>
    <v-container>
      <v-form @submit.prevent="updateUser">
        <v-text-field label="Name" v-model="user.name" required></v-text-field>
        <v-text-field label="Email" v-model="user.email" required></v-text-field>
        <v-text-field label="Phone" v-model="user.phone" required></v-text-field>
        <v-text-field label="Identification" v-model="user.identification" required></v-text-field>
        <v-text-field label="Position" v-model="user.position" required></v-text-field>
        <v-btn type="submit">Update</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import userService from '@/services/userService';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          phone: '',
          identification: '',
          position: '',
        }
      };
    },
    created() {
      const userId = this.$route.params.id;
      userService.getUserById(userId).then(response => {
        this.user = response.data;
      });
    },
    methods: {
      updateUser() {
        const userId = this.$route.params.id;
        userService.updateUser(userId, this.user).then(() => {
          this.$router.push('/users');
        });
      }
    }
  };
  </script>
  