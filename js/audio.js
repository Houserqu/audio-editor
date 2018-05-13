/* 音轨图操作 JS */

function Audio (canvas, options) {
  this.canvas = canvas;
  var ctx = canvas.getContext("2d");

  // 不同屏幕放大处理
  (function(){
    // 配置画笔属性
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;

    // 屏幕的设备像素比
    var devicePixelRatio = window.devicePixelRatio || 1;

    // 浏览器在渲染canvas之前存储画布信息的像素比
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;

    // canvas的实际渲染倍率
    var ratio = devicePixelRatio / backingStoreRatio;

    console.log(ratio);

    canvas.style.width = canvas.width * ratio ;
    canvas.style.height = canvas.height * ratio ;

    // canvas.width = canvas.width * ratio;
    // canvas.height = canvas.height * ratio;
  })();


  // 绘画辅助线
  (function() {
    var sublineCtx = canvas.getContext("2d");
    sublineCtx.beginPath()
    sublineCtx.strokeStyle = "#fff";

    sublineCtx.moveTo(0,50);
    sublineCtx.lineTo(canvas.width, 50);
    sublineCtx.stroke();

    // 监听鼠标移动
    canvas.addEventListener('mousemove', function(e){
      options.pointLocation(e.offsetX, e.offsetY)
    })

  })();

  // 绘制波形
  this.paintLine = function(x, y1, y2) {
    ctx.moveTo(x,y1);
    ctx.lineTo(x, y2);
    ctx.stroke()
  }

  // 绘制文字
  this.paintWord = function(wordsName, wordBg){
    //1. 使用`font`设置字体。
    ctx.font = "18px Arial";
    //2. 使用`fillStyle`设置字体颜色。
    ctx.fillStyle = "#00AAAA";
    //3. 使用`fillText()`方法显示字体。
    ctx.fillText(wordsName,wordBg, 50);
  }

  // 绘制剪切区域
  this.paintCut = function(start, end){
    ctx.fillStyle="rgba(220, 213, 213, 0.7)";
    ctx.fillRect(start, 0, end - start, 100); 
  }

  // 绘制 裁剪线
  this.addXLine = function(x) {
    ctx.beginPath()
    
    ctx.strokeStyle = "#fff";
    ctx.moveTo(x,0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // 清空画布
  this.clean = function () {
    canvas.height = 0;
    canvas.height = 100 ;
  }
}
