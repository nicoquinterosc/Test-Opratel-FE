<template>
    <div class="container card">
        <form @submit.prevent="login" class="card-body login-form" id="login-form">
            <img class="logo" src="../assets/logo.png" />
            <h3 class="card-title">Login</h3>
            <br>
            <div class="form-group">
                <input type="text" required class="form-control" v-model="username" placeholder="Enter username" />
            </div>
            <div class="form-group">
                <input type="password" required class="form-control" v-model="password" placeholder="Enter password" />
            </div>
            <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
            </div>
            <button class="btn btn-primary" v-on:click="login">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async login() {
            try {
                if (this.username && this.password) {
                    const response = await axios.post('login', {
                        username: this.username,
                        password: this.password,
                    });

                    localStorage.setItem('token', response.data.token);
                    this.$store.dispatch('firstName', response.data.firstName);
                    this.$store.dispatch('lastName', response.data.lastName);
                    this.$router.push('/');
                }
            } catch (e) {
                this.error = 'Invalid username/password!';
            }
        }
    }
}
</script>

<style>
.logo {
    width: 100px;
    margin-bottom: 5%;
}

.login-form {
    text-align: center;
}

.login-form button {
    margin-top: 5%;
    width: 40%;
}

input {
    width: 100%
}

.container.card {
    width: 40%;
    margin-top: 15%;
}
</style>