import $ from 'jquery';
export default function(btn){
  if (!this.status.source) {
    $(btn).addClass('active')
    this.opts.$trans.hide()
    this.opts.$transHTML.val(this.pageHTML).show()
    this.status.source = true
  }else{
    $(btn).removeClass('active')
    this.pageHTML = this.opts.$transHTML.val()
    this.opts.$transHTML.hide()
    this.opts.$trans.show()
    this.status.source = false
  }
}