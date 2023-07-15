<template>
    <div id="app">
        <div class="container">
            <div class="new">
                <button @click="openModalCreate()" type="button" class="btn btn-primary">New menu</button>
            </div>

            <CreateEditMenuModal :mode="modalMode" :showModal="showModalCreateEdit" :selectedMenu="selectedMenu"
                :modalInfo="modalInfo" @closeModal="closeModal" />

            <div class="list">
                <h4>Menus</h4>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Filter menu" aria-label="Filter menu"
                        aria-describedby="basic-addon2" v-model="filter">
                    <div class="input-group-append">
                        <button @click="getMenus(filter)" class="btn btn-outline-secondary" type="button">Filter</button>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Parent ID</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(menu, i) in menus" :key="i">
                            <th scope="row">{{ menu.id }}</th>
                            <td>{{ menu.name }}</td>
                            <td>{{ menu.parentId }}</td>
                            <td class="d-flex justify-content-center">
                                <a @click="openModalEdit(menu)"><span
                                        class="material-symbols-rounded editIcon">edit</span></a>
                                <a @click="openModalConfirmDelete(menu)"><span
                                        class="material-symbols-rounded deleteIcon">delete</span></a>
                                <a><span class="material-symbols-rounded listMenuIcon">list</span></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModalDelete" class="modal">
                <div class="modal-content">
                    <h3> Are you sure? </h3>
                    <br>

                    <div class="d-flex justify-content-around">
                        <button v-on:click="cancelDelete" type="button" class="btn btn-secondary">Cancel</button>
                        <button v-on:click="deleteMenu(selectedMenu)" type="button" class="btn btn-danger">Confirm</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import axios from 'axios';
import CreateEditMenuModal from './CreateEditMenuModal';

export default {
    name: 'Menus',
    components: {
        CreateEditMenuModal
    },
    data() {
        return {
            menus: null,
            filter: '',
            showModalCreateEdit: false,
            selectedMenu: null,
            menu: {
                name: '',
                parentId: ''
            },
            modalInfo: {
                title: '',
                confirmButton: ''
            },
            modalMode: '',
            showModalDelete: false,
        }
    },
    created() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
        }
        this.getMenus();
    },
    methods: {
        async getMenus(filter) {
            let url = '';
            if (filter) {
                url = `menus/all?filter=${filter}`;
            } else {
                url = 'menus/all';
            }
            try {
                const response = await axios.get(url);
                this.menus = response.data.menus;
            } catch (e) {
                console.error(`Error to fetch: ${e.message}`)
            }
        },
        openModalCreate() {
            this.modalMode = 'create';
            this.modalInfo = {
                title: 'Add new menu',
                confirmButton: 'Create'
            }
            this.selectedUser = null;
            this.showModalCreateEdit = true;
        },
        openModalEdit(menu) {
            this.modalMode = 'edit';
            this.modalInfo = {
                title: 'Edit menu',
                confirmButton: 'Edit',
            }
            this.selectedMenu = Object.assign({}, menu);
            this.showModalCreateEdit = true;
        },
        closeModal() {
            this.showModalCreateEdit = false;
            this.getMenus();
        },
        openModalConfirmDelete(menu) {
            this.selectedMenu = menu;
            this.showModalDelete = true;
        },
        async deleteMenu(menuToDelete) {
            try {
                await axios.delete(`menus/delete/${menuToDelete.id}`);
                this.menus = this.menus.filter(menu => menu.id !== menuToDelete.id)
            } catch (e) {
                console.error(`Error to fetch: ${e.message}`)
            }
            this.showModalDelete = false;
        },
        cancelDelete() {
            this.showModalDelete = false;
        },
    },
}
</script>

<style></style>