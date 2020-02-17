<template>
  <div>
    <i class="el-icon-circle-close-outline" style="font-size:25px; line-height: 50px;" @click="click" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Closing',
  methods: {
    click() {
      ipcRenderer.sendSync('Closing')
    }
  }
}
</script>

<style scoped>
.closing-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
