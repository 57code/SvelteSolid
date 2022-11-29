<script setup>
// import { ref } from 'vue'

import { computed } from '@vue/reactivity';
import { reactive, toRefs } from 'vue';

// import { useCounterStore } from "../store/counter";
import { useCounterStore } from "../store/counter2";


defineProps({
  msg: String
})

// const count = ref(0)
const counter = useCounterStore();
</script>

<template>
  <h1>{{ counter.count }} - {{ counter.doubleCounter }}</h1>
  <button @click="counter.count++">counter.count++</button>
  <button @click="counter.inc()">counter.inc()</button>
  <button @click="counter.$patch({ count: counter.count + 1 })">
    counter.$patch({count: counter.count + 1})
  </button>
  <button @click="counter.$patch((state) => state.count++)">
    counter.$patch((state) => state.count++)
  </button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
