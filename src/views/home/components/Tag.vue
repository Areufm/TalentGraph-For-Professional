<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="计算机" name="first">
            <HotWorks />
        </el-tab-pane>
        <el-tab-pane label="网络安全" name="second">
            <HotWorks />
        </el-tab-pane>
        <el-tab-pane label="金融" name="third">
            <HotWorks />
        </el-tab-pane>
        <el-tab-pane label="教育" name="fourth">
            <HotWorks />
        </el-tab-pane>
        <el-tab-pane label="医疗" name="fifth">
            <HotWorks />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import HotWorks from "./HotWorks.vue"
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style scoped>
::v-deep .el-tabs__header {
    overflow: hidden;
    display: flex;
    justify-content: space-around;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>