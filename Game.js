(function (window) {
  function Game(option) {
    //所有的游戏对象 1鸟 6个柱子 4个地板  3背景
    this.roles = [];//存放所有的游戏对象
    this.imgArr = ['birds', 'land', 'sky', 'pipe1', 'pipe2']; //所有的图片的名字
    this.timer = null; //定时器
    this.ctx = option.ctx;//画布
    this.hero = null;//英雄
    //获取时间差
    this.startTime = new Date();
    this.endTime = 0;
    this.Dvalue = 0;
    //开始游戏s
    this.start();

  }

  Game.prototype = {
    constructor: Game,
    //游戏开始
    start: function () {//开始游戏
      var that = this;

      //当图片加载完成后再做后面的所有事情
      this.loadImg(function (imgList) {
        //创建游戏对象
        that.initGame(imgList);
        //用户控制
        that.userControl();
        //定时器不停的渲染
        that.timer = setInterval(function () {
          that.endTime = new Date();
          that.Dvalue = that.endTime - that.startTime;
          that.startTime = that.endTime;
          that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);//清空画布
          that.ctx.beginPath();//开始新路径
          that.render(that.Dvalue); //不停渲染
          // 不停的碰撞检查
          that.impact();
        }, 30)
      });
    },
    //加载图片
    loadImg: function (callback) {//加载图片资源
      var imgList = {};//存放所有的图片资源
      var count = 0;
      for (var i = 0; i < this.imgArr.length; i++) {
        var that = this;
        var obj = this.imgArr[i];
        var img = new Image();
        img.src = 'imgs/' + obj + '.png';
        imgList[obj] = img;//把图片对象放到imgList对象中
        img.onload = function () {
          count++;
          if (count >= that.imgArr.length) {
            //做后面的事情
            callback && callback(imgList);
            // if(callback){
            //     callback(imgList);
            // }

            console.log(imgList);
          }
        }

      }
    },
    //初始游戏对象
    initGame: function (imgList) {
      //天空
      for (var i = 0; i < 3; i++) {
        var sky = new Game.Sky({
          ctx: this.ctx,
          img: imgList['sky'],
          index: i
        });
        this.roles.push(sky);//添加到role中
      }

      //柱子
      for (var i = 0; i < 5; i++) {
        var pipe = new Game.Pipe({
          ctx: this.ctx,
          upImg: imgList['pipe2'],
          downImg: imgList['pipe1'],
          index: i
        });
        this.roles.push(pipe);//添加到role中
      }

      //陆地
      for (var i = 0; i < 4; i++) {
        var land = new Game.Land({
          ctx: this.ctx,
          img: imgList['land'],
          index: i
        });
        this.roles.push(land);//添加到role中
      }
      //鸟
      var bird = new Game.Bird({
        ctx: this.ctx,
        img: imgList['birds']
      })
      this.roles.push(bird);
      this.hero = bird;//英雄

      console.log(this.roles);
    },
    //渲染游戏对象
    render: function (Dvalue) {
      for (var i = 0; i < this.roles.length; i++) {
        var obj = this.roles[i];
        obj.render(Dvalue);//调用对象自身的渲染方法

      }
    },
    //碰撞检测  小鸟坐标 和路径是否重合
    impact: function () {
      if (this.ctx.isPointInPath(this.hero.x, this.hero.y) || this.hero.y < 0 || this.hero.y > this.ctx.canvas.height - 112) {
        clearInterval(this.timer);
      }
    },
    //用户控制
    userControl: function () {
      var that = this;
      window.onclick = function () {
        that.hero.speed = -0.3;
      }
    },
    //游戏结束
    over: function () {

    }
  }

  window.Game = Game;
})(window);
