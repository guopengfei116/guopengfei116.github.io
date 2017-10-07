(function (w) {

    /*
    * @constructor 地平线
    * param { ctx : Context } 绘图上下文
    * param { img : Image } 图片资源
    * param { speed : number } 运动速度
    * */
    function Horizon(ctx, img, x, y, speed) {
        this.ctx = ctx;
        this.img = img;
        this.width = img.width;  // 地平线宽
        this.height = img.height;  // 地平线高
        this.x = x || 0;
        this.y = y || ctx.canvas.height - img.height; // 默认在画布最底端
        this.speed = speed || 3;
    }

    // 绘制到画布上
    Horizon.prototype.draw = function () {
        this.ctx.drawImage(this.img, this.x, this.y);
    };

    // 更新下一帧绘制图像时x轴坐标
    Horizon.prototype.update = function () {
        this.x -= this.speed;

        // 当走出画布时，向右拼接
        if (this.x <= -this.width) {
            this.x += this.width * 2;
        }
    };

    // 暴漏至全局
    w.Horizon = Horizon;

}(window));
