<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="岗位名称">
                <el-input v-model="form.jobname" />
            </el-form-item>
            <el-form-item label="薪资情况">
                <el-input v-model="form.salary" placeholder="xx-xx k / 月" />
            </el-form-item>
            <!-- <el-form-item label="企业名称">
                <el-input v-model="form.name" />
            </el-form-item> -->
            <el-form-item label="学历要求">
                <el-select v-model="form.region" placeholder="请选择最低学历要求">
                    <el-option label="专科" value="专科" />
                    <el-option label="本科" value="本科" />
                    <el-option label="硕士" value="硕士" />
                    <el-option label="博士" value="博士" />
                </el-select>
            </el-form-item>
            <el-form-item label="职业类型">
                <el-cascader v-model="form.jobtype" :options="jobtype_options" :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="工作地区">
                <el-cascader placeholder="请选择地区" size="default" :options="regionData" v-model="selectedOptions"
                    @change="handleChange"></el-cascader>
            </el-form-item>
            <!-- <el-form-item label="Activity time">
                <el-col :span="11">
                    <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="line">-</el-col>
                <el-col :span="11">
                    <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time"
                        style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="Online activities" name="type" />
                    <el-checkbox label="Promotion activities" name="type" />
                    <el-checkbox label="Offline activities" name="type" />
                    <el-checkbox label="Simple brand exposure" name="type" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学历要求">
                <el-radio-group v-model="form.resource">
                    <el-radio label="专科" />
                    <el-radio label="本科" />
                    <el-radio label="硕士" />
                    <el-radio label="博士" />
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="详细要求">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item label="福利待遇">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import Vue from "vue";

export default {
    data() {
        return {
            selectedOptions: ["33", "3301", "330106"], // 初始化选中值
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                jobtype: ""
            },
            jobtype_options: [
                {
                    value: "Internet",
                    label: "互联网",
                    children: [
                        {
                            value: "Back-end development",
                            label: "后端开发",
                            children: [
                                { value: "Java", label: "Java 开发工程师" },
                                { value: "C/C++", label: "C/C++ 开发工程师" },
                                { value: "PHP", label: "PHP 开发工程师" },
                                { value: "Python", label: "Python 开发工程师" },
                                { value: "C#", label: "C# 开发工程师" },
                                { value: "Golang", label: "Golang 开发工程师" },
                                { value: "Node.js", label: "Node.js 开发工程师" },
                                { value: "Hadoop", label: "Hadoop 工程师" },
                                { value: "Blockchain engineer", label: "区块链工程师" },
                                { value: "Full-stack engineer", label: "全栈工程师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                        {
                            value: "Front-end & Mobile development",
                            label: "前端/移动开发",
                            children: [
                                { value: "Front-end dev", label: "前端开发工程师" },
                                { value: "Android", label: "Android 开发工程师" },
                                { value: "iOS", label: "iOS 开发工程师" },
                                { value: "U3D", label: "Unity 3D 开发工程师" },
                                { value: "UE4", label: "Unreal Engine 4 开发工程师" },
                                { value: "JavaScript", label: "JavaScript 开发工程师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                        {
                            value: "Testing",
                            label: "测试",
                            children: [
                                { value: "Test engineer", label: "测试工程师" },
                                { value: "Software testing", label: "软件测试工程师" },
                                { value: "Automation testing", label: "自动化测试工程师" },
                                { value: "Functional testing", label: "功能测试工程师" },
                                { value: "Test development", label: "测试开发工程师" },
                                { value: "Hardware testing", label: "硬件测试工程师" },
                                { value: "Game testing", label: "游戏测试工程师" },
                                { value: "Performance testing", label: "性能测试工程师" },
                                { value: "Penetration testing", label: "渗透测试工程师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                        {
                            value: "Operations & Technical Support",
                            label: "运维/技术支持",
                            children: [
                                { value: "Ops engineer", label: "运维工程师" },
                                { value: "Network engineer", label: "网络工程师" },
                                { value: "Cybersecurity", label: "网络安全工程师" },
                                { value: "System engineer", label: "系统工程师" },
                                { value: "DevOps engineer", label: "运维开发工程师" },
                                { value: "System administrator", label: "系统管理员" },
                                { value: "DBA", label: "数据库管理员(DBA)" },
                                { value: "System security", label: "系统安全工程师" },
                                { value: "Technical documentation", label: "技术文档工程师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                        {
                            value: "Sales Technical Support",
                            label: "销售技术支持",
                            children: [
                                { value: "Pre-sales support", label: "售前技术支持" },
                                { value: "Post-sales support", label: "售后技术支持" },
                                { value: "Sales technical support", label: "销售技术支持工程师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                    ],
                },
                {
                    value: "AI/Data",
                    label: "AI/数据",
                    children: [
                        {
                            value: "Artificial Intelligence",
                            label: "人工智能",
                            children: [
                                { value: "Image Algorithm", label: "图像算法" },
                                { value: "Natural Language Processing", label: "自然语言处理算法" },
                                { value: "Big Model Algorithm", label: "大模型算法" },
                                { value: "Data Mining", label: "数据挖掘" },
                                { value: "SLAM Algorithm", label: "SLAM算法" },
                                { value: "Recommendation Algorithm", label: "推荐算法" },
                                { value: "Search Algorithm", label: "搜索算法" },
                                { value: "Voice Algorithm", label: "语音算法" },
                                {
                                    value: "Autonomous Driving System Engineer",
                                    label: "自动驾驶系统工程师",
                                },
                                { value: "Other", label: "其他" },
                            ],
                        },
                        {
                            value: "Data",
                            label: "数据",
                            children: [
                                { value: "Data Analyst", label: "数据分析师" },
                                { value: "Data Development", label: "数据开发" },
                                { value: "Data Warehouse", label: "数据仓库" },
                                { value: "Data Mining", label: "数据挖掘" },
                                { value: "Data Architect", label: "数据架构师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                    ],
                },
                {
                    value: "Electronics",
                    label: "电子",
                    children: [
                        {
                            value: "Electronics/Hardware Development",
                            label: "电子/硬件开发",
                            children: [
                                { value: "Electronics Engineer", label: "电子工程师" },
                                { value: "Hardware Engineer", label: "硬件工程师" },
                                { value: "Embedded Software Engineer", label: "嵌入式软件工程师" },
                                { value: "FPGA Development", label: "FPGA开发" },
                                { value: "MCU", label: "单片机" },
                                { value: "Driver Development Engineer", label: "驱动开发工程师" },
                                { value: "PCB Engineer", label: "PCB工程师" },
                                {
                                    value: "Electronic Maintenance Technician",
                                    label: "电子维修技术员",
                                },
                                { value: "RF Engineer", label: "射频工程师" },
                                { value: "Circuit Design", label: "电路设计" },
                                { value: "System Integration", label: "系统集成" },
                                { value: "Optical Engineer", label: "光学工程师" },
                                { value: "DSP Development", label: "DSP开发" },
                                { value: "ARM Development", label: "ARM开发" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                        {
                            value: "Semiconductor/Chip",
                            label: "半导体/芯片",
                            children: [
                                { value: "Integrated Circuit IC Design", label: "集成电路IC设计" },
                                {
                                    value: "Digital IC Verification Engineer",
                                    label: "数字IC验证工程师",
                                },
                                {
                                    value: "Analog Layout Design Engineer",
                                    label: "模拟版图设计工程师",
                                },
                                { value: "Chip Test Engineer", label: "芯片测试工程师" },
                                { value: "DFT Engineer", label: "DFT工程师" },
                                { value: "FAE", label: "FAE" },
                                { value: "Digital Frontend Designer", label: "数字前端设计师" },
                                { value: "Digital Backend Engineer", label: "数字后端工程师" },
                                { value: "Analog IC Design Engineer", label: "模拟IC设计工程师" },
                                { value: "Other", label: "其他" },
                            ],
                        },
                    ],
                },
                {
                    value: "Electrical",
                    label: "电气",
                    children: [
                        {
                            value: "Electrical/Automation",
                            label: "电气/自动化",
                            children: [
                                { value: "Electrical Engineer", label: "电气工程师" },
                                { value: "Electrical Design Engineer", label: "电气设计工程师" },
                                { value: "Automation", label: "自动化" },
                                { value: "Mechatronics Engineer", label: "机电工程师" },
                                {
                                    value: "Building Electromechanical Engineer",
                                    label: "建筑机电工程师",
                                },
                                { value: "Other", label: "其他" },
                            ],
                        },
                    ],
                    // children: [
                    //   { value: "Electrical Engineer", label: "电气工程师" },
                    //   { value: "Electrical Design Engineer", label: "电气设计工程师" },
                    //   { value: "Automation", label: "自动化" },
                    //   { value: "Mechatronics Engineer", label: "机电工程师" },
                    //   { value: "Building Electromechanical Engineer", label: "建筑机电工程师" },
                    //   { value: "Other", label: "其他" },
                    // ],
                },
                {
                    value: "Telecommunications",
                    label: "通信",
                    children: [
                        {
                            value: "Electrical/Automation",
                            label: "通信",
                            children: [
                                { value: "Telecom Specialist", label: "通信项目专员" },
                                { value: "Telecom Project Manager", label: "通信项目经理" },
                                { value: "Telecom Technology Engineer", label: "通信技术工程师" },
                                { value: "Telecom R&D Engineer", label: "通信研发工程师" },
                                {
                                    value: "Wireless/Radio Frequency Engineer",
                                    label: "无线/射频通信工程师",
                                },
                                { value: "Mobile Communication Engineer", label: "移动通信工程师" },
                                { value: "Telecom Network Engineer", label: "电信网络工程师" },
                                { value: "Data Communication Engineer", label: "数据通信工程师" },
                                { value: "Telecommunication Test Engineer", label: "通信测试工程师" },
                                { value: "Optical Communication Engineer", label: "光通信工程师" },
                                { value: "Optical Transmission Engineer", label: "光传输工程师" },
                                { value: "Optical Network Engineer", label: "光网络工程师" },
                                { value: "Telecom Power Supply Engineer", label: "通信电源工程师" },
                                { value: "Wired Transmission Engineer", label: "有线传输工程师" },
                                { value: "Telecom Equipment Engineer", label: "通信设备工程师" },
                                { value: "Core Network Engineer", label: "核心网工程师" },
                                {
                                    value: "Telecommunication Standardization Engineer",
                                    label: "通信标准化工程师",
                                },
                                { value: "Other", label: "其他" },
                            ],
                        },
                    ],
                },
            ]
        };
    },
    methods: {
        findLabelByValue(data, value) {
            for (const item of data) {
                if (item.value === value) {
                    return item.label;
                } else if (
                    Array.isArray(item.children) &&
                    item.children.length > 0
                ) {
                    const foundLabel = this.findLabelByValue(item.children, value);
                    if (foundLabel) {
                        return foundLabel;
                    }
                }
            }
            return "";
        },
        handleChange(value) {
            console.log(value);
        },
        onSubmit() {
            this.$message("submit!");
        },
        onCancel() {
            this.$message({
                message: "cancel!",
                type: "warning",
            });
        },
    },
    computed: {
        lastSelectedRegionText() {
            const lastOption = this.selectedOptions[this.selectedOptions.length - 1];
            return this.findLabelByValue(regionData, lastOption);
        },
    },
};
</script>

<style scoped>
.line {
    text-align: center;
}
</style>
