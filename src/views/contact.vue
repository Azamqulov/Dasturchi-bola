<template>
    <main class="contact">
        <FormLayout class="col-4" />
        <ContactLayout class="col-8" />
    </main>
    <footer>
        <footerLayout />
    </footer>
</template>
<script>
import ContactLayout from '../components/contactLayout.vue';
import FormLayout from '../components/formLayout.vue';
import FooterLayout from '../components/footerLayout.vue';

export default {
    components: {
        FormLayout,
        ContactLayout,
        FooterLayout
    },
}
</script>
<style lang="css">
.contact {
    display: flex;
    justify-content: space-between;
}

.col-4 {
    width: 33%;
}

.col-8 {
    width: 66%;
}
</style>