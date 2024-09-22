<template>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ message }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirm">Confirmar</v-btn>
          <v-btn color="red darken-1" text @click="cancel">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: true
      };
    },
    props: {
      message: {
        type: String,
        default: '¿Estás seguro?' 
      }
    },
    methods: {
      confirm() {
        this.$emit('confirm');
        this.dialog = false;
      },
      cancel() {
        this.$emit('cancel');
        this.dialog = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos personalizados si lo necesitas */
  </style>
  