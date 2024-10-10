<template>
  <v-container class="welcome-container">
    <v-card class="pa-5" outlined>
      <v-card-title class="text-center">
        <h1>Bienvenido al Sistema de Gestión de Avances de Obra</h1>
      </v-card-title>
      <v-card-text>
        <p class="text-h6">
          Este sistema tiene como objetivo ayudar a los equipos de construcción a gestionar
          los proyectos de obra, desde la creación de clientes y proyectos, hasta el seguimiento
          de tareas y avances. Aquí podrás:
        </p>
        <ul class="text-h6">
          <li>Crear y gestionar clientes, proyectos y tareas.</li>
          <li>Realizar seguimiento de los avances en cada proyecto.</li>
          <li>Visualizar gráficos y reportes de estado de los proyectos.</li>
          <li>Subir y gestionar archivos multimedia asociados a los avances.</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="goToProjects">Ver Proyectos</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    goToProjects() {
      // Navega a la página de proyectos
      this.$router.push('/projects');
    }
  }
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text-h6 {
  margin-bottom: 20px;
}

v-card-title {
  font-size: 2rem;
}

v-card-text {
  font-size: 1.2rem;
}

</style>