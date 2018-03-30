(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('urijs')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'urijs'], factory) :
	(factory((global.PE = {}),global.$,global.URI));
}(this, (function (exports,$$1,URI) { 'use strict';

$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;
URI = URI && URI.hasOwnProperty('default') ? URI['default'] : URI;

var toolbar = '<div style="position: sticky;top: 0;left: 0;z-index: 9999;">\
  <div class="card text-white bg-secondary">\
    <div class="card-body">\
      <div class="btn-toolbar" role="toolbar">\
        <button id="#peui-load_page" onclick="PE.load_page()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 加载页面</button>\
        <button id="#peui-source" onclick="PE.source(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> HTML源码</button>\
        <button id="#peui-res" onclick="PE.res(this, \'resolve\')" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 修正外部资源url</button>\
        <button id="#peui-res" onclick="PE.res(this, \'download\')" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 下载外部资源</button>\
        <div class="btn-group btn-group-sm">\
          <button id="#peui-publish" onclick="PE.publish()" class="btn btn-primary"><i class="fa fa-check"></i> 发布</button>\
          <button id="#peui-save" onclick="PE.save()" class="btn btn-success"><i class="fa fa-save"></i> 保存</button>\
          <button id="#peui-preview" onclick="PE.preview()" class="btn btn-dark"><i class="fa fa-eye"></i> 预览</button>\
          <button id="#peui-discard" onclick="PE.discard()" class="btn btn-danger"><i class="fa fa-undo"></i> 放弃</button>\
        </div>\
        <div class="btn-group btn-group-sm">\
          <button id="#peui-undo" onclick="PE.undo()" class="btn btn-primary"><i class="fa fa-check"></i> 撤销</button>\
          <button id="#peui-redo" onclick="PE.redo()" class="btn btn-success"><i class="fa fa-save"></i> 重做</button>\
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
        <button id="#peui-hide_ori_page" onclick="PE.hide_ori_page ()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 隐藏原网页</button>\
        <button id="#peui-reset" onclick="PE.reset ()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 重置</button>\
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
  for (var i = opts.toolbar.length - 1; i >= 0; i--) {
    if ($.isArray(opts.toolbar[i])) {
      for (var j = opts.toolbar[i].length - 1; j >= 0; j--) {
        UI.$ori = $PE.find('#peui-'+opts.toolbar[i][j]);
      }
    }
    UI.$ori = $PE.find('#peui-'+opts.toolbar[i]);
  }
  $PE.append(display_window);
  UI.$ori = $PE.find('#peui-ori');
  UI.$trans = $PE.find('#peui-trans');
  UI.$transHTML = $PE.find('#peui-transHTML');
}

/**
* 获取对照网页内容和编辑网易内容
*/
function load_page(callback){
  var PE = this;
  var get_ref = $$1.ajax({
    url : PE.opts.ref_page_url,
    type : "get",
    dataType : "html",
  });
  var get_edit = $$1.ajax({
    url : PE.opts.edit_page_url,
    type : "get",
    dataType : "html",
  });
  // 去除html的y滚动条
  var hidden_overflow_y = function(){
    PE.UI.$ori.contents().find('html').attr('style', function(){
      var this_style = $$1(this).attr('style');
      return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
    });
    PE.UI.$trans.contents().find('html').attr('style', function(){
      var this_style = $$1(this).attr('style');
      return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
    });
  };
  $$1.when(get_ref, get_edit)
    .done(function(ref_html,edit_html){
      PE.ori_contents = ref_html;
      PE.trans_contents = edit_html;
      hidden_overflow_y();
      callback && callback.call(PE);
    })
    .fail(function(){alert("服务器发生错误");}); 
}

function correct_height(PE){
  // 初始化高度data
  PE.data.ori_height = 0;
  PE.data.trans_height = 0;
  // 实时更新height
  setInterval(function(){
    var $ori = PE.UI.$ori;
    var $trans = PE.UI.$trans;
    if (Math.abs(PE.data.ori_height - $ori.contents().height()) > 20) {
      PE.data.ori_height = $ori.contents().height() + 20;
      $ori.height(PE.data.ori_height);
    }
    if (Math.abs(PE.data.trans_height - $trans.contents().height()) > 20) {
      PE.data.trans_height = $trans.contents().height()+20;
      $trans.height(PE.data.trans_height);
    }
  }, 500);
}

function init(options){
  var opts = {};
  if($$1.type(options) == 'object'){ 
    opts = options;
  }

  if($$1.type(options) == 'string'){
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
  this.opts = $$1.extend({}, defaults, opts);

  // 保存的数据
  this.data = {};

  // 获取$PE
  this.opts.$PE = $$1(this.opts.el);

  // 初始化工具条
  init_ui(this.opts, this.UI);
  
  // 修正高度
  correct_height(this);

  // 加载页面, 
  this.load_page();

  Object.defineProperty(this, 'ori_contents', {
    get: function(){
      return $$1(this.UI.$ori[0].contentDocument)
    },
    set: function(html){
      var trans = this.UI.$ori.get(0);
      trans.contentDocument.open();
      trans.contentDocument.write(html);
      trans.contentDocument.close();
    }
  });
  Object.defineProperty(this, 'trans_contents', {
    get: function(){
      return $$1(this.UI.$trans[0].contentDocument)
    },
    set: function(html){
      var trans = this.UI.$trans.get(0);
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
      this.trans_contents = html;
    }
  });
  return this;
}

function source(btn){
  if (!this.status.source) {
    $$1(btn).addClass('active');
    this.UI.$trans.hide();
    // 不show的话获取高度会为0
    this.UI.$transHTML.val(this.pageHTML).show()
      .height(this.UI.$transHTML.get(0).scrollHeight);
    this.status.source = true;
  }else{
    $$1(btn).removeClass('active');
    this.pageHTML = this.UI.$transHTML.val();
    this.UI.$transHTML.hide();
    this.UI.$trans.show();
    this.status.source = false;
  }
}

function publish(){
  $$1.ajax({
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
  $$1.ajax({
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
  $$1.ajax({
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

function res(dom, type){
  switch(type){
    case 'resolve' : 
      if (!URI) console.error('未引入urijs！');
      var ori_url = this.opts.ori_url;
      this.ori_contents.find('link').each(function(){
        var href = $$1(this).attr('href');
        href && !URI(href).hostname() && $$1(this).attr('href', URI(href).absoluteTo(ori_url));
      });
      this.trans_contents.find('link').each(function(){
        var href = $$1(this).attr('href');
        href && !URI(href).hostname() && $$1(this).attr('href', URI(href).absoluteTo(ori_url));
      });
      this.ori_contents.find('img, script').each(function(){
        var src = $$1(this).attr('src');
        src && !URI(src).hostname() && $$1(this).attr('src', URI(src).absoluteTo(ori_url));
      });
      this.trans_contents.find('img, script').each(function(){
        var src = $$1(this).attr('src');
        src && !URI(src).hostname() && $$1(this).attr('src', URI(src).absoluteTo(ori_url));
      });
      break;
    case 'download' : 
      var res_uris = [];
      this.trans_contents.find('link').each(function(){
        $$1(this).attr('href') && res_uris.push($$1(this).attr('href'));
      });
      this.trans_contents.find('img, script').each(function(){
        $$1(this).attr('src') && res_uris.push($$1(this).attr('src'));
      });
      $$1.ajax({
        url : this.opts.server_url,
        type : "post",
        data : {'type':'download_res', 'res_uris': res_uris},
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
      break;
  }
}

exports.init = init;
exports.load_page = load_page;
exports.source = source;
exports.publish = publish;
exports.save = save;
exports.preview = preview;
exports.discard = discard;
exports.reset = reset;
exports.res = res;

Object.defineProperty(exports, '__esModule', { value: true });

})));
