<template>
  <v-app>
    <!-- Mostrar la barra superior solo si el usuario está autenticado -->
    <v-app-bar v-if="isAuthenticated" app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema Gestor de Avances de Obra</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Avatar del usuario -->
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <span class="white--text text-h5">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ userInitials }}</span>
              </v-avatar>
              <h3>{{ userFullName }}</h3>
              <p class="text-caption mt-1">
                {{ userEmail }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="editAccount">
                Editar cuenta
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout">
                Cerrar sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Mostrar la barra de navegación lateral solo si el usuario está autenticado -->
    <v-navigation-drawer v-if="isAuthenticated" v-model="drawer" app :clipped="$vuetify.breakpoint.lgAndUp"
      :temporary="$vuetify.breakpoint.smAndDown">
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route" link>
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
import authService from '@/services/authService'; // Importa el servicio de autenticación
import { decodeJwt } from '@/services/jwtService'; // Importa el servicio de jwt
import router from '@/router/index.js'

export default {
  data() {
    return {
      drawer: false, // Controla si la barra lateral está visible o no
      isAuthenticated: false, // Estado de autenticación
      userEmail: '', // Almacena el correo del usuario
      userFullName: '',
      userId: '',
      userRole: '', // Almacena el rol del usuario
      defaultItems: [
        { title: 'Clientes', icon: 'mdi-account-group', route: '/clients' },
        { title: 'Proyectos', icon: 'mdi-briefcase', route: '/projects' },
        { title: 'Tareas', icon: 'mdi-file-document', route: '/tasks' },
        { title: 'Avances', icon: 'mdi-progress-clock', route: '/advances' },
        { title: 'Reportes ', icon: 'mdi-file-chart', route: '/reports' },
      ],
    };
  },
  computed: {
    items() {
      // Si el usuario es administrador, agrega el menú de gestión de usuarios
      if (this.userRole === 'admin') {
        return [
          { title: 'Usuarios', icon: 'mdi-account', route: '/users' },
          ...this.defaultItems,
        ];
      }
      return this.defaultItems;
    },

    userInitials() {
      // Devuelve las iniciales del nombre completo si existe
      return this.userFullName
        ? this.userFullName
          .split(' ')
          .map(name => name.charAt(0).toUpperCase())
          .join('')
        : 'AZ'; // Iniciales por defecto
    },
  },
  created() {
    // Verifica si el usuario está autenticado cuando el componente es creado
    this.isAuthenticated = !!authService.getToken(); // Verifica si hay un token en el localStorage
    this.getUserInfo();
  },
  watch: {
    // Si el estado de autenticación cambia, vuelve a calcular el estado
    '$route'() {
      this.isAuthenticated = !!authService.getToken();
    },
  },
  methods: {
    getUserInfo() {
      const token = authService.getToken();
      if (token) {
        // Decodifica el payload del JWT
        const decoded = decodeJwt(token);

        if (decoded) {
          this.userEmail = decoded.userEmail || '@'; // Asigna el correo del usuario desde el token
          this.userFullName = decoded.userName || '-'; // Nombre completo del usuario
          this.userId = decoded.userId || '0';
          this.userRole = decoded.userType || '-'; // Tipo de usuario
        }
      }
    },

    editAccount() {
      router.push(`/users/edit/${this.userId}`);
    },

    logout() {
      // const router = useRouter(); // Obtén el router
      authService.logout(router); // Llama a logout y pasa el router
    },
  },
};
</script>

<style>
/* Estilos opcionales si deseas ajustar más la vista móvil */
</style>
