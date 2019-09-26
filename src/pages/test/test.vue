<template>
  <div>
    <div id="input" class="test">
      <el-form :model="form" :rules="rules" ref="form2" label-width="0" >
        <el-form-item prop="username">请输入内容id:
          <el-input type="text" v-model="form.message" placeholder="请输入内容ID" style="width:300px;margin-left:20px;" clearable>
            <el-button type="primary" @click.native.prevent="handleSubmit" slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="result" style="margin-top: 10px">
      <textarea style="width:300px;margin-left:110px;height: 200px;">{{result}}</textarea>
    </div>

    <div id = "resultForm">
      <v-table is-horizontal-resize
               style="width:100%"
               :columns="columns"
               :table-data="tableData"
               row-hover-color="#eee"
               row-click-color="#edf7ff">
      </v-table>
    </div>
  </div>
</template>

<!--脚本-->
<script>
import { getUser } from '../../api/api'
import { VTable } from '../../../node_modules/vue-easytable'

export default {
  data() {
    return {
      form: {
        message: ""
      },
      result:"",
      tableData: [
        {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
        {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
        {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
        {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
        {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
      ],
      columns: [
        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true}
      ]
    }
  },

  methods: {
    handleSubmit() {
      var promise = getUser({passport: this.form.message}).then(  res => {this.result = res.data}  );
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


