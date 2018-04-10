import $ from 'jquery';
import alert from './ui/alert'
export default function(btn){
  if (!this.status.edit_trans) {
    var $fonts = this.trans_contents.find('font font')
    var gtr = this.UI.$trans.get_gtr()
    var PE = this
    if (!gtr) {
      alert('该页面未翻译，或翻译后未保存', '无法编辑', 'err')
      return
    }
    $(btn).addClass('active')
    this.status.edit_trans = true
    this.data.gtr = gtr
    $fonts.prop('contenteditable', true)
      .css('color', 'red')
    // Firefox和Chrome早期版本中带有前缀
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    // 选择目标节点
    var targets = $fonts.get();
    // 创建观察者对象
      PE.data.edit_trans_observer = new MutationObserver(function(mutations) {
      var font = mutations[0].target.parentNode
      if (mutations[0].type == 'characterData' && font) {
        var id = $(mutations[0].target.parentNode).attr('pe-gt-id')
        var t_text = ''
        $fonts.filter("[pe-gt-id=34]").each(function(){
          t_text += $(this).text()
        })
        PE.data.gtr.ts[id].t_text = t_text
      }
    });
    // 配置观察选项:
    var config = { subtree: true, characterData: true}
     
    targets.forEach(function(target){

      // 传入目标节点和观察选项
      PE.data.edit_trans_observer.observe(target, config);
      
    })
    
  }else{
    $(btn).removeClass('active')
    this.status.edit_trans = false
    this.UI.$trans.set_gtr(JSON.stringify(this.data.gtr))
    this.trans_contents.find('font font').prop('contenteditable', true)
      .css('color', '')
    // 随后,你还可以停止观察
    this.data.edit_trans_observer.disconnect();
  }
}