<template>
    <main>
        <div class="main-cards">
            <UserDataLayout class="col-4" />
            <!--  -->
                <InterestLayout class="col-4" />
            <!-- <div class="interst-cards">

            </div> -->
            <!--  -->
            <WorksLayout class="col-4" />
        </div>
    </main>

</template>
<script>
import InterestLayout from '../layouts/components/interestLayout.vue';
import UserDataLayout from '../layouts/components/userDataLayout.vue';
import WorksLayout from '../layouts/components/worksLayout.vue';

export default {
    components: {
        UserDataLayout,
        InterestLayout,
        WorksLayout
    },
}
</script>
<style lang="css">
@import '../style.css';

.main-cards {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 20px; */
}
</style>