(function (w) {

    /*
     * @constructor 云
     * param { ctx : Context } 绘图上下文
     * param { img : Image } 图片资源
     * param { speed : number } 运动速度
     * */
    function Cloud(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.width = img.width;
        this.height = img.height;
        this.speed = speed || 1;

        this._init();
        this.x = Math.floor(Math.random() * this.ctx.canvas.width) + 100;
    }

    // 给原型扩充方法
    util.extend(Cloud.prototype, {

        // 初始化一些随机的值
        _init: function () {
            // 随机生成一个障碍物
            this.index = Math.floor(Math.random() * (this.maxFrame + 1));
            // 随机生成障碍物的x轴坐标(最小是画布的宽，最大不过2个画布的宽)
            this.x = Math.floor(Math.random() * this.ctx.canvas.width) + this.ctx.canvas.width;
            this.y = Math.floor(Math.random() * 80);
        },

        // 绘制
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },

        // 刷新下一帧
        update: function () {

            this.x -= this.speed;

            // 走出画布左侧则重新生产坐标，并变化障碍物样子
            if (this.x < -this.width) {
                this._init();
            }
        }
    });

    w.Cloud = Cloud;

}(window));
