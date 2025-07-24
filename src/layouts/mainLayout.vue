<template>
    <main class="mainLayout">
        <div class="container">
            <NavbarLayout class="navbar" />
            <router-view />
        </div>
    </main>
</template>
<script>
import NavbarLayout from './components/navbarLayout.vue';

export default {
    components: {
        NavbarLayout
    },
    name: 'MainLayout'
}
</script>
<style lang="css">
/* @import '../style.css'; */

.navbar {
    margin: 30px 0;
}
</style>