<template lang="html">
  <form action="" ref="form1">
    <div class="ydc-body-login-box">
      <div class="ydc-user-img">
        <div class="ydc-user-img-img"><img src="../assets/images/icon/ph.png" alt=""></div>
      </div>
      <div class="ydc-user-border">
        <input type="email" name="email" data-type="email" placeholder="请输入邮箱账号">
      </div>
    </div>
    <div class="ydc-body-login-box">
      <div class="ydc-user-img">
        <div class="ydc-user-img-img"><img src="../assets/images/icon/pad.png" alt=""></div>
      </div>
      <div class="ydc-user-border">
        <input type="password" name="password" data-type="password" placeholder="密码">
      </div>
    </div>
    <div class="ydc-bod-aq">
      <p>为了您的账号安全，请勿在公共电脑登录</p>
    </div>
    <div class="clearfix">
      <div class="fl">
        <input type="checkbox" checked="checked">
        <label>十天内免登录</label>
      </div>
      <div class="fr">
        <a href="#">忘记密码</a>
      </div>
    </div>
    <div class="ydc-body-submit">
      <a href="#" @click="login()">登录</a>
    </div>
    <div class="ydc-login-box">

      <a href="go-reg.html" target="_blank">立即注册</a>
      <span>|</span>
      <a href="customer.html" target="_blank">常见问题</a>

    </div>
  </form>
</template>

<script>
  import {SERVER} from '@/config';

  export default {
    data(){
      return {}
    },
    methods: {
      async login(){
        let form = new FormData(this.$refs['form1']);

        let res = await fetch(`${SERVER}/api/login`,{
          method: 'post',
          body: form
        });

        let json = await res.json();
        console.log(json);
        if(json.err){
          alert(json.msg);
        }else{
          localStorage.token = json.token;
          alert('登录成功');

          this.$router.push('/');
        }
      }
    }
  }
</script>

<style lang="css" scoped>

</style>