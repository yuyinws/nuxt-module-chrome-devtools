<script setup lang="ts">
import { ref } from 'vue'

const chromeDevToolsSrc = ref('')
async function init() {
  try {
    const raw = await fetch('/__chrome_devtools')
    const data = await raw.text()

    chromeDevToolsSrc.value = data
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

init()
</script>

<template>
  <iframe v-if="chromeDevToolsSrc" :src="chromeDevToolsSrc" />
</template>

<style>
html,
body,
#__nuxt,
iframe {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
