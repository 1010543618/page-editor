import $ from 'jquery';
export default function(btn){
  if (!this.status.source) {
    $(btn).addClass('active')
    this.UI.$trans.hide()
    // 不show的话获取高度会为0
    this.UI.$transHTML.val(this.pageHTML).show()
      .height(this.UI.$transHTML.get(0).scrollHeight)
    this.status.source = true
  }else{
    $(btn).removeClass('active')
    this.pageHTML = this.UI.$transHTML.val()
    this.UI.$transHTML.hide()
    this.UI.$trans.show()
    this.status.source = false
  }
}