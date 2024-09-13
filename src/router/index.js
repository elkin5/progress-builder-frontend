// import Vue from 'vue';
// import Router from 'vue-router';
import Users from '../views/Users.vue';//test
// // import Clients from './views/Clients.vue';
// // import Projects from './views/Projects.vue';
// // import Reports from './views/Reports.vue';

// Vue.use(Router);

// export default new Router({
//   mode: 'history', // Habilita el modo history
//   routes: [
//     { path: '/users', component: Users },
//     // { path: '/clients', component: Clients },
//     // { path: '/projects', component: Projects },
//     // { path: '/reports', component: Reports },
//   ],
// });

import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersView from '@/views/UsersView.vue';
import CreateUser from '@/components/users/CreateUser.vue';
import UpdateUser from '@/components/users/UpdateUser.vue';
import UserList from '@/components/users/UserList.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/usuarios', component: Users },//test
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
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
