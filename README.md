# npm-share

> 基于vue开发的分享组件

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```
## 传入数据
:shareData{
    url:'',
    urlFriend:'',
    friendImg:'',
    title:'',
    imgUrl:'',
    content:''
    desc:''
}  分享数据
:backgroundUrl  传入背景图
:friendIcon 是否显示好友图标

## 传入事件
@close   点击外面关闭弹窗事件
@shareSucess 分享成功事件
@friendList  点击好友列表事件


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
