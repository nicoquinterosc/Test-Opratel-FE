<template>
    <tbody>
        <tr>
            <td>{{ menu.id }}</td>
            <td>{{ menu.name }}</td>
            <td>{{ menu.parentId }}</td>
            <td>
                <button v-if="hasChildren" @click="toggleMenuChildren">
                    {{ isOpen ? 'Hide Children' : 'Show Children' }}
                </button>
            </td>
        </tr>
        <tr v-if="isOpen && hasChildren">
            <td :colspan="4">
                <table class="table table-striped">
                    <MenuCollapsible v-for="(childMenu, i) in menu.children" :key="i" :menu="childMenu" />
                </table>
            </td>
        </tr>
    </tbody>
</template>
  
<script>
export default {
    name: 'MenuCollapsible',
    props: ['menu'],
    data() {
        return {
            isOpen: false,
        };
    },
    computed: {
        hasChildren() {
            return this.menu.children && this.menu.children.length > 0;
        },
    },
    methods: {
        toggleMenuChildren() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>
  