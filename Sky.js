(function(Game){
    function Sky(option){
        this.ctx=option.ctx;//画布
        this.img=option.img;//图片

        this.height=this.ctx.canvas.height; //高度和canvas高度相同
        this.width=this.height/this.img.height*this.img.width;//动态算出图片压缩 后的宽度
        this.index=option.index||0;
        this.x=this.index*this.width;//根据索引值算出x
        this.y=0;
        this.offsetx=this.x;
    }
    //渲染
    Sky.prototype.render=function(){
        this.offsetx-=2;
        if(this.offsetx<this.x-this.width){
            this.offsetx=this.x;
        }
        this.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.offsetx,this.y,this.width,this.height);
    }
    Game.Sky=Sky;
})(Game);
