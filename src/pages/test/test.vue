<template>
  <div>
    <!--<div id="input" class="test">-->
      <!--<el-form :model="form" :rules="rules" ref="form" label-width="0" >-->
        <!--<el-form-item prop="username">请输入用户名:-->
          <!--<el-input type="text" v-model="form.message" placeholder="请输入用户名" style="width:300px;margin-left:20px;" clearable>-->
            <!--<el-button type="primary" @click.native.prevent="handleSubmit" slot="append" style="color: #eef1f6;background-color: cornflowerblue">查询</el-button>-->
          <!--</el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <!--<div id="result" style="margin-top: 10px">-->
      <!--<textarea style="width:300px;margin-left:110px;height: 200px;">{{result}}</textarea>-->
    <!--</div>-->

    <div id="content" class="test">
      <el-form :model="form" :rules="rules" ref="form1" label-width="0" >
        <el-form-item prop="username">请输入内容ID:
          <el-input type="text" v-model="form.contentId" placeholder="请输入内容ID" style="width:300px;margin-left:20px;" clearable>
            <el-button type="primary" @click.native.prevent="handleContentSubmit" slot="append" style="color: #eef1f6;background-color: cornflowerblue">查询</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--<div id="contentTrace" style="margin-top: 10px">-->
      <!--<textarea style="width:300px;margin-left:110px;height: 200px;">{{contentResult}}</textarea>-->
    <!--</div>-->
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
      <img v-for="img0 in imgs" v-bind:src = "img0.src" style="height: 150px;width: 300px; border-collapse: inherit" />
      <!--<ul>-->
        <!--<li v-for="img0 in imgs">-->
          <!--<img v-bind:src = "img0.src" style="height: 150px;width: auto"/>-->
          <!--<img v-for="img0 in imgs" v-bind:src = "img0.src" style="height: 150px;width: auto"/>-->
        <!--</li>-->
        <!--&lt;!&ndash;<div v-for="img0 in imgs">&ndash;&gt;-->
          <!--&lt;!&ndash;<img v-bind:src = "img0.src" style="height: 150px;width: auto"/>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</ul>-->
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
    handleSubmit() {
      getUser({passport: this.form.message}).then(res => {
        this.result = res.data
      })
    },
    handleContentSubmit() {
      getContentTrace({contentId: this.form.contentId}).then(res => {
        this.contentResult = res.data,
        this.tableData[0].template = res.data.template,
        this.tableData[0].replyCount = res.data.replyCount,
        this.tableData[0].source = res.data.source,
        this.tableData[0].dkeys = res.data.dkeys,
        this.tableData[0].title = res.data.title,
        this.tableData[0].ptime = res.data.ptime,
        this.imgs = res.data.img
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


