(function (w) {

    var SPEED = 10, isJump = false;
    var jump = function (e) {
        if (e.keyCode == 38 || e.keyCode == 32) {
            isJump = true;
        }
    };

    /*
    * 精灵类
    * param { ctx : Context }  绘图上下文
    * param { img : Image }  图片资源
    * param { maxFrame : number }  最大帧
    * param { width : number }  精灵的宽
    * param { height : number }  精灵的高
    * param { speed : number }  精灵运动的速度
    * */
    function Sprite(ctx, img, maxFrame, width, height, speed) {
        this.ctx = ctx;
        this.img = img;
        this.maxFrame = maxFrame;
        this.width = width;
        this.height = height;
        this.speed = speed || SPEED;
        this.speedPlus = 0.5;  // 加减速度
        this.x = 20;
        this.y = ctx.canvas.height - height;
        this.initialY = this.y;
        this.index = 0; // 恐龙初始帧
        this._bind();
    }

    // 给Sprite原型扩充方法
    util.extend(Sprite.prototype, {

        // 把精灵绘制到画布上
        draw: function () {
            this.ctx.drawImage(this.img,
                this.width * this.index, 0, this.width, this.height,
                this.x, this.y, this.width, this.height);
        },

        // 更新精灵下一帧数据
        update: function () {

            // 更新精灵帧
            this.index = ++this.index > this.maxFrame? 0 : this.index;

            // 是否跳跃中
            if (isJump) {
                this.y -= this.speed;  // 刷新y轴显示坐标
                this.speed -= this.speedPlus;  // 减缓上跳速度，加快下降速度

                // 停止跳跃
                if (this.y >= this.initialY) {
                    this.y = this.initialY;
                    this.speed = SPEED;
                    isJump = false;
                }

                // 跳跃时显示第0帧图像
                this.index = 0;
            }
        },

        // 绑定事件
        _bind: function () {
            document.addEventListener('keydown', jump);
        },

        // 取消事件绑定
        unbind: function () {
            document.removeEventListener('keydown', jump);
            isJump = false;
        }
    });

    // 公开到全局
    w.Sprite = Sprite;

}(window));
