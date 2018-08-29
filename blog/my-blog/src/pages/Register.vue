<template>
  <div class="signin">
    <div class="login" v-show="login">
      <Input prefix="md-person" placeholder="email" type="email" />
      <Input prefix="md-key" placeholder="password" type="password" />
      <Button type="primary" long>登录</Button>
      <a href="javascript:void(0)" @click="changeStat('regist')">注 册</a>
    </div>
    <div class="register" v-show="!login">

    </div>
  </div>
</template>

<script>
    export default {
      name: "register",
      data () {
        return {
          login: true
        }
      },
      methods: {
        changeStat (action) {
          this.login = action === 'login' ? true : false;
        }
      }
    }
</script>

<style scoped>
  /*.signin {*/
    /*width: 100%;*/
    /*height: 800px;*/
    /*background: url("../assets/xiaolu.png") no-repeat scroll;*/
  /*}*/

  .login {
    width: 400px;
    margin: 200px auto;
  }

  .login div {
    margin-bottom: 30px;
  }

  a {
    font-size: 12px;
    margin-left: 360px;
    margin-top: 5px;
    display: block;
  }
</style>
