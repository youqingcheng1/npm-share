<template>
  <div id="app">
    <div class="share_wrap">
      <div @click="shareShow=true">111111</div>
      <share
        :backgroundUrl="urlBack" 
        @close="closeVal" 
        v-if="shareShow"
        @shareSucess="shareSucess"
        @friendList="friendList"
        :shareData="shareData"
      ></share>
    </div>
  </div>
</template>

<script>
import share from './components/share';
export default {
  name: 'app',
  components:{
    share,
  },
  data () {
    return {
      urlBack:'http://activities-test.mini.me/fe/sales/share-img/share-box2.png',
      msg: 'Welcome to Your Vue.js App',
      shareShow:false,
      shareData:{
        url:`http://activities-test.mini.me/fe/sales/share-img/share-pc-img.jpg`,
        urlFriend:'',
        friendImg:`http://activities-test.mini.me/fe/sales/share-img/share-pc-img.jpg`,
        title:'迷你4周年，星灵闪耀',
        imgUrl:`http://activities-test.mini.me/fe/sales/share-img/share-m-img.jpg`,
        content:'迷你世界迎来了4周年欢乐庆典，我们的新伙伴星灵也随之登场，想不想了解关于星灵的小故事呢？快来迷你世界4周年星灵闪耀活动页面看看吧！',
        desc:'111'
      }
    }
  },
  computed: {
    // urlBack(){
    //   return ''
    // }
  },
  methods:{
    closeVal(val){
      this.shareShow = val;
    },
    shareSucess(val){
      // this.shareShow = val.close;
    },
    friendList(){
      this.friendListFn()
    },
    friendListFn(){
      setTimeout(()=>{
        console.log(1111)
      },1000)
    }
  }
}
</script>

<style>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #42b983;
}
</style>
