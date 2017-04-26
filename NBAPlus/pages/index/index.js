//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    task:"",
    userInfo: {},
    disabled:true,
    lists :[
      {text:"hello vue.js",checked:false},
      {text:"hello vue.js",checked:true},
      {text:"hello vue.js",checked:true}
    ],
    toDoList:[],
    toDoneList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.setData({
      toDoList:wx.getStorageSync('todo') || [],
      toDoneList:wx.getStorageSync('todone') || []
    })
    wx.setNavigationBarTitle({title:'任务清单'})
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onHide:function(){
    console.log('index.html onHide');
    wx.setStorageSync('todo',this.data.toDoList);
    wx.setStorageSync('todone',this.data.toDoneList);
  },
  clickBtn:function(){
    this.setData();
  },
  taskInput:function(e){
    var task = e.detail.value;
    this.setData({task:task});
  },
  sendTask:function(e){
    // var that = this;
    var reg = /\s/g;
    var task = this.data.task;
    var taskText = task.replace(reg,'');
    if(taskText){
      this.data.toDoList.push({text:taskText,checked:false});
      this.setData(
        {toDoList:this.data.toDoList}
      );
      this.setData({task:''})
    }
  },
  checkboxChange:function(e){
    var index = e.target.dataset.index;
    var value = e.detail.value[0];
    console.log(index,e.target.dataset.index,value);
    if(value){
      this.data.toDoList[index].checked = true;
      this.data.toDoneList.push(this.data.toDoList[index]);
      this.data.toDoList.splice(index,1)
      if(!this.data.toDoList) this.data.toDoList = [];
    }else {
      this.data.toDoneList[index].checked = false;
      this.data.toDoList.push(this.data.toDoneList[index]);
      this.data.toDoneList.splice(index,1)
      if(!this.data.toDoneList) this.data.toDoneList = [];
    }
    this.setData({toDoneList:this.data.toDoneList});
    this.setData({toDoList:this.data.toDoList});
    console.log(this.data)
    // console.log('checkbox发生Change事件，携带value值为：'+ e.detail.value)
  },
  removeList:function(e){
    var index = e.target.dataset.index,
        checked = e.target.dataset.checked;
    console.log(this);
    console.log(e.target)
    console.log(e.target.dataset.index)
    console.log(index, checked)
    // if(checked){
    //   this.data.toDoneList.splice(index,1);
    //   this.setData({
    //     toDoneList:this.data.toDoneList
    //   })
    // } else{
    //   this.data.toDoList.splice(index,1);
    //   this.setData({
    //     toDoList:this.data.toDoList
    //   })
    // }
  },
  onShareAppMessage: function () {
    return {
      title: '简易任务清单',
      path: 'pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
