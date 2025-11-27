import "../../../chunk-G2ADBYYC.js";
import fastdomSingleton from './singleton.js';
const create = (promised, type, fn, ctx) => {
  const tasks = promised._tasks;
  const fastdom = promised.fastdom;
  let task;
  const promise = new Promise(function (resolve, reject) {
    task = fastdom[type](function () {
      tasks.delete(promise);
      try {
        resolve(ctx ? fn.call(ctx) : fn());
      } catch (e) {
        reject(e);
      }
    }, ctx);
  });
  tasks.set(promise, task);
  return promise;
};
const exports = {
  initialize() {
    this._tasks = /* @__PURE__ */new Map();
  },
  mutate(fn, ctx) {
    return create(this, "mutate", fn, ctx);
  },
  measure(fn, ctx) {
    return create(this, "measure", fn, ctx);
  },
  clear(promise) {
    const tasks = this._tasks;
    const task = tasks.get(promise);
    this.fastdom.clear(task);
    tasks.delete(promise);
  }
};
const fastdomAsync = fastdomSingleton.extend(exports);
var async_default = fastdomAsync;
export { async_default as default };