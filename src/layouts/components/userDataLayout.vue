<template>
    <div class="user-data-layout">
        <slot></slot>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="css">
/* @import '../../style.css'; */

.user-data-layout {
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    min-height: 80vh;
}
</style>