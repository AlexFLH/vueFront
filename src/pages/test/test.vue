<template>
  <div>
    <div id="input" class="test">
      <el-form :model="form" :rules="rules" ref="form2" label-width="0" class="login2">
        <el-form-item prop="username">请输入内容id:
          <el-input type="text" v-model="form.message" placeholder="请输入内容ID" style="width:300px;margin-left:20px;" clearable>
            <el-button type="primary" @click.native.prevent="handleSubmit" slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="result" style="margin-top: 10px">
      <textarea style="width:300px;margin-left:110px;height: 100px;ma"></textarea>
    </div>
  </div>
</template>

<!--脚本-->
<script>
import mixin from '../../utils/mixin'
import { getUser } from '../../api/api'
export default {
  data() {
    return {
      form: {
        message: ""
      }
    }
  },

  methods: {
    handleSubmit() {
      var promise = getUser({passport: this.form.message}).then(res => res.data);
      console.info(promise)
    }
  }
}
</script>
<style lang="scss">
    .test {
       width: 100%;
       height: 100%;
       text-align: left;
       margin-top: 20px;
       font-size: 30px;
    }

</style>


