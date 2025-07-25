<template >
    <main class="layouts">
    <userDataLayout class="col-4" />
    <ProjectLayot class="col-8" />
    </main>
    <footer>
        <footerLayout />
    </footer>
</template>
<script>
import ProjectLayot from '../layouts/components/projectLayot.vue';
import userDataLayout from '../layouts/components/userDataLayout.vue';
import FooterLayout from '../components/footerLayout.vue';
export default {
    components: {
        ProjectLayot,
        userDataLayout,
        FooterLayout
    }
}
</script>
<style lang="css">
.layouts {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.col-4 {
    width: 33%;
}
.col-8 {
    width: 66%;
    margin-top: 20px;
}
</style>