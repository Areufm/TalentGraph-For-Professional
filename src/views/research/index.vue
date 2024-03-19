<template>
    <HeaderBar />
    <div class="container">
        <div class="search">
            <SearchBar />
        </div>
        <div class="center">
            <div class="left">
                <div class="card"></div>
                <div class="card"></div>
                <div class="card"></div>
                <div class="card"></div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from "@/components/HeaderBar.vue"
import SearchBar from "@/components/SearchBar.vue"
</script>

<style scoped>
.container {
    margin-top: 60px;
    background-color: rgb(242, 242, 245);
    height: 92vh;
    overflow-y: auto;
}

.search {
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    margin: 20px auto;
}

.center {
    display: flex;
}

.left {
    border: 2px black solid;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 150px;
}

.right {
    border: 2px black solid;
    border-radius: 20px;
    display: flex;
    flex: 1;
    margin: 0 20px 0 10px;
}

.card {
    border: 2px black solid;
    border-radius: 20px;
    margin: 10px auto;
    height: 200px;
    /* width: 700px; */
    width: 95%;
}
</style>