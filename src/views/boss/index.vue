<template>
  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <p v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</p>
    <template #footer>Footer content</template>
  </el-card>
  <div class="example-basic">
    <el-time-picker v-model="value1" placeholder="Arbitrary time" />
    <el-time-picker
      v-model="value2"
      arrow-control
      placeholder="Arbitrary time"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
const value1 = ref();
const value2 = ref();
</script>

<style scoped>
.example-basic .el-date-editor {
  margin: 8px;
}
</style>
