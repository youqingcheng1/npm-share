<template>
<transition name="share">
    <div id="share" class="share" @click="handleEvent($event)" v-if="closeShare">
    <div :class="`${$typePage}--content`" :style="{backgroundImage: 'url(' + baseImg + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}">
      <div :class="`${$typePage}--close`"></div>
      <div :class="`${$typePage}--warp_icon`">
        <ul>
          <li v-for="(item, index) in shareIcon" :key="index">
            <a href="javascript:;" @click="handleShare(item.event)"></a>
          </li>
          <li class="friendIcon" v-if="friendIcon">
            <a href="javascript:;" @click="friendList"></a>
          </li>
          <transition name="wechat">
            <div class="pc--Wechat-box" v-if="`${$typePage}=='pc'`&& wechatStatus">
                <div id="qrcode"></div>
            </div>
          </transition>
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "share",
  components: { QRCode },
  
  data() {
    return {
      baseImg: this.backgroundUrl,
      createdQcrodeText:false,//是否已有二维码
      wechatStatus:false,
      qrcodeUrl:false,
      shareIcon: [
        {
          id: 1,
          event: "Wechat"
        },
        {
          id: 2,
          event: "QQ"
        },
        {
          id: 3,
          event: "QZone"
        },
        {
          id: 4,
          event: "Weibo"
        }
      ]
    };
  },
  props:{
      backgroundUrl:{
          type:String,
          default:''
      },
      shareData:{
        type:Object,
        default:{
          url:'',
          urlFriend:'',
          friendImg:'',
          title:'',
          imgUrl:'',
          content:'',
          desc:''
        }
      },
    closeShare:{
      type:Boolean,
      default:true
    },
    friendIcon:{
      type:Boolean,
      default:true
    }
  },
  computed:{
    $typePage() {
      return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
        ? "m"
        : "pc";
    },
    $isMiniWorldGame(){
      return /miniworldgame/ig.test(navigator.userAgent);
    }
  },

  methods: {
    /**
     * 分享公用函数
     * @param {String} type 分享平台类型
     * QQ QQkj Weibo Wx
     */
    handleShare(type) {
      //如果在内置
      if (this.$typePage == "m") {
        if (this.$isMiniWorldGame) {
          // console.log(type)
          mnw &&
            mnw[`shareTo${type}`]({
              imgUrl: this.shareData.imgUrl,
              url: this.shareData.url,
              title: this.shareData.title,
              content: this.shareData.content
            });

            this.shareSucess();
        } else {
          alert('请在游戏内分享')
        }
      } else {
        this[`shareTo${type}`]();

        this.shareSucess();
      }
    },

    //关闭弹窗
    handleEvent(e) {
      if (e.target.className === "share" || e.target.className === "pc--close" || e.target.className === "m--close") {
        this.$emit("close",false);
      } else {
        e.cancelBubble = true;
        return false;
      }
    },

    //分享完回调
    shareSucess(){
      this.$emit('shareSucess',{
        close:false
      })
    },

    friendList() {
      this.$emit('friendList')
    },

/**
 * qq,qq空间分享
 * @param url       链接地址 你需要分享的网站 如：www.baidu.com
 * @param desc      描述
 * @param title     标题
 * @param summary   内容
 * @param pics      图片
 */
    shareToQQ() {
      console.log("QQ");
      window.open(
        `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(
          this.shareData.url
        )}&pics=${encodeURIComponent(this.shareData.imgUrl)}&title=${
          this.shareData.title
        }&summary=${this.shareData.content}`,
        "newwindow",
        "height=750,width=1200,top=100,left=300"
      );
    },
    shareToQZone() {
      window.open(
        `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(
          this.shareData.url
        )}&pics=${encodeURIComponent(this.shareData.imgUrl)}&title=${
          this.shareData.title
        }&desc=${this.shareData.desc}&summary=${this.shareData.content}`,
        "newwindow",
        "height=750,width=1200,top=100,left=300"
      );
    },
    shareToWeibo() {
      window.open(
        `http://service.weibo.com/share/share.php?url=${encodeURIComponent(
          this.shareData.url
        )}&pic=${encodeURIComponent(this.shareData.imgUrl)}&title=${
          this.shareData.content
        }&content=utf-8&sourceUrl=${encodeURIComponent(this.shareData.imgUrl)}`,
        "newwindow",
        "height=750,width=1200,top=100,left=300"
      );
    },
    shareToWechat(){
      this.wechatStatus = true;
      this.$nextTick (function () {
        this.qrcode();
      })
    },
    qrcode () {
      if(!this.qrcodeUrl){
        this.qrcodeUrl = true;
        let qrcode = new QRCode('qrcode', {
            width: 125,
            height:125,        // 高度
            text:  this.shareData.imgUrl,   // 二维码内容
        })
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.share-enter-active,
.share-leave-active{
    transition: all ease-out 0.3s;
}
.share-enter,
.share-leave-to {
    opacity:0;
}
.wechat-enter-active,
.wechat-leave-active{
  transition: all ease-out 0.3s;
}
.wechat-enter,
.wechat-leave-to {
    opacity:0;
}
#share{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 20;
  .pc--content{
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    .pc--warp_icon {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      ul {
        width: 602px;
        height: 380px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 10px;
        padding: 60px 20px;
        box-sizing:border-box;
        .pc--Wechat-box{
          width: 125px;
          height: 125px;
          background: #fff;
          position: absolute;
          top: -27px;
          left: 5px;
          padding: 10px;
        }
        li {
          width: 100px;
          height: 99px;
          a {
            background: url("../assets/images/share-icon.png") no-repeat;
            width: 100px;
            height: 99px;
            background-position: -846px -10px;
            display: block;
            transform: scale(0.9);
            &:hover {
              background-position: -726px -10px;
            }
          }
          &:nth-child(2) {
            a {
              background-position: -606px -10px;
              &:hover {
                background-position: -486px -10px;
              }
            }
          }
          &:nth-child(3) {
            a {
              background-position: -1086px -10px;
              &:hover {
                background-position: -966px -10px;
              }
            }
          }
          &:nth-child(4) {
            a {
              background-position: -129px -10px;
              &:hover {
                background-position: -10px -10px;
              }
            }
          }
          &:nth-child(5) {
            a {
              background-position: -367px -10px;
              &:hover {
                background-position: -248px -10px;
              }
            }
          }
        }
      }
    }
  }
  .pc--close {
    //   background: url("../assets/images/close-x.png") no-repeat top center;
      height: 66px;
      width: 66px;
      position: absolute;
      top: 7px;
      right: 20px;
      cursor: pointer;
      // background: #000000;
  }
    .m--close {
      height: 66px;
      width: 66px;
      // background: #000;
      position: absolute;
      top: 18px;
      right: 20px;
  }
  .m--content{
    // background: #fff;
    // width: 728px;
    // height: 461px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .m--warp_icon {
      width: 680px;
      // height: 105px;
      margin: 0 auto;
      ul {
        // height: 324px;
        height: 420px;
        // width: ;
        width: 602px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        // background-color: #f8dbb8;
        border-radius: 10px;
        // padding: 60px 20px;
        box-sizing:border-box;
        width: 600px;
        margin: 0 auto;
        li {
          width: 85px;
          height: 85px;
          a {
            background: url("../assets/images/share-icon-m.png") no-repeat top
              center/525px 105px;
            width: 85px;
            height: 85px;
            display: block;
            background-position: -325px -10px;
          }
          &:nth-child(2) {
            a {
              background-position: -10px -10px;
            }
          }
          &:nth-child(3) {
            a {
              background-position: -115px -10px;
            }
          }
          &:nth-child(4) {
            a {
              background-position: -220px -10px;
            }
          }
          &:nth-child(5) {
            a {
              background-position: -430px -10px;
            }
          }
        }
      }
    }
  }

.pc--list_wrap{
    margin: 45px auto 0;
    width: 625px;
    .pc--title{
        display: flex;
        justify-content: center;
        .pc--text{
            align-self: center;
            font-size: 50px;
            font-weight: 600;
            color: #713301;
        }
    }
    .pc--close{
      background: #000 no-repeat top center/66px
        66px;
      height: 66px;
      width: 66px;
      cursor: pointer;
      position: absolute;
      top:22px;
      right: 20px;
    }
      .pc--text_noFriend {
        font-size: 26px;
        color: #015643;
        height: 192px;
        font-weight: 600;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pc--ul_wrap_list{
        background-color: #f8dbb8;
        padding: 20px;
        ul {
          width: 580px;
          height: 280px;
          overflow-y: scroll;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          li {
            width: 520px;
            border: solid 2px #713301;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 5px;
          .pc--img_wrap_friend{
            background-color: #f4cea3;
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 4px solid #c17538;
            border-radius: 50%;
            .pc--img {
                height: 65px;
                display: block;
                border-radius: 50%;
            }
          }
            .pc--text {
              width: 238px;
              height: 70px;
              line-height: 30px;
              letter-spacing: 0px;
              font-size: 20px;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #713301;
              text-align: center;
            }
            .pc--share-friend-btn {
              background: #015643 no-repeat top center/172px 57px;
              width: 172px;
              height: 57px;
              font-size: 27px;
              color: #f5d6b0;
              font-weight: 600;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }

  }
}

  .m--list_wrap{
    margin: 45px auto 0;
    width: 625px;
    .m--title{
        display: flex;
        justify-content: center;
    }
    .m--close{
      background: #c17538;
      height: 66px;
      width: 66px;
      cursor: pointer;
      position: absolute;
      top:22px;
      right: 20px;
    }
      .m--text_noFriend {
        font-size: 26px;
        color: #015643;
        height: 192px;
        font-weight: 600;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .m--ul_wrap_list{
        background-color: #f8dbb8;
        padding: 20px;
        ul {
          width: 580px;
          height: 280px;
          overflow-y: scroll;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          li {
            width: 520px;
            border: solid 2px #713301;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 5px;
          .m--img_wrap_friend{
            background-color: #f4cea3;
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 4px solid #c17538;
            border-radius: 50%;
            .m--img {
                height: 65px;
                display: block;
                border-radius: 50%;
            }
          }
            .m--text {
              width: 238px;
              height: 70px;
              line-height: 30px;
              letter-spacing: 0px;
              font-size: 20px;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #713301;
              text-align: center;
            }
            .m--share-friend-btn {
              background: #000 no-repeat top center/172px 57px;
              width: 172px;
              height: 57px;
              font-size: 27px;
              color: #f5d6b0;
              font-weight: 600;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
  }
</style>
