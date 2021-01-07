function defineReactive(obj, key, val, callback, options = {}) {
  Object.defineProperty(obj, key, {
    configurable: true,
    emuerable: true,
    get() {
      return val;
    },
    set(newVal) {
      console.log('set', newVal, val)
      if (newVal === val) {
        return;
      }
      const oldVal = val;
      val = newVal;
      callback && typeof callback === "function" && callback(newVal, oldVal);
      options.deep && watch(obj, key, callback, options);
    }
  });
}

function watch(data, exp, callback, options = {}) {
  const k = exp.split(".");
  for (let i = 0; i < k.length - 1; i++) {
    data = data[k[i]]; // 键路径最深一层所属的对象
  }
  const key = k[k.length - 1];
  let val = data[key];
  if (options.deep && typeof val === "object") {
    Object.keys(val).forEach(childKey => {
      watch(val, childKey, callback, options);
    });
  }
  defineReactive(data, key, val, callback, options);
}
function setObserver(ctx) {
  if (!ctx) {
    console.warn("未指定Page所在上下文环境");
    return;
  }
  if (!ctx.data) {
    console.warn("Page缺少data对象");
    return;
  }
  if (!ctx.watch) {
    console.warn("请在Page的watch对象中设置需要监听的属性");
    return;
  }
  // 为watch对象内的每一个属性表达式注册监听器
  Object.keys(ctx.watch).forEach(exp => {
    const callback = (ctx.watch[exp].handler || ctx.watch[exp]).bind(ctx);
    const deep = ctx.watch[exp].deep;
    const options = {
      ...(deep && { deep })
    };
    watch(ctx.data, exp, callback, options);
  });
}

export { setObserver, watch };
