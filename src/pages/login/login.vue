<template>
  <div class="login">
    <el-form :model="form2" :rules="rules2" ref="form2" label-width="0" class="login2">
      <h1 style="font-size: 25px; margin-bottom: 30px">后台管理系统</h1>
      <el-form-item prop="username">
        <el-input type="text" prefix-icon="fa fa-user" v-model="form2.passport" placeholder="账号:admin" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" prefix-icon="fa fa-unlock-alt" v-model="form2.password" placeholder="密码:123456" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Login } from '../../api/api'
  import mixin from '../../utils/mixin'
  export default {
    mixins: [mixin],
    data () {
      return {
        form2: {
          passport: '',
          password: ''
        },
        rules2: {
          passport: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form2.validate(async valid => {
          if(valid) {
            var res = await Login({ passport: this.form2.passport, password: this.form2.password })
            if(res.data.code !== 200 ) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.success(res.data.msg);
                sessionStorage.setItem('username',JSON.stringify(this.form2.passport));
                this.$router.push({ path: '/tracer'});
              }
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login2 {
    height: 320px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #e4e7ed;
    border-radius: 15px;
  }
</style>
