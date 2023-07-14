<template>
    <div>

    </div>
</template>

<script>

export default {
    name: 'Menus',
    created() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
        }
    }
}
</script>

<style></style>