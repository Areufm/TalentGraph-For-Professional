<template>
    <HeaderBar />
    <div class="container">
        <div class="search">
            <SearchBar />
        </div>
        <div class="sort">
            <el-button type="primary" style="margin: auto 20px;">名企优先</el-button>
            <el-button type="primary" style="margin: auto 20px;">薪资优先</el-button>
            <el-button type="primary" style="margin: auto 20px;">同城优先</el-button>
            <el-button type="primary" style="margin: auto 20px;">技能优先</el-button>

            <el-button type="primary" style="margin: auto 20px;" @click="drawer = true">
                详细信息
            </el-button>

            <el-drawer v-model="drawer" direction="rtl" size="60%">
                <template #header>
                    <h1>职位具体信息</h1>
                </template>
                <template #default>
                    <Info />
                </template>
                <template #footer>
                    <div style="flex: auto">
                        <el-button @click="cancelClick">cancel</el-button>
                        <el-button type="primary" @click="confirmClick">confirm</el-button>
                    </div>
                </template>
            </el-drawer>
        </div>
        <div class="center">
            <div class="left">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <div style="margin: 10px auto;">
                    <el-pagination :page-size="10" :pager-count="7" layout="prev, pager, next" :total="100" />
                </div>
            </div>


            <div class="right">


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from "@/components/HeaderBar.vue"
import SearchBar from "@/components/SearchBar.vue"
import Card from "./components/Card.vue";

</script>

<style scoped>
.container {
    margin-top: 50px;
    background-color: rgb(242, 242, 245);
    height: calc(100vh-50px);
    overflow-y: auto;
}

.sort {
    display: flex;
    margin: 20px auto 20px 150px;
    height: 50px;
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
    /* border: 2px black solid; */
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
    margin: 0 20px 60px 10px;
}

.card {
    border: 2px black solid;
    border-radius: 20px;
    margin: 10px auto;
    height: 150px;
    /* width: 700px; */
    width: 95%;
    padding: 10px;
}
</style>