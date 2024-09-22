import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'

// Importación de los componentes para mensajes y confirmacion
import SuccessMessage from '@/components/shared/SuccessMessage.vue';
import ErrorMessage from '@/components/shared/ErrorMessage.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

// Registro global de los componentes
Vue.component('SuccessMessage', SuccessMessage);
Vue.component('ErrorMessage', ErrorMessage);
Vue.component('ConfirmDialog', ConfirmDialog);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
