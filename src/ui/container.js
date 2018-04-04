import ori from './ori.js'
import {trans_iframe, trans_textarea} from './trans.js'
export {ori_c, trans_c}
var ori_c = function(UI){
  var $ori_c = $('<div class="col-md-6 border border-danger">\
    <div class="row">\
    </div>\
  </div>');
  $ori_c.find('.row').append(ori(UI))
  return $ori_c
}

var trans_c = function(UI){
  var $trans_c = $('<div class="col-md-6 border border-primary">\
    <div class="row">\
    </div>\
  </div>');
  $trans_c.find('.row').append(trans_textarea(UI))
  $trans_c.find('.row').append(trans_iframe(UI))
  return $trans_c
}



