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
    <div id = "fullResultForm" v-if=" type === 'doc'">
      <p style="font-size: 16px">具体结果如下表：</p><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        style="width:100%"
        :columns=fullColumns
        :table-data=fullTableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <p style="font-size: 16px" v-if=" type === 'doc'">文章中图片如下：</p><br>
      <img v-for="img0 in imgs" v-bind:src = "img0.src" style="height: 150px;width: 300px; border-collapse: inherit" hspace="10px" vspace="10px"/>
    </div>
    <div id = "videoResultForm" v-if=" type === 'video'">
      <p style="font-size: 16px">具体结果如下表：</p><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        style="width:100%"
        :columns=videoColumns
        :table-data=videoTableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <div id = "video">
        <h3 style="font-size: 16px">视频如下：</h3><br>
        <video-player  class="video-player vjs-custom-skin"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
                       style="width: 600px"
        ></video-player>
      </div>
<!--      <p style="font-size: 16px">文章中图片如下：</p><br>-->
<!--      <img v-for="img0 in imgs" v-bind:src = "img0.src" style="height: 150px;width: 300px; border-collapse: inherit" hspace="10px" vspace="10px"/>-->
    </div>
    <div id = "specialResultForm" v-if=" type === 'special'">
      <p style="font-size: 16px">具体结果如下表：</p><br>
      <v-table
        is-horizontal-resize
        is-vertical-resize
        column-width-drag
        style="width:100%"
        :columns=specialColumns
        :table-data=specialTableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <!--      <p style="font-size: 16px">文章中图片如下：</p><br>-->
      <!--      <img v-for="img0 in imgs" v-bind:src = "img0.src" style="height: 150px;width: 300px; border-collapse: inherit" hspace="10px" vspace="10px"/>-->
    </div>
    <div id = "recommendResultForm" v-if=" type === 'recommend'">
      <p style="font-size: 16px">具体结果如下表：</p><br>
      <v-table
        is-horizontal-resize
        style="width:100%"
        :columns=recommendColumns
        :table-data=recommendTableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
<!--      <p style="font-size: 16px">图集中图片如下：</p><br>-->
<!--      <img v-for="img0 in photoSetImgs" v-bind:src = "img0.imgurl" v-bind:alt="img0.note"  style="height: 150px;width: 300px; border-collapse: inherit" hspace="10px" vspace="10px"/>-->
    </div>
    <div id = "photoSetResultForm" v-if=" type === 'photoSet'">
      <p style="font-size: 16px">具体结果如下表：</p><br>
      <v-table
        is-horizontal-resize
        column-width-drag
        style="width:100%"
        :columns=photoSetColumns
        :table-data=photoSetTableData
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <br>
      <h3 style="font-size: 16px">图集封面如下：</h3><br>
      <img v-bind:src="photoSetCover" style="border: 1px solid #409EFF; border-bottom: 10px;" >
      <br>
      <h3 style="font-size: 16px; height: 20px; ">图集中图片如下：</h3><br>
      <ul>
        <li v-for="img0 in photoSetImgs">
          <img v-bind:src = "img0.imgurl">
          <p style="width: 300px">{{img0.note}}</p>
        </li>
      </ul>

      <!--      <img v-for="img0 in photoSetImgs" v-bind:src = "img0.imgurl" v-bind:align="img0.note"  style="height: 150px;width: 300px; border-collapse: inherit" hspace="10px" vspace="10px"/>-->
    </div>
  </div>
</template>

<!--脚本-->
<script>
import { getUser, getContentTrace } from '../../api/api'
import { VTable } from '../../../node_modules/vue-easytable'
import { videoPlayer } from "../../../node_modules/vue-video-player"
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  components: {
      VTable,
      videoPlayer
  },
  data() {
    return {
        form: {
          message: "",
          contentId: ""
        },
        type:"",
        result:"",
        contentResult: "",
        fullTableData:[
            {"template":"", "replyCount":"", "source":"", "dkeys":"", "title":"", "ptime":""}
        ],
        videoTableData:[
            {"title":"", "voteCount":"", "hits":"", "playCount":"", "replyCount":"", "topicSid":"", "length":"", "m3u8Hd_url":""}
        ],
        specialTableData:[
            {"replyCount":"", "specialType":"","delStatus":"", "sname":"", "banner":"", "commentId":"", "topicIds":"", "moduleSize":"", "ptime":"", "sid":""}
        ],
        recommendTableData:[
            {"nick":"", "commentSwitchOn":"", "viewpoint":"", "passport":"", "praiseCount":"", "userId":"", "motifName":"", "ptime":"", "commentCount":"", "motifId":"",}
        ],
        photoSetTableData:[
            {"setName":"", "imgsum":"", "setTag":"", "source":"", "ptime":"", "desc":""}
        ],
        imgs:[],
        photoSetImgs:[],
        photoSetCover:"",
        fullColumns:[
          {field:"template", title:'模板', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field:"replyCount", title:'跟贴数', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field:"source", title:'来源', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field:"dkeys", title:'关键词', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
          {field:"title", title:'标题', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field:"ptime", title:'发布时间',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true}
        ],
        videoColumns:[
            {field:"title", title:'标题', width: 200, titleAlign: 'center',columnAlign:'center'},
            {field:"voteCount", title:'点赞数', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"hits", title:'点击数', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"playCount", title:'播放数', width: 50,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"replyCount", title:'跟贴数', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"topicSid", title:'topicSid',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"length", title:'视频长度',  width: 50,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"m3u8Hd_url", title:'视频链接',  width: 200,titleAlign: 'center',columnAlign:'center',isResize:true}
        ],
        specialColumns:[
            {field:"sid", title:'专题ID', width: 150, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"sname", title:'专题名称', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"specialType", title:'专题类型', width: 80, titleAlign: 'center',columnAlign:'center'},
            {field:"delStatus", title:'删除状态', width: 80, titleAlign: 'center',columnAlign:'center'},
            {field:"banner", title:'banner图', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"moduleSize", title:'模块数',  width: 80,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"topicIds", title:'模块ID', width: 220, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"commentId", title:'跟贴id', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"replyCount", title:'跟贴数', width: 80, titleAlign: 'center',columnAlign:'center'},
            {field:"ptime", title:'发布时间',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true}
        ],
        recommendColumns:[
            {field:"nick", title:'用户昵称', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"commentSwitchOn", title:'跟贴开关', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"viewpoint", title:'讲讲内容', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"passport", title:'用户passport', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"praiseCount", title:'点赞数', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"userId", title:'用户ID',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"motifName", title:'圈子名称', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field:"ptime", title:'发布时间', width: 150,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"commentCount", title:'跟贴数', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"motifId", title:'圈子ID',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true}
        ],
        photoSetColumns:[
            {field:"setName", title:'图集名称', width: 200, titleAlign: 'center',columnAlign:'center'},
            {field:"imgsum", title:'图片数', width: 50,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"setTag", title:'图集标签', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"source", title:'来源',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"ptime", title:'发布时间', width: 180, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field:"desc", title:'描述',  width: 100,titleAlign: 'center',columnAlign:'center',isResize:true}
        ],
        playerOptions : {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: true, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources:[{ // 流配置，数组形式，会根据兼容顺序自动切换
                type: 'video/mp4',
                type: 'application/x-mpegURL',
                src: ''
            }],
            hls:true,
            width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
            }
        }
    }
  },

  methods: {
    handleContentSubmit() {
      getContentTrace({contentId: this.form.contentId}).then(res => {
        if (res.data.code === 0){
          let response = res.data.data
              if (response.type === 'doc') {
                  this.type = response.type;
                  this.fullTableData[0].template = response.template;
                  this.fullTableData[0].replyCount = response.replyCount;
                  this.fullTableData[0].source = response.source;
                  this.fullTableData[0].dkeys = response.dkeys;
                  this.fullTableData[0].title = response.title;
                  this.fullTableData[0].ptime = response.ptime;
                  this.imgs = response.img;
              } else if (response.type === 'video') {
                  this.type = response.type;
                  this.videoTableData[0].title = response.title;
                  this.videoTableData[0].m3u8Hd_url = response.m3u8Hd_url;
                  this.videoTableData[0].voteCount = response.voteCount;
                  this.videoTableData[0].playCount = response.playCount;
                  this.videoTableData[0].replyCount = response.replyCount;
                  this.videoTableData[0].topicSid = response.topicSid;
                  this.videoTableData[0].length = response.length;
                  this.playerOptions.sources[0].src = response.m3u8Hd_url;
              } else if (response.type === 'special') {
                  this.type = response.type;
                  this.specialTableData[0].replyCount = response.replyCount;
                  this.specialTableData[0].specialType = response.specialType;
                  this.specialTableData[0].delStatus = response.delStatus;
                  this.specialTableData[0].sname = response.sname;
                  this.specialTableData[0].commentId = response.commentId;
                  this.specialTableData[0].topicIds = response.topicIds;
                  this.specialTableData[0].moduleSize = response.moduleSize;
                  this.specialTableData[0].banner = response.banner;
                  this.specialTableData[0].sid = response.sid;
                  this.specialTableData[0].ptime = response.ptime;
              } else if (response.type === 'recommend') {
                  this.type = response.type;
                  this.recommendTableData[0].nick = response.nick;
                  this.recommendTableData[0].commentSwitchOn = response.commentSwitchOn;
                  this.recommendTableData[0].viewpoint = response.viewpoint;
                  this.recommendTableData[0].passport = response.passport;
                  this.recommendTableData[0].praiseCount = response.praiseCount;
                  this.recommendTableData[0].userId = response.userId;
                  this.recommendTableData[0].motifName = response.motifName;
                  this.recommendTableData[0].ptime = response.ptime;
                  this.recommendTableData[0].commentCount = response.commentCount;
                  this.recommendTableData[0].motifId = response.motifId;
              } else if (response.type === 'photoSet') {
                  this.type = response.type;
                  this.photoSetTableData[0].setName = response.setName;
                  this.photoSetTableData[0].imgsum = response.imgsum;
                  this.photoSetTableData[0].setTag = response.setTag;
                  this.photoSetTableData[0].source = response.source;
                  this.photoSetTableData[0].ptime = response.ptime;
                  this.photoSetTableData[0].desc = response.desc;
                  this.photoSetImgs = response.imgs;
                  this.photoSetCover = response.cover;
              }
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

   #photoSetResultForm ul{
     display: flex;
     flex-wrap: wrap;
   }
    #photoSetResultForm li{
      padding: 3px;
      list-style: none;
      margin-right: 15px;
      border: 1px solid #eee;
    }
    #photoSetResultForm img{
      width: 300px;
      height: 150px;
    }
</style>


