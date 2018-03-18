(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.PE = {}),global.$));
}(this, (function (exports,$) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

function init(options){
  var opts = {};
  if($.type(options) == 'object'){
    
  }

  if($.type(options) == 'string'){
    opts.$ori = $('#'+options).find('#ori');
    opts.$trans = $('#'+options).find('#trans');
    opts.$transHTML = $('#'+options).find('#transHTML');
  }
  
  var defaults = {
    publish_url: '',
  };
  
  this.status = {
    source: false,
    edit: false,
    binding_scroll: false
  };

  // 使用jQuery.extend 覆盖插件默认参数
  this.opts = $.extend({}, defaults, opts);

  // 保存的数据
  this.data = {};

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
      console.log(html, this.opts.$trans.get(0));
      var trans = this.opts.$trans.get(0);
      trans.contentDocument.open();
      trans.contentDocument.write(html);
      trans.contentDocument.close();
    }
  });
  return this;
}

function source(btn){
  if (!this.status.source) {
    $(btn).addClass('active');
    this.opts.$trans.hide();
    this.opts.$transHTML.val(this.pageHTML).show();
    this.status.source = true;
  }else{
    $(btn).removeClass('active');
    this.pageHTML = this.opts.$transHTML.val();
    this.opts.$transHTML.hide();
    this.opts.$trans.show();
    this.status.source = false;
  }
}

function publish(){
  $.ajax({
    url : this.opts.publish_url,
    type : "post",
    data : {'html': this.opts.transHTML},
    dataType : "json",
    success : function(data){
      if(data.status == true){
        alert(data.data);
      }else{
        alert(data.msg);
      }
    },
    error : function(data){
      alert("服务器发生错误");
    }
  });
}

function save(){
  $.ajax({
    url : this.opts.save_url,
    type : "post",
    data : {'html': this.opts.transHTML},
    dataType : "json",
    success : function(data){
      if(data.status == true){
        alert(data.data);
      }else{
        alert(data.msg);
      }
    },
    error : function(data){
      alert("服务器发生错误");
    }
  });
}

function preview(){
  $.ajax({
    url : this.opts.preview_url,
    type : "post",
    data : {'html': this.opts.transHTML},
    dataType : "json",
    success : function(data){
      if(data.status == true){
        alert(data.data);
      }else{
        alert(data.msg);
      }
    },
    error : function(data){
      alert("服务器发生错误");
    }
  });
}

function discard(){
  if(confirm('是否放弃当前修改！')) location.href = this.opts.discard_url;
}

function reset(){
  this.opts.$trans.attr('src', this.opts.$trans.attr('src'));
}

exports.init = init;
exports.source = source;
exports.publish = publish;
exports.save = save;
exports.preview = preview;
exports.discard = discard;
exports.reset = reset;

Object.defineProperty(exports, '__esModule', { value: true });

})));
