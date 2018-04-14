import $ from 'jquery';
import alert from './ui/alert'
export default function(btn){
  if (!this.status.edit_trans) {
    var $fonts = this.trans_contents.find('font font')
    if (!this.UI.$trans.get_gtr()) {
      alert('该页面未翻译，或翻译后未保存', '无法编辑', 'err')
      return
    }
    $(btn).addClass('active')
    this.status.edit_trans = true
    $fonts.prop('contenteditable', true)
      .css({
        'color': 'red',
        'cursor': 'text'
      }).on('click', function(e){
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
      })

    // 观察font节点变化
    /*不用观察，最后一起改了也行
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    var targets = $fonts.get();
      PE.data.edit_trans_observer = new MutationObserver(function(mutations) {
      var font = mutations[0].target.parentNode
      if (mutations[0].type == 'characterData' && font) {
        var id = $(mutations[0].target.parentNode).attr('pe-gt-id')
        var t_text = ''
        $fonts.filter("[pe-gt-id="+id+"]").each(function(){
          t_text += $(this).text()
        })
        PE.data.gtr.ts[id].t_text = t_text
      }
    });
    var config = { subtree: true, characterData: true}
    targets.forEach(function(target){
      PE.data.edit_trans_observer.observe(target, config);
    })
    */
  }else{
    $(btn).removeClass('active')
    var $fonts = this.trans_contents.find('font font')
    var gtr = this.UI.$trans.get_gtr()
    this.status.edit_trans = false
    for (var t in gtr.ts){
      var t_text = ''
      $fonts.filter("[pe-gt-id="+t+"]").each(function(){
        t_text += $(this).text()
      })
      gtr.ts[t].t_text = t_text
    }
    this.UI.$trans.set_gtr(JSON.stringify(gtr))
    this.trans_contents.find('font font').prop('contenteditable', false)
      .css({
        'color': '',
        'cursor': ''
      }).off('click')
    // 停止font节点变化观察
    /*不用观察，最后一起改了也行
    this.data.edit_trans_observer.disconnect();
    */
  }
}