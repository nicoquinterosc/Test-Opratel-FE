<template>
    <div id="app">
        <div class="container">

            <NewUserModal />

            <div class="list">
                <h4>Users</h4>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Filter user" aria-label="Filter user"
                        aria-describedby="basic-addon2" v-model="filter">
                    <div class="input-group-append">
                        <button @click="getUsers(filter)" class="btn btn-outline-secondary" type="button">Filter</button>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, i) in users" :key="i">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.name }}</td>
                            <td>{{ user.lastname }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td class="d-flex justify-content-center">
                                <a><span class="material-symbols-rounded editIcon">edit</span></a>
                                <a @click="openModalConfirm(user)"><span class="material-symbols-rounded deleteIcon">delete</span></a>
                                <a><span class="material-symbols-rounded listMenuIcon">list</span></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3> Are you sure? </h3>
                <br>

                <div class="d-flex justify-content-around">
                    <button v-on:click="cancel" type="button" class="btn btn-secondary">Cancel</button>
                    <button v-on:click="deleteUser(selectedUser)" type="button" class="btn btn-danger">Confirm</button>
                </div>
            </div>
        </div>

        </div>
    </div>
</template>

<script>

import axios from 'axios';
import NewUserModal from './NewUserModal';

export default {
    name: 'Users',
    components: {
        NewUserModal
    },
    data() {
        return {
            showModal: false,
            users: null,
            name: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            error: '',
            filter: '',
            selectedUser: null
        }
    },
    methods: {
        openModalConfirm(user) {
            this.selectedUser = user;
            this.showModal = true;
        },
        async getUsers(filter) {
            let url = '';
            if (filter) {
                url = `users/all?filter=${filter}`;
            } else {
                url = 'users/all';
            }
            try {
                const response = await axios.get(url);
                this.users = response.data.users;
            } catch (e) {
                console.error(`Error to fetch: ${e.message}`)
            }
        },
        async deleteUser(userToDelete) {
            try {
                await axios.delete(`users/delete/${userToDelete.id}`);
                this.users = this.users.filter(user => user.id !== userToDelete.id) 
            } catch (e) {
                console.error(`Error to fetch: ${e.message}`)
            }
            this.showModal = false;
        },
        cancel() {
            this.showModal = false;
        },
    },
    async created() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
        }
        this.getUsers();
    }
}
</script>

<style>
.new {
    text-align: left;
    padding-top: 10px;
    padding-bottom: 0px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    width: 75%;
}

.modal-content .container {
    width: 50%;
    margin-bottom: 3%;
}

.editIcon,
.deleteIcon,
.listMenuIcon {
    cursor: pointer;
}
</style>