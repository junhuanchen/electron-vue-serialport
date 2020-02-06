<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div class="dashboard-text">port:{{port}}</div>
    <div class="dashboard-text">info:{{info}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      port: '',
      info: ''
    }
  },
  methods: {
    view_ports() {
      this.listLoading = true
    },
    port_cache() {
      ipcRenderer.send('port_cache', 'index.vue')
    },
    port_init() {
      ipcRenderer.on('port_cache', (event, arg) => {
        console.log(arg)
        this.info = arg
      })
      ipcRenderer.on('port_ports', (event, arg) => {
        console.log(arg)
        this.port = arg
      })
      setInterval(this.port_cache, 1000)
    }
  },
  created: function() {
    this.port_init()
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
