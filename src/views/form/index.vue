<template>
    <HeaderBar />
    <div class="container">
        <div class="form">
            <div v-if="active == 0" style="width: 100%;">
                active = 0
                <el-form :model="form" label-width="auto" style="width: 100%;">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" clearable />
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.age" clearable />
                    </el-form-item>
                    <el-form-item label="技能点">
                        <el-input v-model="form.skill" clearable />
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="active == 1" style="width: 100%;">
                active = 1
                <el-form :model="form" label-width="auto" style="">
                    <el-form-item label="教育经历">
                        <el-input v-model="form.education" />
                    </el-form-item>
                    <el-form-item label="项目经历">
                        <el-input v-model="form.projects" />
                    </el-form-item>
                    <el-form-item label="地区">
                        <!-- <el-input v-model="form.area" /> -->
                        <el-cascader placeholder="请选择地区" size="default" :options="regionData" v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="active == 2" style="width: 100%;">
                active = 2
                <el-form :model="form" label-width="auto" style="">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" clearable />
                    </el-form-item>
                    <el-form-item label="学历">
                        <el-select v-model="form.degree" placeholder="请选择你的学历">
                            <el-option label="专科" value="专科" />
                            <el-option label="本科" value="本科" />
                            <el-option label="硕士" value="硕士" />
                            <el-option label="博士" value="博士" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人信息描述">
                        <el-input v-model="form.info" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                            placeholder="请输入你的个人信息" clearable />
                    </el-form-item>
                </el-form>
            </div>

            <el-button @click="active--">上一步</el-button>
            <el-button v-if="active < 2" @click="next">下一步</el-button>
            <el-button v-else @click="submit">提交</el-button>

            <el-steps class="mb-4" style="width: 80%; margin-top: 20px" :space="200" :active=active simple>
                <el-step title="Step 1" :icon="Edit" />
                <el-step title="Step 2" :icon="UploadFilled" />
                <el-step title="Step 3" :icon="Picture" />
            </el-steps>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import HeaderBar from "@/components/HeaderBar.vue";
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { regionData } from 'element-china-area-data'
import { h } from 'vue'
import { ElNotification } from 'element-plus'

const handleChange = (value) => {
    console.log(value)
}

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
        title: 'Title',
        message: h('i', { style: 'color: teal' }, 'This is a reminder'),
    })
}
</script>

<style scoped>
.container {
    margin-top: 80px;
}

.form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 50vh;
    padding: 30px;
    border-radius: 30px;
    background: #e0e0e0aa;
    box-shadow: 15px 15px 30px #bebebe,
        -15px -15px 30px #ffffff;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

}
</style>