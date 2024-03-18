<template>
    <HeaderBar />
    <div class="container">
        <Radar />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from "@/components/HeaderBar.vue";
import Radar from "@/components/Chart/Radar.vue";
</script>

<style scoped>
.container {
    margin-top: 80px;
}
</style>