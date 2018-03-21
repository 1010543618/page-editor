import $ from 'jquery';
export default function(PE){
  // 初始化高度data
  PE.data.ori_height = 0;
  PE.data.trans_height = 0;
  // 去除html的y滚动条
  PE.UI.$ori.contents().find('html').attr('style', function(){
    var this_style = $(this).attr('style')
    console.log(this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden")
    return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
  })
  PE.UI.$trans.contents().find('html').attr('style', function(){
    var this_style = $(this).attr('style')
    return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
  })
  // 实时更新height
  setInterval(function(){
    var $ori = PE.UI.$ori
    var $trans = PE.UI.$trans
    console.log(PE.data.ori_height, $ori.contents().height())
    if (Math.abs(PE.data.ori_height - $ori.contents().height()) > 20) {
      PE.data.ori_height = $ori.contents().height() + 20
      $ori.height(PE.data.ori_height)
    }
    if (Math.abs(PE.data.trans_height - $trans.contents().height()) > 20) {
      PE.data.trans_height = $trans.contents().height()+20
      $trans.height(PE.data.trans_height)
    }
  }, 500);
};
