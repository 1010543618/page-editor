import $ from 'jquery';
import init_ui from './ui/init_ui'
export default function(options){
  var opts = {}
  if($.type(options) == 'object'){
    
  }

  if($.type(options) == 'string'){
    opts.$PE = $('#'+options);
  }
  
  var defaults = {
    publish_url: '',
    toolbar: [[
      'source', '|', 
      'publish', 'save', 'preview', 'discard', '|',
      'undo', 'redo', '|',
      'show_blocks', '|',
      'correct_not_trans', '|',
      'hide_ori_page', '|',
      'reset'
    ]]
  }
  
  // 编辑器的全部ui
  this.UI = {}

  // 编辑器的状态
  this.status = {
    source: false,
    edit: false,
    binding_scroll: false
  }

  // 使用jQuery.extend 覆盖插件默认参数
  this.opts = $.extend({}, defaults, opts);

  // 保存的数据
  this.data = {};

  // 初始化工具条
  init_ui(this.opts, this.UI);

  Object.defineProperty(this, 'ori_contents', {
    get: function(){
      return $(this.opts.$ori[0].contentDocument)
    }
  });
  Object.defineProperty(this, 'trans_contents', {
    get: function(){
      return $(this.opts.$trans[0].contentDocument)
    }
  });
  Object.defineProperty(this, 'pageHTML', {
    get: function(){
      return this.trans_contents.find('html').get(0).outerHTML
    },
    set: function(html){
      console.log(html, this.opts.$trans.get(0))
      var trans = this.opts.$trans.get(0)
      trans.contentDocument.open();
      trans.contentDocument.write(html);
      trans.contentDocument.close();
    }
  });
  return this;
}