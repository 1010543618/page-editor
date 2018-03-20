(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.PE = {}),global.$));
}(this, (function (exports,$) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var toolbar = '<div style="position: sticky;top: 0;left: 0;z-index: 9999;">\
            <div class="card text-white bg-secondary">\
              <div class="card-body">\
                <div class="btn-toolbar" role="toolbar">\
                  <button onclick="PE.source(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> HTML源码</button>\
                  <div class="btn-group btn-group-sm">\
                    <button onclick="PE.publish()" class="btn btn-primary"><i class="fa fa-check"></i> 发布</button>\
                    <button onclick="PE.save()" class="btn btn-success"><i class="fa fa-save"></i> 保存</button>\
                    <button onclick="PE.preview()" class="btn btn-dark"><i class="fa fa-eye"></i> 预览</button>\
                    <button onclick="PE.discard()" class="btn btn-danger"><i class="fa fa-undo"></i> 放弃</button>\
                  </div>\
                  <div class="btn-group btn-group-sm">\
                    <button onclick="PE.undo()" class="btn btn-primary"><i class="fa fa-check"></i> 撤销</button>\
                    <button onclick="PE.redo()" class="btn btn-success"><i class="fa fa-save"></i> 重做</button>\
                  </div>\
                  <button onclick="PE.show_blocks ()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 显示区块</button>\
                  <div class="input-group input-group-sm">\
                    <div class="input-group-prepend">\
                      <span class="input-group-text" id="">修正不翻译的元素：</span>\
                    </div>\
                    <div class="input-group-append">\
                      <button onclick="PE.correct_not_trans(\'select\')" class="btn btn-success">选择元素</button>\
                      <button onclick="PE.correct_not_trans(\'correct\')" class="btn btn-danger">进行修正</button>\
                      <button onclick="PE.correct_not_trans(\'clear\')"  class="btn btn-info">清除选择</button>\
                    </div>\
                  </div>\
                  <button onclick="PE.hide_ori_page ()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 隐藏原网页</button>\
                  <button onclick="PE.reset ()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 重置</button>\
                </div>\
              </div>\
            </div>\
          </div>';

var display_window = '<div class="container-fluid">\
  <div class="row">\
    <div class="col-md-6 border border-danger">\
      <div class="row">\
        <iframe id="peui-ori" class="w-100" frameborder="0" src=""></iframe></iframe>\
      </div>\
    </div>\
    <div class="col-md-6 border border-primary">\
      <div class="row">\
        <iframe id="peui-trans" class="w-100" frameborder="0" src=""></iframe>\
        <textarea id="peui-transHTML" class="w-100"></textarea>\
      </div>\
    </div>\
  </div>\
</div>';

function init_ui(opts, UI){
  var $PE = opts.$PE;
  // 以后写toolbar
  $PE.append(toolbar);

  $PE.append(display_window);
  UI.$ori = $PE.find('#peui-ori');
  UI.$trans = $PE.find('#peui-trans');
  UI.$transHTML = $PE.find('#peui-transHTML');
  console.log(UI);
}

function init(options){
  var opts = {};
  if($.type(options) == 'object'){
    
  }

  if($.type(options) == 'string'){
    opts.$PE = $('#'+options);
  }
  
  var defaults = {
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
  };
  
  // 编辑器的全部ui
  this.UI = {};

  // 编辑器的状态
  this.status = {
    source: false,
    edit: false,
    binding_scroll: false
  };

  // 使用jQuery.extend 覆盖插件默认参数
  this.opts = $.extend({}, defaults, opts);

  // 保存的数据
  this.data = {};

  // 初始化工具条
  init_ui(this.opts, this.UI);

  Object.defineProperty(this, 'ori_contents', {
    get: function(){
      return $(this.UI.$ori[0].contentDocument)
    }
  });
  Object.defineProperty(this, 'trans_contents', {
    get: function(){
      return $(this.UI.$trans[0].contentDocument)
    }
  });
  Object.defineProperty(this, 'pageHTML', {
    get: function(){
      return this.trans_contents.find('html').get(0).outerHTML
    },
    set: function(html){
      console.log(html, this.UI.$trans.get(0));
      var trans = this.UI.$trans.get(0);
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
    this.UI.$trans.hide();
    this.UI.$transHTML.val(this.pageHTML).show();
    this.status.source = true;
  }else{
    $(btn).removeClass('active');
    this.pageHTML = this.UI.$transHTML.val();
    this.UI.$transHTML.hide();
    this.UI.$trans.show();
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
  this.UI.$trans.attr('src', this.UI.$trans.attr('src'));
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
