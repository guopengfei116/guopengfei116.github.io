(function (w) {

    /*
     * @constructor 障碍物
     * param { ctx : Context } 绘图上下文
     * param { img : Image } 图片资源
     * param { maxFrame : number }  最大帧
     * param { width : number }  障碍物的宽
     * param { height : number }  障碍物的高
     * param { speed : number } 运动速度
     * */
    function Obstacle(ctx, img, maxFrame, width, height, speed) {
        this.ctx = ctx;
        this.img = img;
        this.maxFrame = maxFrame;
        this.width = width;
        this.height = height;
        this.y = ctx.canvas.height - height;
        this.speed = speed || 3;
        this.speedPlus = 0.003;

        this._init(true);
    }

    // 给原型扩充方法
    util.extend(Obstacle.prototype, {

        // 初始化一些随机的值
        _init: function (isInit) {
            // 随机生成一个障碍物
            this.index = Math.floor(Math.random() * (this.maxFrame + 1));
            // 随机生成障碍物的x轴坐标(最小是画布的宽，最大不过2个画布的宽)
            this.x = Math.floor(Math.random() * this.ctx.canvas.width) + this.ctx.canvas.width;

            // 初始化阶段，不同障碍物之间距离最小间隔300
            if (isInit) {
                var space = this.x - (Obstacle.preX || 0);
                if (space < 300) {
                    this.x += 300 - space;
                }
            }

            Obstacle.preX = this.x;
        },

        // 绘制
        draw: function () {
            this.ctx.drawImage(this.img,
                this.width * this.index, 0, this.width, this.height,
                this.x, this.y, this.width, this.height);
        },

        // 刷新下一帧
        update: function () {

            this.x -= this.speed;
            this.speed += this.speedPlus;

            // 走出画布左侧则重新生产坐标，并变化障碍物样子
            if (this.x < -this.width) {
                this._init();
            }
        }
    });

    w.Obstacle = Obstacle;

}(window));
