import $ from 'jquery';
export default function(btn){
  if (!this.status.edit_trans) {
    $(btn).addClass('active')
    var $fonts = this.trans_contents.find('font font')
    $fonts.prop('contenteditable', true)
      .css('color', 'red')
    // Firefox和Chrome早期版本中带有前缀
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    // 选择目标节点
    var targets = $fonts.get();
    // 创建观察者对象
    var observer = new MutationObserver(function(mutations) {
      var font = mutations[0].target.parentNode
      if (mutations[0].type == 'characterData' && font) {
        // var id = $(mutations[0].target.parentNode).attr('pe-gt-id')
        // google_translate_result.ts[id]
      }
      console.log(this, mutations)
    });
    // 配置观察选项:
    var config = { subtree: true, characterData: true}
     
    targets.forEach(function(target){

      // 传入目标节点和观察选项
      observer.observe(target, config);
      
    })
    
  }else{
    $(btn).removeClass('active')
    this.trans_contents.find('font font').prop('contenteditable', true)
    // 随后,你还可以停止观察
    observer.disconnect();
  }
}