<template>
    <div class="new">
        <button @click="openModal" type="button" class="btn btn-primary">New user</button>

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>Add new user</h3>
                <br>
                <div class="container">
                    <form @submit.prevent="submit" class="card-body" ref="createUserForm">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" required class="form-control" v-model="name" />
                        </div>
                        <div class="form-group">
                            <label>Lastname</label>
                            <input type="text" required class="form-control" v-model="lastname" />
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" required class="form-control" v-model="username" />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" required class="form-control" v-model="email" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="text" required class="form-control" v-model="password" />
                        </div>
                        <div v-if="error" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </form>
                </div>
                <div class="d-flex justify-content-around">
                    <button v-on:click="cancel" type="button" class="btn btn-secondary">Cancel</button>
                    <button v-on:click="createUser" type="button" class="btn btn-success">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'NewUserModal',
    data() {
        return {
            showModal: false,
            name: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        cancel() {
            this.$refs.createUserForm.reset();
            this.closeModal();
        },
        async createUser() {
            try {
                if (!this.valideEmail(this.email)) {
                    this.error = 'Invalid email address.';
                    return;
                }
                if (this.name && this.lastname && this.username && this.email && this.password) {
                    await axios.post('users/add', {
                        name: this.name,
                        lastname: this.lastname,
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    });
                    this.$refs.createUserForm.reset();
                    this.closeModal();
                } else {
                    this.error = 'All fields must be completed.';
                }
            } catch (e) {
                this.error = 'Error creating user.';
                console.error('Error creating user:', e.message);
            }
        },
        valideEmail(email) {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(validRegex)) {
                return false;
            }
            return true;
        }
    }
}
</script>