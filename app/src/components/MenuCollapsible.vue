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
        <template v-if="isOpen && hasChildren">
            <tr v-for="(childMenu, i) in menu.children" :key="i">
                <td>{{ childMenu.id }}</td>
                <td>{{ childMenu.name }}</td>
                <td>{{ childMenu.parentId }}</td>
                <td>
                    <MenuCollapsible :menu="childMenu" />
                </td>
            </tr>
        </template>
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
  