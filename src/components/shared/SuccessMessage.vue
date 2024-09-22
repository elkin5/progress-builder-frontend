<template>
    <v-alert type="success" :value="true" dismissible>
      {{ message }}
    </v-alert>
</template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: '¡Operación exitosa!',
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos personalizados si lo necesitas */
  </style>
  