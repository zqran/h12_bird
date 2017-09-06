(function(Game){
    
    function Land(option){
        this.ctx=option.ctx;//画布
        this.img=option.img;//图片
        this.width=this.img.width;
        this.height=this.img.height;
        this.index=option.index||0;// 第几个陆地
        this.x=this.index*this.width;
        this.y=this.ctx.canvas.height-this.height;
        this.offsetX=this.x; //设置陆地偏移
    }

    Land.prototype.render=function(){
        this.offsetX-=5;
        if(this.offsetX<this.x-this.width){ //如果向左偏移了自身的宽度，立即跳回来
            this.offsetX=this.x;
        }

        //绘制陆地
        this.ctx.drawImage(this.img,0,0,this.width,this.height,this.offsetX,this.y,this.width,this.height);
    }
1
    Game.Land=Land;
})(Game);