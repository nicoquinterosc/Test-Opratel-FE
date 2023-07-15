<template>
    <div class="new">

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>{{ modalTitle }}</h3>
                <br>
                <div class="container">
                    <form @submit.prevent="submit" class="card-body" ref="editUserForm">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" required class="form-control" v-model="user.name" />
                        </div>
                        <div class="form-group">
                            <label>Lastname</label>
                            <input type="text" required class="form-control" v-model="user.lastname" />
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" required class="form-control" v-model="user.username" />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" required class="form-control" v-model="user.email" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="text" required class="form-control" v-model="user.password" />
                        </div>
                        <div v-if="error" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </form>
                </div>
                <div class="d-flex justify-content-around">
                    <button v-on:click="cancel" type="button" class="btn btn-secondary">Cancel</button>
                    <button v-on:click="editUser" type="button" class="btn btn-success">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'EditUserModal',
    data() {
        return {
            user: {
                name: this.user && this.user.name ? this.user.name : '',
                lastname: this.user && this.user.lastname ? this.user.lastname : '',
                username: this.user && this.user.username ? this.user.username : '',
                email: this.user && this.user.email ? this.user.email : '',
                password: this.user && this.user.password ? this.user.password : '',
            },
            error: '',
        }
    },
    props: ['showModal', 'selectedUser', 'modalTitle'],
    watch: {
        selectedUser(newSelectedUser) {
            this.user = newSelectedUser;
        },
        showModal(){
            this.error = ''; 
        }
    },
    methods: {
        closeModal() {
            this.user = null;
            this.$refs.editUserForm.reset();
            this.$emit('closeModal', true)
        },
        cancel() {
            this.closeModal();
        },
        async editUser() {
            try {
                if (this.user) {
                    await axios.put(`users/update/${this.user.id}`, {
                        name: this.user.name,
                        lastname: this.user.lastname,
                        username: this.user.username,
                        email: this.user.email,
                        password: this.user.password,
                    });
                    this.$refs.editUserForm.reset();
                    this.closeModal();
                } else {
                    this.error = 'All fields must be completed.';
                }
            } catch (e) {
                this.error = 'Error updating user.';
            }
        }
    }
}
</script>