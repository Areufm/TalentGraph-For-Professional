<template>
    <HeaderBar />
    <div class="container">
        <el-steps class="mb-4" style="max-width: 600px" :space="200" :active=active simple>
            <el-step title="Step 1" :icon="Edit" />
            <el-step title="Step 2" :icon="UploadFilled" />
            <el-step title="Step 3" :icon="Picture" />
        </el-steps>
        <div v-if="active == 0">
            active = 0
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" />
                </el-form-item>
                <el-form-item label="技能点">
                    <el-input v-model="form.skill" />
                </el-form-item>
            </el-form>
        </div>
        <div v-if="active == 1">
            active = 1
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="教育经历">
                    <el-input v-model="form.education" />
                </el-form-item>
                <el-form-item label="项目经历">
                    <el-input v-model="form.projects" />
                </el-form-item>
                <el-form-item label="地区">
                    <el-input v-model="form.area" />
                </el-form-item>
            </el-form>
        </div>
        <div v-if="active == 2">
            active = 2
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="学历">
                    <el-select v-model="form.degree" placeholder="请选择你的学历">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人信息描述">
                    <el-input v-model="form.info" type="textarea" />
                </el-form-item>
            </el-form>
        </div>

        <el-button @click="active--">上一步</el-button>
        <el-button v-if="active < 2" @click="next">下一步</el-button>
        <el-button v-else @click="submit">提交</el-button>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import HeaderBar from "@/components/HeaderBar.vue";
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
const form = reactive({
    name: '猪开南',
    age: '19',
    skill: '啥都会',
    education: '',
    projects: '',
    area: '',
    username: '',
    degree: '',
    info: ''
})
const active = ref(0)

const next = () => {
    if (active.value++ >= 2) {
        active.value = 0
    }
}

const submit = () => {
    ElNotification({
        title: 'Prompt',
        message: 'This is a message that does not automatically close',
        duration: 0,
    })
}
</script>

<style scoped>
.container {
    margin-top: 80px;
}
</style>