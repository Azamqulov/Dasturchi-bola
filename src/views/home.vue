<template>
    <main>
        <div class="main-cards">
            <UserDataLayout class="col-4 " />
            <!--  -->
            <div class="interst-cards col-4">
                <SkillLayout />
                <!-- <InterestLayout class="col-4" /> -->
            </div>
            <!--  -->
            <projectLayot class="col-4" />
            <!-- <WorksLayout class="col-4" /> -->
        </div>
        <FooterLayout />
    </main>

</template>
<script>
import InterestLayout from '../layouts/components/blogLayout.vue';
import SkillLayout from '../layouts/components/skillLayout.vue';
import UserDataLayout from '../layouts/components/userDataLayout.vue';
// import WorksLayout from '../layouts/components/worksLayout.vue';
import projectLayot from '../layouts/components/projectLayot.vue';
import FooterLayout from '../components/footerLayout.vue';

export default {
    components: {
        UserDataLayout,
        InterestLayout,
        // WorksLayout,
        projectLayot,
        SkillLayout,
        FooterLayout
    },
}
</script>
<style lang="css">
@import '../style.css';

.main-cards {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    /* padding: 20px; */
}

.interst-cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>