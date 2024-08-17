/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  //存储
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    const value = localStorage.getItem(key);
    if (value && value !== "undefined" && value !== "null") {
      return JSON.parse(value);
    }
    return null;
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  },
};

/**
 * 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
  //存储
  set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    const value = window.sessionStorage.getItem(key);
    if (value && value !== "undefined" && value !== "null") {
      return JSON.parse(value);
    }
    return null;
  },
  // 删除数据
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
};
