import $ from 'jquery';
import init_ui from './ui/init_ui'
import load_page from './load_page'
import correct_height from './correct_height'
export default function(options){
  var opts = {}
  if($.type(options) == 'object'){ 
    opts = options;
  }

  if($.type(options) == 'string'){
    opts.el = options;
  }
  
  var defaults = {
    // 左iframe中对照用的页面的url
    ref_page_url: './iframe_for_test.html',
    // 右iframe中编辑用的页面的url
    edit_page_url: './iframe_for_test.html',
    // 原始页面的url
    ori_url: '',
    // 服务器的url
    server_url: '',
    toolbar: [
      'source', 
      ['publish', 'save', 'preview', 'discard'],
      ['undo', 'redo'],
      'show_blocks',
      'correct_not_trans',
      'hide_ori_page',
      'reset'
    ],
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

  // 获取$PE
  this.opts.$PE = $(this.opts.el)

  // 初始化工具条
  init_ui(this.opts, this.UI);
  
  // 修正高度
  correct_height(this)

  // 加载页面, 
  this.load_page();

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