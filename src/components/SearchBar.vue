﻿<template>
  <form class="form">
    <div style="width: 50px"></div>
    <input
      class="input"
      :placeholder="searchQuery"
      required
      type="text"
      v-model="searchQuery"
      @keydown.enter.prevent="handleSearch"
    />
    <button class="reset" type="reset">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
    <button @click.prevent="handleSearch">
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="search"
        style="margin-right: 30px"
      >
        <path
          d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
          stroke="currentColor"
          stroke-width="1.333"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const searchQuery = ref("");
const router = useRouter();

const props = defineProps({
  searchValue: String,
});

onMounted(() => {
  searchQuery.value = props.searchValue as string;
});

const handleSearch = () => {
  router.push({ name: "Research", params: { query: searchQuery.value } });
};
</script>
<!-- <script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleInput() {
      // 处理输入事件，你可以在这里做一些实时搜索的操作
    },
    handleSearch() {
      console.log(this.searchQuery);
      // 处理搜索事件，你可以在这里触发搜索操作
      // 例如，可以将搜索关键词通过事件或者回调函数传递给父组件
      // this.$emit("form", this.searchQuery);
    },
  },
};
</script> -->

<style scoped>
.form button {
  border: none;
  background: none;
  color: #8b8ba7;
}

.form {
  --timing: 0.3s;
  --width-of-input: 60vw;
  --height-of-input: 60px;
  --border-height: 2px;
  --input-bg: #fff;
  --border-color: #2f2ee9;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg, #fff);
}

/* styling of Input */
.input {
  font-size: 1.1rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
}

/* styling of animated border */
.form:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}

/* Hover on Input */
.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}

/* here is code of animated border */
.form:focus-within:before {
  transform: scale(1);
}

/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}

/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}

/* sizing svg icons */
.form svg {
  width: 17px;
  margin-top: 3px;
}
</style>
