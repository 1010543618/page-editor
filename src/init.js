import $ from 'jquery';
import init_ui from './ui/init_ui'
import load_page from './load_page'
import correct_height from './correct_height'
export default function(options){
  var opts = {}
  if($.type(options) == 'object'){
    
  }

  if($.type(options) == 'string'){
    opts.$PE = $('#'+options);
  }
  
  var defaults = {
    page_url: './iframe_for_test.html',
    publish_url: '',
    toolbar: [
      'source', 
      ['publish', 'save', 'preview', 'discard'],
      ['undo', 'redo'],
      'show_blocks',
      'correct_not_trans',
      'hide_ori_page',
      'reset'
    ]
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

  // 加载页面, 修正高度
  load_page(this, correct_height);


  Object.defineProperty(this, 'ori_contents', {
    get: function(){
      return $(this.UI.$ori[0].contentDocument)
    },
    set: function(html){
      var trans = this.UI.$ori.get(0)
      trans.contentDocument.open();
      trans.contentDocument.write(html);
      trans.contentDocument.close();
    }
  });
  Object.defineProperty(this, 'trans_contents', {
    get: function(){
      return $(this.UI.$trans[0].contentDocument)
    },
    set: function(html){
      var trans = this.UI.$trans.get(0)
      trans.contentDocument.open();
      trans.contentDocument.write(html);
      trans.contentDocument.close();
    }
  });
  Object.defineProperty(this, 'pageHTML', {
    get: function(){
      return this.trans_contents.find('html').get(0).outerHTML
    },
    set: function(html){
      this.trans_contents = html
    }
  });
  return this;
}