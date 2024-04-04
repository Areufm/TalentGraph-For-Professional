<template>
    <HeaderBar />
    <div class="container">
        <div class="search">
            <SearchBar />
        </div>
        <div class="sort">
            <p style="font-size: 17px; font-weight: bold;">请选择推荐方式:</p>
            <sort-button type="primary" style="margin: auto 20px;">名企优先</sort-button>
            <sort-button type="primary" style="margin: auto 20px;">薪资优先</sort-button>
            <sort-button type="primary" style="margin: auto 20px;">同城优先</sort-button>
            <sort-button type="primary" style="margin: auto 20px;">技能优先</sort-button>
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
    /* background-color: rgb(242, 242, 245); */
    background: linear-gradient(to bottom, rgba(192, 230, 245, 0.818) 2%, rgba(188, 228, 244, 0.616) 8%,
            rgb(211, 238, 248) 15%, rgb(221, 239, 245) 20%, rgb(225, 238, 242) 30%, white);
    height: calc(100vh-50px);
    overflow-y: auto;
}

.sort {
    display: flex;
    margin: 20px auto 20px 150px;
    height: 50px;
    text-align: center;
    align-items: center
}

sort-button {
    position: relative;
    padding: 5px 10px;
    border-radius: 7px;
    border: 2px solid rgb(61, 106, 255);
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    background: transparent;
    color: #000000;
    overflow: hidden;
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

sort-button:hover {
    color: white;
    background: rgb(61, 106, 255);
    box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
}

sort-button:hover::before {
    -webkit-animation: sh02 0.5s 0s linear;
    -moz-animation: sh02 0.5s 0s linear;
    animation: sh02 0.5s 0s linear;
}

sort-button::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: #04242a;
    box-shadow: 0 0 50px 30px #fff;
    -webkit-transform: skewX(-20deg);
    -moz-transform: skewX(-20deg);
    -ms-transform: skewX(-20deg);
    -o-transform: skewX(-20deg);
    transform: skewX(-20deg);
}

@keyframes sh02 {
    from {
        opacity: 0;
        left: 0%;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
        left: 100%;
    }
}

sort-button:active {
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: box-shadow 0.2s ease-in;
    -moz-transition: box-shadow 0.2s ease-in;
    transition: box-shadow 0.2s ease-in;
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