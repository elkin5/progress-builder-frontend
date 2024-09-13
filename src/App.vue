<template>
  <v-app>
    <!-- Barra superior con el botón de hamburguesa -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PWA Application</v-toolbar-title>
    </v-app-bar>

    <!-- Barra de navegación lateral -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenedor principal donde se muestra el contenido de las rutas -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Controla si la barra lateral está visible o no
      items: [
        { title: 'Users', icon: 'mdi-account', route: '/users' },       // Ruta para Users
        { title: 'Clients', icon: 'mdi-account-group', route: '/clients' }, // Ruta para Clients
        { title: 'Projects', icon: 'mdi-briefcase', route: '/projects' },  // Ruta para Projects
        { title: 'Reports', icon: 'mdi-file-chart', route: '/reports' },   // Ruta para Reports
      ],
    };
  },
};
</script>

<style>
/* Estilos opcionales si deseas ajustar más la vista móvil */
</style>
