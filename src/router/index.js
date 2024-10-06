import Vue from 'vue';
import VueRouter from 'vue-router';

// Importaciones para Usuarios
import UsersView from '@/views/UsersView.vue';
import CreateUser from '@/components/users/CreateUser.vue';
import UpdateUser from '@/components/users/UpdateUser.vue';
import UserList from '@/components/users/UserList.vue';

// Importaciones para Clientes
import ClientsView from '@/views/ClientsView.vue';
import CreateClient from '@/components/clients/CreateClient.vue';
import UpdateClient from '@/components/clients/UpdateClient.vue';
import ClientList from '@/components/clients/ClientList.vue';

// Importaciones para Proyectos
import ProjectsView from '@/views/ProjectsView.vue';
import CreateProject from '@/components/projects/CreateProject.vue';
// import UpdateProject from '@/components/projects/UpdateProject.vue';
import ProjectList from '@/components/projects/ProjectList.vue';

// Importaciones para Tareas
import TasksView from '@/views/TasksView.vue';
import CreateTask from '@/components/tasks/CreateTask.vue';
// import UpdateTask from '@/components/tasks/UpdateTask.vue';
import TaskList from '@/components/tasks/TaskList.vue';

// Importaciones para Avances
import AdvancesView from '@/views/AdvancesView.vue';
import CreateAdvance from '@/components/advances/CreateAdvance.vue';
// import UpdateAdvance from '@/components/advances/UpdateAdvance.vue';
import AdvanceList from '@/components/advances/AdvanceList.vue';

// Página de login
import Login from '@/components/auth/Login.vue';

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
  // Rutas para Proyectos
  {
    path: '/projects',
    component: ProjectsView,
    children: [
      {
        path: '',
        component: ProjectList,
      },
      {
        path: 'create',
        component: CreateProject,
      },
      {
        path: 'edit/:id',
        // component: UpdateProject,
      },
    ],
  },
  // Rutas para Tareas
  {
    path: '/tasks',
    component: TasksView,
    children: [
      {
        path: '',
        component: TaskList,
      },
      {
        path: 'create',
        component: CreateTask,
      },
      {
        path: 'edit/:id',
        // component: UpdateTask,
      },
    ],
  },
  // Rutas para Avances
  {
    path: '/advances',
    component: AdvancesView,
    children: [
      {
        path: '',
        component: AdvanceList,
      },
      {
        path: 'create',
        component: CreateAdvance,
      },
      {
        path: 'edit/:id',
        // component: UpdateAdvance,
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