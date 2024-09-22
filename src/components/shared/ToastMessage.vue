<template>
    <transition name="fade">
      <div v-if="visible" class="toast-message" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type: 'success', // Tipos: success, error, etc.
      };
    },
    methods: {
      showToast(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 3000); // El toast desaparece después de 3 segundos
      },
    },
  };
  </script>
  
  <style scoped>
  .toast-message {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 1000;
  }
  .toast-message.success {
    background-color: #4caf50;
  }
  .toast-message.error {
    background-color: #f44336;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0.8;
  }
  </style>
  