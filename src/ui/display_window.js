import {ori_c, trans_c} from './container.js'
export default function(UI){
  var $dispaly_window = $('<div class="container-fluid">\
    <div class="row">\
    </div>\
  </div>');
  var $ori_c = ori_c(UI)
  var $trans_c = trans_c(UI)
  $dispaly_window.find('.row').append([$ori_c, $trans_c]);
  $dispaly_window.hide_ori_c = function(){
    $ori_c.hide()
    $trans_c.removeClass('col-md-6').addClass('col-md-12')
  }
  $dispaly_window.show_ori_c = function(){
    $trans_c.removeClass('col-md-12').addClass('col-md-6')
    $ori_c.show()
  }
  UI.display_window = $dispaly_window
  return $dispaly_window
}