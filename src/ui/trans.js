export {trans_iframe, trans_textarea}
var trans_iframe = function(UI){
  var $trans_iframe = $('<iframe id="peui-trans" class="w-100" frameborder="0" src=""></iframe>');
  $trans_iframe.hidden_overflow_y = function(){
    this.contents().find('html').attr('style', function(){
      var this_style = $(this).attr('style') || ''
      return this_style + ";overflow-y:hidden";
    })
    return this;
  }
  $trans_iframe.show_overflow_y = function(){
    this.contents().find('html').attr('style', function(){
      var this_style = $(this).attr('style') || ''
      return this_style.replace(/;overflow-y:hidden/, '');
    })
    return this;
  }
  UI.$trans = $trans_iframe
  return $trans_iframe
}

var trans_textarea = function(UI){
  var $trans_textarea = $('<textarea id="peui-transHTML" class="w-100"></textarea>');
  $trans_textarea.hide()
  UI.$transHTML = $trans_textarea
  return $trans_textarea
}
