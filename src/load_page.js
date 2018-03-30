/**
* 获取对照网页内容和编辑网易内容
*/
import $ from 'jquery';
export default function(callback){
  var PE = this
  var get_ref = $.ajax({
    url : PE.opts.ref_page_url,
    type : "get",
    dataType : "html",
  });
  var get_edit = $.ajax({
    url : PE.opts.edit_page_url,
    type : "get",
    dataType : "html",
  });
  // 去除html的y滚动条
  var hidden_overflow_y = function(){
    PE.UI.$ori.contents().find('html').attr('style', function(){
      var this_style = $(this).attr('style')
      return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
    })
    PE.UI.$trans.contents().find('html').attr('style', function(){
      var this_style = $(this).attr('style')
      return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
    })
  }
  $.when(get_ref, get_edit)
    .done(function(ref_html,edit_html){
      PE.ori_contents = ref_html
      PE.trans_contents = edit_html
      hidden_overflow_y()
      callback && callback.call(PE)
    })
    .fail(function(){alert("服务器发生错误");}); 
}
