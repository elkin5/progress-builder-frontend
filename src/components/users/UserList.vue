<template>
    <v-container>
      <v-btn @click="$router.push('/users/create')">Create User</v-btn>
      <v-data-table :items="users" :headers="headers">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.identification }}</td>
              <td>{{ item.position }}</td>
              <td>
                <v-btn @click="editUser(item)" color="primary">Edit</v-btn>
                <v-btn @click="deleteUser(item.id)" color="red">Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Identification', value: 'identification' },
          { text: 'Position', value: 'position' },
          { text: 'Actions', value: 'actions' },
        ],
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:5000/api/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      editUser(user) {
        this.$router.push({ name: 'UserEdit', params: { id: user.id } });
      },
      async deleteUser(id) {
        try {
          await axios.delete(`http://localhost:5000/api/users/${id}`);
          this.fetchUsers(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      },
    },
  };
  </script>
  