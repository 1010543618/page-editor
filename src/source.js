import $ from 'jquery';
export default function(btn){
  if (!this.status.source) {
    $(btn).addClass('active')
    this.UI.$trans.hide()
    this.UI.$transHTML.val(this.pageHTML).show()
    this.status.source = true
  }else{
    $(btn).removeClass('active')
    this.pageHTML = this.UI.$transHTML.val()
    this.UI.$transHTML.hide()
    this.UI.$trans.show()
    this.status.source = false
  }
}