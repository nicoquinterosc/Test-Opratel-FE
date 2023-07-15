<template>
    <div class="new">

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>{{ modalInfo?.title }}</h3>
                <br>
                <div class="container">
                    <form @submit.prevent="submit" class="card-body" ref="menuForm">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" required class="form-control" v-model="menu.name" />
                        </div>
                        <div class="form-group">
                            <label>Parent ID <span>&nbsp;Leave blank if it's first level menu</span></label>
                            <input type="text" required class="form-control" v-model="menu.parentId" />
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
    name: 'CreateEditMenuModal',
    data() {
        return {
            menu: {
                name: '',
                parentId: '',
            },
            error: '',
        }
    },
    props: ['showModal', 'selectedMenu', 'modalInfo', 'mode'],
    watch: {
        selectedMenu(newSelectedMenu) {
            if (newSelectedMenu) {
                this.menu = { ...newSelectedMenu };
            } else {
                this.resetMenu();
            }
        },
        showModal() {
            this.error = '';
        }
    },
    methods: {
        closeModal() {
            this.menu = {
                name: '',
                parentId: '',
            };
            this.$refs.menuForm.reset();
            this.$emit('closeModal', true)
        },
        cancel() {
            this.closeModal();
        },
        performAction() {
            if (this.mode === 'create') {
                this.createMenu();
            } else if (this.mode === 'edit') {
                this.editMenu();
            }
        },
        resetMenu() {
            this.menu = {
                name: '',
                parentId: '',
            };
        },
        async createMenu() {
            try {
                if (this.menu.name) {
                    this.menu.parentId ??= null;
                    await axios.post('menus/add', {
                        name: this.menu.name,
                        parentId: this.menu.parentId,
                    });
                    this.$refs.menuForm.reset();
                    this.closeModal();
                } else {
                    this.error = 'All fields must be completed.';
                }
            } catch (e) {
                this.error = e.response?.data ? e.response?.data : 'Error creating menu.';
                console.error('Error creating menu:', e.message);
            }
        },
        async editMenu() {
            try {
                if (this.menu.name) {
                    this.menu.parentId ??= null;
                    await axios.put(`menus/update/${this.menu.id}`, {
                        name: this.menu.name,
                        parentId: this.menu.parentId,
                    });
                    this.$refs.menuForm.reset();
                    this.closeModal();
                } else {
                    this.error = 'All fields must be completed.';
                }
            } catch (e) {
                this.error = e.response?.data ? e.response?.data : 'Error updating menu.';
                console.log('Error updating menu:', e.message);
            }
        },
    },
    mounted() {
        if (this.selectedMenu) {
            this.menu = { ...this.selectedMenu };
        } else {
            this.resetMenu();
        }
    }
}
</script>

<style>
.form-group label span {
    font-style: italic;
    color: lightgrey;
}
</style>