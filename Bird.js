(function(Game){
    function Bird(option){
        //属性
        this.ctx=option.ctx;//画布
        this.img=option.img;//图片
        this.width=this.img.width/3; //宽
        this.height=this.img.height; //高
        this.x=option.x||70;
        this.y=option.y||150;
        this.index=0;//第几帧

        //加速运动参数
        this.a=0.0005;
        this.speed=0;
        this.angle=0;
        this.maxSpeed=0.5;//小鸟的最大角度
        this.maxAngle=45; //小鸟旋转的最大角度
    }

    //方法
    Bird.prototype.render=function(Dvalue){

        /*
        * vt=v0+at
        * s=v0t+1/2*a*t*t
        * */
        //加速运动
        this.speed=this.speed+this.a*Dvalue;//当前是速度
        if(this.speed>this.maxSpeed){ //限速
            this.speed=this.maxSpeed;
        }
        this.y=this.y+this.speed*Dvalue+1/2*this.a*Dvalue*Dvalue;//算出小鸟的新的y坐标
        //鸟头旋转  当前角度/最大角度=当前速度/最大速度
        this.angle=this.speed/this.maxSpeed*this.maxAngle;//当前角度
        this.ctx.save();//保存画布
        this.ctx.translate(this.x,this.y); //将坐标系移动调小鸟的中心点
        this.ctx.rotate(this.angle*Math.PI/180);
        this.ctx.drawImage(this.img,this.index*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);
        this.ctx.restore();//恢复画布
        this.index++;
        this.index%=3;
    }

    Game.Bird=Bird;
})(Game);


