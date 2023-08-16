<template>
  <div id="app">
    <div id="nav" :class="active ? 'active' : ''" @click="close">
      <!-- 集成页面 -->
      <router-link to="/home">Home</router-link>
      <!-- solid路由 -->
      <router-link to="/solid"> Solid </router-link>
      <!-- react路由 -->
      <router-link to="/react"> React </router-link>
      <!-- vue2路由 -->
      <router-link to="/vue2"> Vue2 </router-link>
      <!-- vue3路由 -->
      <router-link to="/vue3"> Vue3 </router-link>
    </div>
    <div class="content" @click="active = false">
      <router-view />
    </div>
  </div>
</template>

<script lang="jsx">
export default {
  name: 'App',
  data() {
    return {
      active: false
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    close() {
      if (this.active) this.active = false
    },
    handleMessage(event) {
      if (event.origin === location.origin && event.source !== window) {
        console.log('父应用接收到消息：', event.data)
        alert('父应用接收到消息：' + event.data)
        // 将消息发送给子应用
        event.source.postMessage('Hello 子应用，我是父应用!', event.origin)
      }
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-size: 20px;
  height: 100vh;
  --theme: rgb(241, 107, 95);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100vw;
}

#nav {
  background-color: white;
  flex-shrink: 0;
  font-size: 20px;
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  padding: 30px 0;
  min-width: 210px;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: 3px 0px 9px 2px #e6e6e6;
  transition: transform 0.1s linear;
  transform: translate(0, 0);
  overflow: auto;
}

@media screen and (max-width: 768px) {
  #nav {
    position: absolute;
    box-shadow: none;
    transform: translate(-100%, 0);
  }
}

.wujie_iframe {
  width: 100%;
  height: 100%;
}

iframe {
  border: none;
}

h3 {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
}

.content {
  flex: 1;
  height: 100vh;
  overflow: hidden scroll;
  width: 1px;
}

#nav a {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s linear;
}

#nav a:hover {
  color: rgb(241, 107, 95);
}

.alive {
  display: inline-block;
  white-space: nowrap;
  background-color: rgb(241, 107, 95);
  border-radius: 8px;
  margin-left: 4px;
  font-size: 10px;
  vertical-align: top;
  padding: 1px 4px;
  color: white;
}

#nav a.router-link-active {
  color: rgb(241, 107, 95);
  background: rgba(0, 0, 0, 0.05);
}
</style>
