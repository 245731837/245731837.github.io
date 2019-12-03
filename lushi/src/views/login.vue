<template>
  <div>
    <div class="top">
      <router-link to="mine" class="top1">
        <van-icon name="arrow-left" />
      </router-link>
      <h1>登录</h1>
      <router-link to="/" class="top2">安全中心</router-link>
    </div>

    <van-tabs v-model="active" @click="onClick" class="select">
      <van-tab title="邮箱登录" name="clear">
        <div class="login">
          <van-cell-group>
            <van-field
              v-model="form.username"
              required
              clearable
              label="邮箱"
              placeholder="网易邮箱账号(18字符以内)"
              @click-right-icon="$toast('question')"
            />
            <van-field
              v-model="form.password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
            />
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="手机登录">
        <div class="login">
          <van-cell-group>
            <van-field
              v-model="form.phone"
              clearable
              placeholder="请输入11位手机号"
              @click-right-icon="$toast('question')"
              type="number"
            />
            <div class="check">
              <input type="text" placeholder="请输入验证码" v-model="form.check" />
              <p @click="onCheck">获取验证码</p>
            </div>
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>

    <div class="load" v-if="loadType">
      <van-loading type="spinner" color="#1989fa" size="50px"/>
    </div>

    <div class="subButton">
      <button class="warButton" @click="sub">登录</button>
      <router-link to="/register" class="newRejister">新用户注册 ></router-link>
    </div>

    <footer>
      <p>炉石传说与战网ID为两套独立的账号</p>
      <p>非网易通行证登录战网的用户，请先注册网易邮箱账号</p>
      <h2>炉石盒子新用户指引</h2>
    </footer>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      type: 1,
      form: {},
      active: 1,
      loadType:0
    };
  },
  methods: {
    onClick(name, title) {
      this.$toast(title);
    },
    onCheck() {
      this.$toast("以获取验证码，60s类请勿重新获取");
      var num = Math.ceil(Math.random() * 10);
      this.$axios("/vue/lushi/getcode", {
        params: {
          codeNum: num
        }
      }).then(res => {
        console.log(res);
        sessionStorage.codeNum = res.data.msg.code;
        console.log(sessionStorage.codeNum);
        this.$notify({
          message: `【网易】验证码：${sessionStorage.codeNum}，您正在登录网易手机帐号（若非本人操作，请删除本短信）`,
          duration: 10000
        });
      });
    },
    sub() {
      console.log(this.form);
      this.$axios.post("/vue/lushi/login", this.form).then(result => {
        console.log(result);
        if (result.data.flag == 1) {
          this.loadType=1
          sessionStorage.token =result.data.token
          const mobile = this.form.phone

          // this.$router.push({name:"home",params:{userId:"123",name:"lll"},query:{yer:yes,no:"可不好"}})
          setTimeout(() => {
            this.$router.push({name:"mine"})         
          }, 500);
        } else {
          this.$dialog({ message: "验证码错误" });
        }
      });
    },
    ...mapMutations([
        "changeFoot"
      ])
  },
  mounted(){
    this.changeFoot();
  }
};
</script>


<style lang="scss" scoped>
//顶部
.top {
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  border-bottom: 0.01rem solid rgba(196, 194, 194, 0.932);
  h1 {
    float: left;
    margin-left: 3rem;
  }
  .top1 {
    color: #000;
    cursor: pointer;
    float: left;
  }
  .top2 {
    color: #000;
    cursor: pointer;
    float: right;
  }
}

//邮箱 手机选择
.select {
  border: 0;
  margin-top: 0.6rem;
  .van-tab,
  .van-tabs {
    border: 0;
  }
  .check {
    height: 0.8rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    line-height: 0.8rem;
    input {
      float: left;
      border: 0;
      background-color: #fff;
    }
    p {
      float: right;
      color: rgb(214, 122, 18);
    }
  }
}

//登录 input
.login {
  margin-top: 0.3rem;
}

//登录按钮
.subButton {
  margin-top: 1rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  .warButton {
    display: block;
    width: 100%;
    background-color: rgb(226, 125, 85);
    color: #fff;
    border: 0;
    border-radius: 0.5rem;
    height: 0.7rem;
  }
  .newRejister {
    float: right;
    font-size: 12px;
    color: rgb(226, 125, 85);
    margin-top: 0.2rem;
  }
}

footer {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  font-size: 12px;
  color: rgb(141, 139, 139);
  h2 {
    margin-top: 0.3rem;
    color: rgb(226, 125, 85);
  }
}

//load
.load {
  width: 0.5rem;
  height: 0.5rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>