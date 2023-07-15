<template>
    <div class="new">

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>{{ modalInfo?.title }}</h3>
                <br>
                <div class="container">
                    <form @submit.prevent="submit" class="card-body" ref="userForm">
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
                    <button v-on:click="performAction" type="button" class="btn btn-success">{{ modalInfo?.confirmButton
                    }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'CreateEditUserModal',
    data() {
        return {
            user: {
                name: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
            },
            error: '',
        }
    },
    props: ['showModal', 'selectedUser', 'modalInfo', 'mode'],
    watch: {
        selectedUser(newSelectedUser) {
            if (newSelectedUser) {
                this.user = { ...newSelectedUser };
            } else {
                this.resetUser();
            }
        },
        showModal() {
            this.error = '';
        }
    },
    methods: {
        closeModal() {
            this.user = {
                name: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
            };
            this.$refs.userForm.reset();
            this.$emit('closeModal', true)
        },
        cancel() {
            this.closeModal();
        },
        performAction() {
            if (this.mode === 'create') {
                this.createUser();
            } else if (this.mode === 'edit') {
                this.editUser();
            }
        },
        resetUser() {
            this.user = {
                name: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
            };
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
                    this.$refs.userForm.reset();
                    this.closeModal();
                } else {
                    this.error = 'All fields must be completed.';
                }
            } catch (e) {
                this.error = 'Error updating user.';
            }
        },
        async createUser() {
            try {
                if (!this.valideEmail(this.user.email)) {
                    this.error = 'Invalid email address.';
                    return;
                }
                if (this.user.name && this.user.lastname && this.user.username && this.user.email && this.user.password) {
                    await axios.post('users/add', {
                        name: this.user.name,
                        lastname: this.user.lastname,
                        username: this.user.username,
                        email: this.user.email,
                        password: this.user.password,
                    });
                    this.$refs.userForm.reset();
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
    },
    mounted() {
        if (this.selectedUser) {
            this.user = { ...this.selectedUser };
        } else {
            this.resetUser();
        }
    }
}
</script>