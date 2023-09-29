
// 暂停
export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// 防抖（过了wait才响应）
export function debounceTime<T>(fn: T, wait: number): () => void { //第一个参数是函数 第二个参数是毫秒值
  let timer: NodeJS.Timeout //声明一个变量来接收延时器 初始值为null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      typeof fn === 'function' && fn(...args) //调用这函数
    }, wait);
  }
}

// 节流， 每wait执行一次
export function throttleTime<T>(fn: T, wait: number): () => void {
  let timer: NodeJS.Timeout | null //节点闸
  return function (...args) {
    if (timer) return //null false 不是null结果减少true 如果上传没有我就直接跳过 没有人我就上去
    timer = setTimeout(() => {
      typeof fn === 'function' && fn(...args) //调用这函数
      timer = null //做完之后重新关闭节点闸
    }, wait);
  }
}
