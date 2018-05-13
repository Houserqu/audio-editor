/* 公共 JS */

/**
 * 全局变量
 */
var cut_mode = false;   // 当前模式
var point_x = 0;
var point_y = 0;

var cut_start = true; // 当前选取点是起点还是终点， true = 起点, false = 终点
var cuts = []; // 裁剪结果
var cut_temp = null; //存储某次裁剪起点

var audioElement=document.getElementById("audio-line-1");
var ctx=audioElement.getContext("2d");

// 模拟 歌词数据
var worddata = [{"bg":"540","ed":"2520","nc":"1.0","onebest":"绿是阳春烟景","si":"0","speaker":"0","wordsResultList":[{"alternativeList":[],"wc":"0.8368","wordBg":"21","wordEd":"64","wordsName":"绿","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"64","wordEd":"80","wordsName":"是","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"80","wordEd":"134","wordsName":"阳春","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"134","wordEd":"158","wordsName":"烟","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"158","wordEd":"192","wordsName":"景","wp":"n"}]},{"bg":"2540","ed":"9200","nc":"1.0","onebest":"大块文章的底色，4月的凌乱更是率的鲜活秀妹，诗意盎然。","si":"1","speaker":"0","wordsResultList":[{"alternativeList":[],"wc":"1.0000","wordBg":"9","wordEd":"64","wordsName":"大块","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"64","wordEd":"96","wordsName":"文章","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"96","wordEd":"106","wordsName":"的","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"106","wordEd":"182","wordsName":"底色","wp":"n"},{"alternativeList":[],"wc":"0.0000","wordBg":"182","wordEd":"182","wordsName":"，","wp":"p"},{"alternativeList":[],"wc":"1.0000","wordBg":"182","wordEd":"234","wordsName":"4月","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"234","wordEd":"244","wordsName":"的","wp":"n"},{"alternativeList":[],"wc":"0.9996","wordBg":"244","wordEd":"301","wordsName":"凌乱","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"301","wordEd":"336","wordsName":"更是","wp":"n"},{"alternativeList":[],"wc":"0.6289","wordBg":"336","wordEd":"354","wordsName":"率","wp":"n"},{"alternativeList":[],"wc":"0.9746","wordBg":"354","wordEd":"368","wordsName":"的","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"368","wordEd":"449","wordsName":"鲜活","wp":"n"},{"alternativeList":[],"wc":"0.7068","wordBg":"449","wordEd":"492","wordsName":"秀","wp":"n"},{"alternativeList":[],"wc":"0.6141","wordBg":"492","wordEd":"537","wordsName":"妹","wp":"n"},{"alternativeList":[],"wc":"0.0000","wordBg":"537","wordEd":"537","wordsName":"，","wp":"p"},{"alternativeList":[],"wc":"1.0000","wordBg":"537","wordEd":"590","wordsName":"诗意","wp":"n"},{"alternativeList":[],"wc":"1.0000","wordBg":"590","wordEd":"646","wordsName":"盎然","wp":"n"},{"alternativeList":[],"wc":"0.0000","wordBg":"646","wordEd":"646","wordsName":"。","wp":"p"},{"alternativeList":[],"wc":"0.0000","wordBg":"646","wordEd":"646","wordsName":"","wp":"g"}]}];

// 实例化cancas 操作工具
var AudioCanvas = new Audio(audioElement, {
  lineWidth: 1, 
  strokeStyle: "#009688",
  words: worddata,
  pointLocation: function(x, y){
    point_x = x;
    point_y = y;

    document.getElementById("point_x").innerHTML = x;
    document.getElementById("point_y").innerHTML = y;
  }
});

// 模拟波形图数据
var data = [
  {x:50, y1:50, y2:100},
  {x:51, y1:50, y2:100},
  {x:52, y1:50, y2:100},
  {x:53, y1:50, y2:100},
  {x:54, y1:50, y2:100},
  {x:55, y1:50, y2:100},
  {x:56, y1:50, y2:100},
  {x:57, y1:50, y2:100},
  {x:58, y1:50, y2:100},
  {x:59, y1:50, y2:100},
  {x:60, y1:50, y2:100},
]

// 初始化函数
var canvasInit =  function (){
  cut_mode = false;
  cuts = [];
  cut_temp = null;

  // 绘制歌词
  worddata.forEach(function(item){
    item.wordsResultList.forEach(function(item){
      var position = (parseInt(item.wordBg) + parseInt(item.wordEd))/2;
      console.log(position);
      AudioCanvas.paintWord(item.wordsName, position);
    })
  })

  // 绘制波形图
  // data.forEach(function(item){
  //   AudioCanvas.paintLine(item.x, item.y1, item.y2);
  // })
}

canvasInit();


/**
 * 剪切模式切换
 */

// document.getElementById('cut').addEventListener('click', function(e){
//   cut_mode = !cut_mode;

//   console.log(cut_mode);
// })

// AudioCanvas.paintCut(100,200);

// 选取剪切点
audioElement.addEventListener('click', function(e){
  var cur_x = e.offsetX;
  AudioCanvas.addXLine(cur_x);

  if(cut_temp){
    cuts.push(cut_temp, cur_x);
    AudioCanvas.paintCut(cut_temp, cur_x);
    cut_temp = null;
  } else {
    cut_temp = cur_x;
  }

  console.log(cuts, cut_temp);
})

// 重置
document.getElementById('restart').addEventListener('click', function(){
  AudioCanvas.clean();
  canvasInit();
})

