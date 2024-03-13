<template>
  <div class="card">
    <div class="card-details">
      <div style="display: flex; top: 0; justify-content: space-between">
        <p class="work_name">工作名称</p>
        <p class="work_salary">薪资</p>
      </div>
      <div style="display: flex">
        <p style="margin: 0 10px">关键词1</p>
        <p style="margin: 0 10px">关键词2</p>
        <p style="margin: 0 10px">关键词3</p>
        <p style="margin: 0 10px">关键词4</p>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p class="company_name">企业名</p>
        <p class="job">职业类型</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  /* width: 350px; */
  /* width: 30%; */
  /* height: 154px; */
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  /* padding: 1.8rem; */
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;
}

.card-details {
  color: black;
  height: 100%;
  /* gap: 0.5em; */
  display: grid;
  align-items: center;
  /* place-content: center; */
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.company_name {
  color: rgb(134, 134, 134);
  margin-left: 10px;
}

.job {
  margin-right: 10px;
}
.text-title {
  font-size: 1.5em;
  font-weight: bold;
}
/*Text*/
.work_name {
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 10px;
}

.work_salary {
  margin-right: 10px;
  font-size: 1.5em;
  font-weight: bold;
  color: red;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
</style>
