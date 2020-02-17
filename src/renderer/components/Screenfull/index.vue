<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    click() {
      ipcRenderer.send('Screenfull', 'toggle')
    },
    init() {
      ipcRenderer.on('isfull', (event, arg) => {
        console.log(arg === 'true', this.isFullscreen)
        this.isFullscreen = arg === 'true'
      })
      ipcRenderer.send('Screenfull', 'isfull')
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
