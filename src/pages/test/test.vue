<template>
  <div>
    <div id="content" class="test">
      <el-form :model="form" :rules="rules" ref="form1" label-width="0" >
        <el-form-item prop="username">请输入内容ID:
          <el-input type="text" v-model="form.contentId" placeholder="请输入内容ID" style="width:300px;margin-left:20px;" clearable>
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
      <br>
      <p style="font-size: 16px">文章中图片如下：</p><br>
      <img v-for="img0 in imgs" v-bind:src = "img0.src" style="height: 150px;width: 300px; border-collapse: inherit" hspace="10px" vspace="10px"/>
    </div>
  </div>
</template>

<!--脚本-->
<script>
import { getUser, getContentTrace } from '../../api/api'
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
        {"template":"", "replyCount":"", "source":"", "dkeys":"", "title":"", "ptime":""}
        ],
      imgs:[],
      columns:[
        {field:"template", title:'模板', width: 100, titleAlign: 'center',columnAlign:'center' },
        {field:"replyCount", title:'跟贴数', width: 100, titleAlign: 'center',columnAlign:'center'},
        {field:"source", title:'来源', width: 100, titleAlign: 'center',columnAlign:'center'},
        {field:"dkeys", title:'关键词', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"title", title:'标题', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
        {field:"ptime", title:'发布时间',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true}
      ]
    }
  },

  methods: {
    handleContentSubmit() {
      getContentTrace({contentId: this.form.contentId}).then(res => {
        if (res.data.code === 0){
          let response = res.data.data
          this.tableData[0].template = response.template,
          this.tableData[0].replyCount = response.replyCount,
          this.tableData[0].source = response.source,
          this.tableData[0].dkeys = response.dkeys,
          this.tableData[0].title = response.title,
          this.tableData[0].ptime = response.ptime,
          this.imgs = response.img
        } else if (res.data.code !== 0) {
          alert(res.data.message)
        }
      })
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


