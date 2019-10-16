<template>
  <div>
    <div id="content" class="tracer">
      <el-form :model="form" :rules="rules" ref="form1" label-width="0" >
        <el-form-item prop="username">请输入tracerID:
          <el-input type="text" v-model="form.traceId" placeholder="请输入tracerID" style="width:650px;margin-left:20px;" clearable>
            <el-button type="primary" @click.native.prevent="handleContentSubmit" slot="append" style="color: #eef1f6;background-color: cornflowerblue">查询</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <br>
    <p style="font-size: 16px">具体结果入下表：</p><br>
    <div id = "resultForm">
      <v-table
        is-horizontal-resize
        style="width:100%"
        :columns=columns
        :table-data=tableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
    </div>
  </div>
</template>

<!--脚本-->
<script>
import { parseTraceId } from '../../api/api'
import { VTable } from '../../../node_modules/vue-easytable'

export default {
  components: {VTable},
  data() {
    return {
      form: {
        message: "",
        contentId: ""
      },
      result:"",
      contentResult: "",
      tableData:[
        {"protocol":"", "domain":"", "method":"", "api":"", "passport":"", "responseCode":"", "version":"", "location":""}
        ],
      columns:[
        {field:"protocol", title:'协议', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true },
        {field:"domain", title:'域名', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"method", title:'请求方法', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"api", title:'接口', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"passport", title:'用户passport', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"responseCode", title:'http响应码',  width: 50,titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"version", title:'客户端版本',  width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"location", title:'地址位置',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true}
      ]
    }
  },

  methods: {
    handleContentSubmit() {
      parseTraceId({traceId: this.form.traceId}).then(res => {
        if (res.data.code === 0) {
          let response = res.data.data
          this.tableData[0].protocol = response.protocol,
          this.tableData[0].domain = response.domain,
          this.tableData[0].method = response.method,
          this.tableData[0].api = response.api,
          this.tableData[0].passport = response.passport,
          this.tableData[0].responseCode = response.responseCode,
          this.tableData[0].version = response.version,
          this.tableData[0].location = response.location
        } else if(res.data.code !== 0) {
          alert(res.data.message);
        }
      })
    }
  }
}
</script>
<style lang="scss">
    .tracer {
       width: 100%;
       height: 100%;
       text-align: left;
       margin-top: 20px;
       font-size: 30px;
    }

</style>


