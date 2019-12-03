<template>
  <div>
    <div class="login">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="clear"
          placeholder="请输入11位手机号"
          @click-right-icon="$toast('question')"
        />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
//登录 input
.login {
  margin-top: 0.3rem;
}
</style>