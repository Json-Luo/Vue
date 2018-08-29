<template>
  <div id="header">
    <div class="header-content">
      <div id="logo">LOGO</div>
      <div id="nav">
        <Button type="primary">首页</Button>
        <Button type="primary">博文</Button>
        <Button type="primary">关于我</Button>
        <Input search placeholder="搜索..." />
        <Button type="success" to="/register">登录 / 注册</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",

  }
</script>

<style scoped>
  #header {
    height: 60px;
    width: auto;
    background: gray;
  }

  .header-content {
    width: 800px;
    height: 100%;
    margin: auto;
    vertical-align:middle;
    text-align: center;
  }

  #logo {
    float: left;
    display: inline-block;
    width: 80px;
    height: 40px;
    background: #3399ff;
    border-radius: 4px;
    margin-top: 10px;
  }

  #nav {
    display: inline-block;
    float: right;
    margin-top: 12px;
  }

  #nav button, a {
    margin-left: 20px;
  }

  #nav div {
    display: inline-block;
    width: 160px;
    margin-left: 20px;
  }
</style>
