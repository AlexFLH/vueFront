<template>
  <div id= "vue_det">
    <h1>site : {{site}}</h1>
    <h1>url : {{url}}</h1>
    <h1>{{details()}}</h1>
  </div>
</template>

<script>
    export default {
      name: "Vue_det",
      data() {
        return {
          site: "菜鸟教程",
          url: "www.ronoob.com",
          details:function () {
             return this.site + "- 追求技术，开启梦想！";
           }
        }
      }
    }
</script>
<style scoped>

</style>
