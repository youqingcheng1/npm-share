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
      urlBack:'https://cdn-activities.mini1.cn/nba/share/images/share_img.png',
      msg: 'Welcome to Your Vue.js App',
      shareShow:false,
      shareData:{
        url:'',
        urlFriend:'',
        friendImg:'',
        title:'',
        imgUrl:'https://cdn-activities.mini1.cn/nba/share/images/share_img.png',
        content:''
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
