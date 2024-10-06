<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2>Avances</h2>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goToCreateAdvance">Crear Avance</v-btn>
          </v-card-title>

          <v-data-table :headers="headers" :items="advances" class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editAdvance(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteAdvance(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import advanceService from '@/services/advanceService';

export default {
  data() {
    return {
      advances: [],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Descripción', value: 'description' },
        { text: 'Tarea', value: 'task.name' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ]
    };
  },
  created() {
    this.fetchAdvances();
  },
  methods: {
    async fetchAdvances() {
      try {
        this.advances = await advanceService.getAllAdvances();
      } catch (error) {
        console.error('Error al obtener los avances:', error);
      }
    },
    goToCreateAdvance() {
      this.$router.push('/advances/create');
    },
    editAdvance(advance) {
      this.$router.push(`/advances/edit/${advance.id}`);
    },
    async deleteAdvance(advance) {
      try {
        await advanceService.deleteAdvance(advance.id);
        this.fetchAdvances(); // Actualiza la lista
      } catch (error) {
        console.error('Error al eliminar el avance:', error);
      }
    }
  }
};
</script>