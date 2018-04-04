import $ from 'jquery';
export default function(btn){
  if (!this.status.hide_ori) {
    $(btn).addClass('active')
    this.UI.display_window.hide_ori_c()
    this.status.hide_ori = true
  }else{
    $(btn).removeClass('active')
    this.UI.display_window.show_ori_c()
    this.status.hide_ori = false
  }
}