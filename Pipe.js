(function(Game){
    function Pipe(option){
        this.ctx=option.ctx;//画布
        this.upImg=option.upImg; //图片
        this.downImg=option.downImg;
        this.width=this.upImg.width;
        this.height=0; //随机生成
        this.index=option.index||0; //第一个管道
        this.spaceX=200;//x空白距离
        this.spaceY=150;//y空白距离
        this.x=(this.index+1)*this.spaceX;
        this.y=0;

        
        this.setPos();//随机生成y的坐标值
    }
    
    Pipe.prototype.render=function(){
        this.x-=6;
        if(this.x<-this.spaceX){
            this.x=4*this.spaceX;//让第一个到第五个的位置
            this.setPos();
        }
        //画上面的管子
        var  sy=this.upImg.height-this.y;
        this.ctx.drawImage(this.upImg,0,sy,this.width,this.y,this.x,0,this.width,this.y);

        //画下面的管子
        var dy=this.ctx.canvas.height-this.y-this.spaceY;
        this.ctx.drawImage(this.downImg,0,0,this.width,dy,this.x,this.y+this.spaceY,this.width,dy)

        //绘制路径用于做碰撞检测
        this.ctx.rect(this.x,0,this.width,this.y);
        this.ctx.rect(this.x,this.y+this.spaceY,this.width,dy);
        //
        // this.ctx.strokeStyle='red';
        // this.ctx.stroke();

    }
    //随机坐标值
    Pipe.prototype.setPos=function () {
        this.y=100+parseInt(Math.random()*100); //100-200之间的数字
    }

    Game.Pipe=Pipe;

})(Game);