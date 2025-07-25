<template>
    <main class="blog">
        <UserDataLayout class="col-4" />
        <BlogLayout class="col-8" />
    </main>
    <footer>
        <footerLayout />
    </footer>
</template>
<script>
import BlogLayout from '../layouts/components/blogLayout.vue';
import UserDataLayout from '../layouts/components/userDataLayout.vue';
import footerLayout from '../components/footerLayout.vue';
export default {
    components: {
        BlogLayout,
        UserDataLayout,
        footerLayout
    }
}
</script>
<style lang="css">
.blog {
    display: flex;
    justify-content: space-between;
}

.col-4 {
    width: 33%;
    margin-top: 20px;
}

.col-8 {
    margin-top: 20px;

    width: 66%;
}
</style>