import { computed, getCurrentInstance, inject, reactive, toRefs } from "vue";
import { piniaSymbol } from "./createPinia";

export function defineStore(id, options) {
  const { state: stateFn, actions, getters } = options;

  const state = reactive(stateFn());
  
  function useStore() {
    // 获取组件实例
    const currentInstance = getCurrentInstance()
    // 获取pinia实例
    const pinia = currentInstance && inject(piniaSymbol)
    // 如果不存在则创建一次
    if (!pinia._s.has(id)) {
      pinia._s.set(id, reactive({
        ...toRefs(state),
        ...Object.keys(getters || {}).reduce((computedGetters, name) => {
          computedGetters[name] = computed(() => {
            return getters[name].call(store, store)
          })
          return computedGetters
        }, {}),
        ...Object.keys(actions || {}).reduce((wrapperActions, actionName) => {
          wrapperActions[actionName] = () => actions[actionName].call(store)
          return wrapperActions
        }, {}),
        $patch(partialStateOrMutator) {
          if (typeof partialStateOrMutator === "object") {
            Object.keys(partialStateOrMutator).forEach((key) => {
              state[key] = partialStateOrMutator[key];
            });
          } else {
            partialStateOrMutator(state);
          }
        },
      }))
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}
