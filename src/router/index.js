import Vue from 'vue';
import VueRouter from 'vue-router';

import UsersView from '@/views/UsersView.vue';
import CreateUser from '@/components/users/CreateUser.vue';
import UpdateUser from '@/components/users/UpdateUser.vue';
import UserList from '@/components/users/UserList.vue';

import ClientsView from '@/views/ClientsView.vue';
import CreateClient from '@/components/clients/CreateClient.vue';
import UpdateClient from '@/components/clients/UpdateClient.vue';
import ClientList from '@/components/clients/ClientList.vue';

import Login from '@/components/auth/Login.vue'; // Página de login

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/users', // Redirige a /users si está autenticado, o a login si no
  },
  {
    path: '/login',
    component: Login,
  },
  // Rutas para Usuarios
  {
    path: '/users',
    component: UsersView,
    children: [
      {
        path: '',
        component: UserList,
      },
      {
        path: 'create',
        component: CreateUser,
      },
      {
        path: 'edit/:id',
        component: UpdateUser,
      },
    ],
  },
  // Rutas para Clientes
  {
    path: '/clients',
    component: ClientsView,
    children: [
      {
        path: '',
        component: ClientList,
      },
      {
        path: 'create',
        component: CreateClient,
      },
      {
        path: 'edit/:id',
        component: UpdateClient,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// Guard global para proteger rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.path !== '/login' && !token) {
    // Si el usuario intenta acceder a una ruta que no sea el login y no tiene token
    next('/login');
  } else {
    next(); // Si tiene token, continúa con la navegación
  }
});

export default router;
