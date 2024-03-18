<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="具体信息" name="defineinfo">
                <DefineInfo />
              </el-tab-pane>
              <el-tab-pane label="准确率分析" name="accuracyanalysis">
                <AccuracyAnalysis />
              </el-tab-pane>
              <el-tab-pane label="个人账户" name="account">
                <AccountInfo :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import DefineInfo from "./components/DefineInfo.vue";
import AccountInfo from "./components/AccountInfo.vue";
import AccuracyAnalysis from "./components/AccuracyAnalysis.vue";

export default {
  name: "Profile",
  components: { UserCard, DefineInfo, AccountInfo, AccuracyAnalysis },
  data() {
    return {
      user: {},
      activeTab: "defineinfo",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.getUser();
  },
  methods: {
    // getUser() {
    //   this.user = {
    //     name: this.name,
    //     role: this.roles.join(" | "),
    //     email: "admin@test.com",
    //     avatar: this.avatar,
    //   };
    // },
    getUser() {
      this.user = {
        name: "王五",
        role: "Admin",
        id: "T000323858224717",
        telephone: "7777777",
        email: "1717171717@qq.com",
        zhiXin: "60",
        recognitionTime: "2023年4月12日 17:17 PM",
        certificationResult: "高级会员",
        confidenceDegree: "92%",
        isSignIn: "已注册",
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
      };
    },
  },
};
</script>

<!-- vue3组合式api及setup语法糖 -->
<!-- 
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <UserCard :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="具体信息" name="defineinfo">
                <DefineInfo />
              </el-tab-pane>
              <el-tab-pane label="准确率分析" name="accuracyanalysis">
                <AccuracyAnalysis />
              </el-tab-pane>
              <el-tab-pane label="个人账户" name="account">
                <AccountInfo :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import UserCard from "./components/UserCard";
import DefineInfo from "./components/DefineInfo.vue";
import AccountInfo from "./components/AccountInfo.vue";
import AccuracyAnalysis from "./components/AccuracyAnalysis.vue";

const store = useStore();
const user = ref({});
const activeTab = ref("defineinfo");

const name = computed(() => store.getters.name);
const avatar = computed(() => store.getters.avatar);
const roles = computed(() => store.getters.roles);

const getUser = () => {
  user.value = {
    name: "王五",
    role: "Admin",
    id: "T000323858224717",
    phone: "7777777",
    email: "1717171717@qq.com",
    zhiXin: "60",
    recognitionTime: "2023年4月12日 17:17 PM",
    certificationResult: "高级会员",
    confidenceDegree: "92%",
    isSignIn: "已注册",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
  };
};

onMounted(getUser);
</script> -->
