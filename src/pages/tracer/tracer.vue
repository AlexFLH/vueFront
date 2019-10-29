<template>
  <div>
    <div id="content" class="tracer">
      <el-form :model="form" :rules="rules" ref="form1" label-width="0" >
        <el-form-item prop="username" style="font-size: 30px">请输入tracerID:
          <el-input type="text" v-model="form.traceId" placeholder="请输入tracerID" style="width:650px;margin-left:20px;" clearable>
            <el-button type="primary" @click.native.prevent="handleContentSubmit" slot="append" style="color: #eef1f6;background-color: cornflowerblue">查询</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <br>

    <div id = 'requestInfo' v-if = 'code === 0'>
      <h3 style="font-size: 20px">具体请求相关信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=columns
        :table-data=tableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
    </div>

    <div id = "resultForm" v-if="type === 'doc'">
      <br>
      <h3 style="font-size: 20px">基本审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=fullColumns
        :table-data=fullData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">质量审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=manualColumns
        :table-data=manualData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">硬规则过滤信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=ruleColumns
        :table-data=ruleData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">质量审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=qualityColumns
        :table-data=qualityData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">复审信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=rehearColumns
        :table-data=rehearData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
    </div>

    <div id = "resultForm2" v-if="type === 'video'">
      <br>
      <h3 style="font-size: 20px">基本审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=videoColumns
        :table-data=videoData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">质量审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=manualColumns
        :table-data=manualData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">硬规则过滤信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=ruleColumns
        :table-data=ruleData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">质量审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=qualityColumns
        :table-data=qualityData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">复审信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=rehearColumns
        :table-data=rehearData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">三俗信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=vulgarColumns
        :table-data=vulgarData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
    </div>

    <div id = "resultForm3" v-if="type === 'recommend'">
      <br>
      <h3 style="font-size: 20px">基本审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=recommendColumns
        :table-data=recommendData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">质量审核信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=manualColumns
        :table-data=manualData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 20px">硬规则过滤信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        style="width:100%"
        :columns=ruleColumns
        :table-data=ruleData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
    </div>

    <div id = "resultForm4" v-if="type === 'special'">
      <br>
      <h3 style="font-size: 20px">专题基本信息如下：</h3><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        title-bg-color="#CDCDC1"
        :columns=specialColumns
        style="width: auto"
        :table-data=specialData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
    </div>
  </div>
</template>

<!--脚本-->
<script>
import { parseTraceId } from '../../api/api';
import { getTraceContent} from "../../api/api";
import { VTable } from '../../../node_modules/vue-easytable';

export default {
  components: {VTable},
  data() {
    return {
      form: {
        message: "",
        contentId: ""
      },
        type:"",
        code:"",
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
      ],
      fullData:[
          {"docId":"",
          "docType":"",
          "accountType":"",
          "title":"",
          "delStatus":"",
          "dyFlag":"",
          "manualStatus":"",
          "status":"",
          "modifyTime":""}
          ],
      fullColumns:[
            {field:"docId", title:'文章ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"docType", title:'文章类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"accountType", title:'账号类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"title", title:'文章标题', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"delStatus", title:'删除状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"dyFlag", title:'网易号等级', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"manualStatus", title:'审核状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"status", title:'状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"modifyTime", title:'修改时间', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true }
            ],
        videoData:[
            {"docId":"",
                "docType":"",
                "title":"",
                "delStatus":"",
                "fromType":"",
                "content":"",
                "lastTime":"",
                "machineReview":"",
                "videoStatus":"",
                "copyrighted":"",
                "hits":"",
                "isShow":"",
            }
        ],
        videoColumns:[
            {field:"docId", title:'视频ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"docType", title:'视频类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"title", title:'标题', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"delStatus", title:'删除状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"fromType", title:'类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"content", title:'内容', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"lastTime", title:'时长', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"machineReview", title:'机审', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"videoStatus", title:'视频状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"copyrighted", title:'版权', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"hits", title:'点击数', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"isShow", title:'是否展示', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true }
        ],
        recommendData:[
            {"docId":"",
                "docType":"",
                "recommendType":"",
                "jjDocid":"",
                "title":"",
                "auditType":"",
                "publisher":"",
                "publishTime":"",
                "delStatus":""
            }
        ],
        recommendColumns:[
            {field:"docId", title:'讲讲ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"docType", title:'内容类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"recommendType", title:'讲讲类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"jjDocid", title:'站内文章ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"title", title:'标题', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"auditType", title:'审核状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"publisher", title:'发布类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"publishTime", title:'发布时间', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"delStatus", title:'状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true }
        ],
        specialData:[
            {"sid":"",
                "replyCount":"",
                "specialType":"",
                "sname":"",
                "delStatus":"",
                "banner":"",
                "commentId":"",
                "topicIds":"",
                "ptime":""
            }
        ],
        specialColumns:[
            {field:"sid", title:'专题ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"replyCount", title:'跟贴数', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"specialType", title:'专题类型', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"sname", title:'专题名称', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"delStatus", title:'删除状态', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"banner", title:'banner', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"commentId", title:'跟贴ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"topicIds", title:'模块ID', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"ptime", title:'发布时间', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true }
        ],
        manualData:[
            {"manualReviewReason":"",
            "manualReviewEndTime":"",
            "manualReviewOperator":"",
            "manualReviewStatus":"",
            "manualReviewStartTime":""}
            ],
        manualColumns:[
            {field:"manualReviewStatus", title:'审核状态', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"manualReviewReason", title:'否决原因', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"manualReviewOperator", title:'操作人', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"manualReviewStartTime", title:'开始时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"manualReviewEndTime", title:'结束时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
        ],
        ruleData:[
            {"ruleFilterReason":"",
            "ruleFilterEndTime":"",
            "ruleFilterStatus":"",
            "ruleFilterType":"",
            "ruleFilterStartTime":""}
            ],
        //硬规则过滤
        ruleColumns:[
            {field:"ruleFilterStatus", title:'状态', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"ruleFilterType", title:'类型', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"ruleFilterReason", title:'未通过原因', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"ruleFilterStartTime", title:'开始时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"ruleFilterEndTime", title:'结束时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
        ],
        rehearData:[
            {"rehearStatus":"",
            "rehearStartTime":"",
            "rehearEndTime":"",
            "rehearOperator":"",
            "rehearReason":""}
            ],
        rehearColumns:[
            {field:"rehearStatus", title:'复审状态', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"rehearReason", title:'未通过原因', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"rehearOperator", title:'操作人', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"rehearStartTime", title:'开始时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"rehearEndTime", title:'结束时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
        ],
        qualityData:[
            {"qualityReviewOperator":"",
            "qualityReviewReason":"",
            "qualityReviewEndTime":"",
            "qualityReviewStatus":"",
            "qualityReviewStartTime":""}
            ],
        qualityColumns:[
            {field:"qualityReviewStatus", title:'审核状态', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"qualityReviewReason", title:'未通过原因', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"qualityReviewOperator", title:'操作人', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"qualityReviewStartTime", title:'开始时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"qualityReviewEndTime", title:'结束时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
        ],
        vulgarData:[
            {"vulgarStatus":"",
                "vulgarStartTime":"",
                "vulgarEndTime":""
               }
        ],
        vulgarColumns:[
            {field:"vulgarStatus", title:'审核状态', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"vulgarStartTime", title:'开始时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
            {field:"vulgarEndTime", title:'结束时间', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true }]
    }
  },

  methods: {
    handleContentSubmit() {
      parseTraceId({traceId: this.form.traceId}).then(res => {
        if (res.data.code === 0) {
          let response = res.data.data;
          this.code = res.data.code;
          this.tableData[0].protocol = response.protocol;
          this.tableData[0].domain = response.domain;
          this.tableData[0].method = response.method;
          this.tableData[0].api = response.api;
          this.tableData[0].passport = response.passport;
          this.tableData[0].responseCode = response.responseCode;
          this.tableData[0].version = response.version;
          this.tableData[0].location = response.location;
        } else if(res.data.code !== 0) {
          alert(res.data.message);
        }
      });
      getTraceContent({traceId: this.form.traceId}).then(res => {
          if (res.data.code === 0 ) {
              let baseInfo = res.data.data.securityData.baseInfo;
              if (baseInfo.type === 'doc') {
                  this.fullData[0].docId = baseInfo.docid;
                  this.fullData[0].docType = baseInfo.docType;
                  this.fullData[0].accountType = baseInfo.accountType;
                  this.fullData[0].title = baseInfo.title;
                  this.fullData[0].delStatus = baseInfo.delStatus;
                  this.fullData[0].dyFlag = baseInfo.dyFlag;
                  this.fullData[0].manualStatus = baseInfo.manualStatus;
                  this.fullData[0].status = baseInfo.status;
                  this.fullData[0].modifyTime = baseInfo.modifyTime;

                  let rehearInfo = res.data.data.securityData.rehear;
                  this.rehearData[0].rehearStatus = rehearInfo.rehearStatus;
                  this.rehearData[0].rehearReason = rehearInfo.rehearReason;
                  this.rehearData[0].rehearOperator = rehearInfo.rehearOperator;
                  this.rehearData[0].rehearStartTime = rehearInfo.rehearStartTime;
                  this.rehearData[0].rehearEndTime = rehearInfo.rehearEndTime;

                  let qualityInfo = res.data.data.securityData.quality;
                  this.qualityData[0].qualityReviewStatus = qualityInfo.qualityReviewStatus;
                  this.qualityData[0].qualityReviewReason = qualityInfo.qualityReviewReason;
                  this.qualityData[0].qualityReviewOperator = qualityInfo.qualityReviewOperator;
                  this.qualityData[0].qualityReviewStartTime = qualityInfo.qualityReviewStartTime;
                  this.qualityData[0].qualityReviewEndTime = qualityInfo.qualityReviewEndTime;

                  let manualInfo = res.data.data.securityData.security;
                  this.manualData[0].manualReviewStatus = manualInfo.manualReviewStatus;
                  this.manualData[0].manualReviewReason = manualInfo.manualReviewReason;
                  this.manualData[0].manualReviewOperator = manualInfo.manualReviewOperator;
                  this.manualData[0].manualReviewStartTime = manualInfo.manualReviewStartTime;
                  this.manualData[0].manualReviewEndTime = manualInfo.manualReviewEndTime;

                  let ruleInfo = res.data.data.securityData.rule;
                  this.ruleData[0].ruleFilterStatus = ruleInfo.ruleFilterStatus;
                  this.ruleData[0].ruleFilterType = ruleInfo.ruleFilterType;
                  this.ruleData[0].ruleFilterReason = ruleInfo.ruleFilterReason;
                  this.ruleData[0].ruleFilterStartTime = ruleInfo.ruleFilterStartTime;
                  this.ruleData[0].ruleFilterEndTime = ruleInfo.ruleFilterEndTime;
              } else if (baseInfo.type === 'video') {
                  this.videoData[0].docId = baseInfo.docid;
                  this.videoData[0].docType = baseInfo.docType;
                  this.videoData[0].title = baseInfo.title;
                  this.videoData[0].delStatus = baseInfo.delStatus;
                  this.videoData[0].fromType = baseInfo.fromType;
                  this.videoData[0].content = baseInfo.content;
                  this.videoData[0].lastTime = baseInfo.lastTime;
                  this.videoData[0].machineReview = baseInfo.machineReview;
                  this.videoData[0].videoStatus = baseInfo.videoStatus;
                  this.videoData[0].hits = baseInfo.hits;
                  this.videoData[0].isShow = baseInfo.isShow;
                  this.videoData[0].copyrighted = baseInfo.copyrighted;

                  let vulgarInfo = res.data.data.securityData.vulgar;
                  this.vulgarData[0].vulgarStatus = vulgarInfo.vulgarStatus;
                  this.vulgarData[0].vulgarStartTime = vulgarInfo.vulgarStartTime;
                  this.vulgarData[0].vulgarEndTime = vulgarInfo.vulgarEndTime;

                  let rehearInfo = res.data.data.securityData.rehear;
                  this.rehearData[0].rehearStatus = rehearInfo.rehearStatus;
                  this.rehearData[0].rehearReason = rehearInfo.rehearReason;
                  this.rehearData[0].rehearOperator = rehearInfo.rehearOperator;
                  this.rehearData[0].rehearStartTime = rehearInfo.rehearStartTime;
                  this.rehearData[0].rehearEndTime = rehearInfo.rehearEndTime;

                  let qualityInfo = res.data.data.securityData.quality;
                  this.qualityData[0].qualityReviewStatus = qualityInfo.qualityReviewStatus;
                  this.qualityData[0].qualityReviewReason = qualityInfo.qualityReviewReason;
                  this.qualityData[0].qualityReviewOperator = qualityInfo.qualityReviewOperator;
                  this.qualityData[0].qualityReviewStartTime = qualityInfo.qualityReviewStartTime;
                  this.qualityData[0].qualityReviewEndTime = qualityInfo.qualityReviewEndTime;

                  let manualInfo = res.data.data.securityData.security;
                  this.manualData[0].manualReviewStatus = manualInfo.manualReviewStatus;
                  this.manualData[0].manualReviewReason = manualInfo.manualReviewReason;
                  this.manualData[0].manualReviewOperator = manualInfo.manualReviewOperator;
                  this.manualData[0].manualReviewStartTime = manualInfo.manualReviewStartTime;
                  this.manualData[0].manualReviewEndTime = manualInfo.manualReviewEndTime;

                  let ruleInfo = res.data.data.securityData.rule;
                  this.ruleData[0].ruleFilterStatus = ruleInfo.ruleFilterStatus;
                  this.ruleData[0].ruleFilterType = ruleInfo.ruleFilterType;
                  this.ruleData[0].ruleFilterReason = ruleInfo.ruleFilterReason;
                  this.ruleData[0].ruleFilterStartTime = ruleInfo.ruleFilterStartTime;
                  this.ruleData[0].ruleFilterEndTime = ruleInfo.ruleFilterEndTime;
              } else if (baseInfo.type === 'recommend') {
                  this.recommendData[0].docId = baseInfo.docid;
                  this.recommendData[0].docType = baseInfo.docType;
                  this.recommendData[0].recommendType = baseInfo.recommendType;
                  this.recommendData[0].jjDocid = baseInfo.jjDocid;
                  this.recommendData[0].title = baseInfo.title;
                  this.recommendData[0].auditType = baseInfo.auditType;
                  this.recommendData[0].publisher = baseInfo.publisher;
                  this.recommendData[0].publishTime = baseInfo.publishTime;
                  this.recommendData[0].delStatus = baseInfo.delStatus;

                  let manualInfo = res.data.data.securityData.security;
                  this.manualData[0].manualReviewStatus = manualInfo.manualReviewStatus;
                  this.manualData[0].manualReviewReason = manualInfo.manualReviewReason;
                  this.manualData[0].manualReviewOperator = manualInfo.manualReviewOperator;
                  this.manualData[0].manualReviewStartTime = manualInfo.manualReviewStartTime;
                  this.manualData[0].manualReviewEndTime = manualInfo.manualReviewEndTime;

                  let ruleInfo = res.data.data.securityData.rule;
                  this.ruleData[0].ruleFilterStatus = ruleInfo.ruleFilterStatus;
                  this.ruleData[0].ruleFilterType = ruleInfo.ruleFilterType;
                  this.ruleData[0].ruleFilterReason = ruleInfo.ruleFilterReason;
                  this.ruleData[0].ruleFilterStartTime = ruleInfo.ruleFilterStartTime;
                  this.ruleData[0].ruleFilterEndTime = ruleInfo.ruleFilterEndTime;
              } else if (baseInfo.type === 'special') {
                  this.specialData[0].sid = baseInfo.sid;
                  this.specialData[0].replyCount = baseInfo.replyCount;
                  this.specialData[0].specialType = baseInfo.specialType;
                  this.specialData[0].sname = baseInfo.sname;
                  this.specialData[0].delStatus = baseInfo.delStatus;
                  this.specialData[0].banner = baseInfo.banner;
                  this.specialData[0].commentId = baseInfo.commentId;
                  this.specialData[0].topicIds = baseInfo.topicIds;
                  this.specialData[0].ptime = baseInfo.ptime;
              }
              this.type = baseInfo.type;
          } else if(res.data.code !== 0) {
              alert(res.data.message);
          }
      });
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


