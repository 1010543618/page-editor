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
  $trans_iframe.set_gtr = function(gtr){
    var body = this.contents().find('body')
    var $gtr = body.find('script#google_translate_result')
    if ($gtr.length) {
      $gtr.html(gtr)
    }else{
      body.append('<script id="google_translate_result">'
        +gtr+'</script>')
    }
    return this;
  }
  $trans_iframe.get_gtr = function(){
    var gtr = this.contents().find('script#google_translate_result')
    return gtr.length ? JSON.parse(gtr.html()) : false;
  }
  $trans_iframe.clear_unnecessary_tags = function(){
    this.contents().find('font[pe-gt-id]:has(*)')
      .text(function(){return $(this).text()})
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
