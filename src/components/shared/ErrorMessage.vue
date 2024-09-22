<template>
    <v-alert type="error" :value="true" dismissible>
      {{ message }}
    </v-alert>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: 'Ocurrió un error.',
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos personalizados si lo necesitas */
  </style>
  