<template>
  <el-row style="position: absolute">
    <el-col :span="24" class="test" style="position: relative">
      <div type = "text" >请输入查询内容id:
        <input v-model="message" placeholder="请输入查询内容id" v-on:click=""></input>
      </div>
    </el-col>
  </el-row>
</template>
<script>

import mixin from '../../utils/mixin'
export default {
  mixins: [mixin],
    data () {
        return {

        }
    },
    methods: {
      findResult() {

      }
    }
}
</script>
<style lang="scss">
    .test {
       width: 100%;
       height: 100%;
       text-align: center;
       margin-top: 100px;
       font-size: 30px;
    }

</style>


