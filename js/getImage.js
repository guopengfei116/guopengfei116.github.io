(function (w) {

    // 根据用户传入path来获取图像资源
    function getImage(pathObj, cbk) {

        var imgObj = {}, img, imgLength = 0, count = 0;

        // 把所有的路径遍历出来，
        // 然后根据这些路径创建不同的图片对象，
        // 然后把这些图片对象存储到imgObj里，
        // 当所有的图片加载完毕时，
        // 把imgObj传给回调函数，供其使用。
        for (var key in pathObj) {

            imgLength++;

            // 创建图片对象，并指定其路径
            img = new Image();
            img.src = pathObj[key];

            // 分别给不同的img绑定load事件，
            // 每一张图片加载完毕之后都会让count自增一次，
            // 当count的值等于pathObj中路径的数量，
            // 那么证明所有的图片已经加载完毕了，
            // 可以把这些图像资源传给使用者了
            img.addEventListener('load', function () {
                count++;
                if (count >= imgLength) {
                    cbk(imgObj);
                }
            });

            // 把新创建的图片对象，存储到imgObj里
            imgObj[key] = img;
        }
    }

    // 把getImage暴漏到全局
    w.getImage = getImage;

})(window);
