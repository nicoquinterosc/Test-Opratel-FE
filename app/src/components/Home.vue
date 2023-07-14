<template>
    <div id="app">
        <div class="container">
            <div class="menu-list">
                <h2 v-if="firstName">Welcome, {{ firstName }} {{ lastName }}</h2>
                <h2 v-if="!firstName">You are not logged in!</h2>
                <br>
                <h4>Menu List</h4>
                <br>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Menu ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Parent ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(menu, i) in menus" :key="i">
                            <th scope="row">{{ menu.id }}</th>
                            <td>{{ menu.name }}</td>
                            <td>{{ menu.parentId }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            menus: null
        }
    },
    computed: {
        ...mapGetters(['firstName', 'lastName'])
    }, async created() {
        try {
            const response = await axios.get('menus/all');
            this.menus = response.data.menus;
        } catch (e) {
            this.error = 'Invalid username/password!';
        }
    }
}
</script>

<style>
.container {
    padding-top: 2%;
}

.menu-list {
    padding-top: 3%;
}

.nav-link {
    color: white;
}

h2,
h6 {
    text-align: left;
}
</style>