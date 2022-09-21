<template>
  <button @click="inc">
    {{ count }}
  </button>
</template>

<script setup>
import { watchEffect } from "vue";
// declaring a reactive variable backed by an underlying ref
let count = $ref(1);

// log count, and automatically log again whenever it changes.
// no need for .value anymore!
watchEffect(() => console.log(count));

function inc() {
  // assignments are reactive
  count++;
}
</script>

<style lang="scss" scoped></style>
