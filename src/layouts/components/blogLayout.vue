<template>
    <main class="blog-cards">
        <div class="blog-content">
           <h1>Blog <span class="higlite"> Post</span></h1>
        </div>
       
    </main>
</template>
<script>
export default {

}
</script>
<style lang="css">
@import '../../style.css';
.blog-cards {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    animation: rightTo .4s ease-in-out;
}
.blog-content {
    padding: 30px;
}

@keyframes rightTo {
    0% {
        opacity: 0;
        transform: translateX(130px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

</style>