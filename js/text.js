(function (w) {
    /*
     * 文字类
     * param { ctx : Context } 绘图环境对象
     * param { startTime : number } 一个起始时间
     * param { x : number } 绘制文本时候的x轴坐标
     * param { y : number } 绘制文本时候的y轴坐标
     * param { font : number } 绘制文本时的样式
     * param { align : string } 绘制文本时的横向对其方式
     * param { baseline : string } 绘制文本时的纵向对其方式
     * param { fillStyle : string } 绘制文本时的颜色
     * */
    function Text(ctx, startTime, x, y, fillStyle, align, baseline, font) {
        this.ctx = ctx;
        this.text = '';
        this.startTime = 0;
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle || 'black';
        this.align = align || 'right';
        this.baseline = baseline || 'top';
        this.font = font || '900 20px 微软雅黑';
    }

    // 把指定文本绘制到画布上
    util.extend(Text.prototype, {

        // 绘制文本
        draw : function () {
            // 把默认的状态保存一份
            this.ctx.save();

            this.ctx.font = this.font;
            this.ctx.textAlign = this.align;
            this.ctx.textBaseline = this.baseline;
            this.ctx.fillStyle = this.fillStyle;
            this.ctx.fillText(this.text, this.x, this.y);

            // 文本绘制完毕后，恢复默认的状态
            this.ctx.restore();
        },

        // 更新时间
        update: function () {
            this.startTime++;

            // 拼接成5位数
            this.text = this.startTime + '';
            var val = 5 - this.text.length;
            while (val--) {
                this.text = '0' + this.text;
            }
        }
    });

    // 暴漏到全局
    w.Text = Text;
}(window));