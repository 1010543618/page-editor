import $ from 'jquery';
export default function(PE){
  // 初始化高度data
  PE.data.ori_height = 0;
  PE.data.trans_height = 0;
  // 实时更新height
  setInterval(function(){
    var $ori = PE.UI.$ori
    var $trans = PE.UI.$trans
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
