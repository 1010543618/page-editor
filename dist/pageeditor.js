(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('urijs/URI')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'urijs/URI'], factory) :
	(factory((global.PE = {}),global.$,global.URI));
}(this, (function (exports,$$1,URI) { 'use strict';

$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;
URI = URI && URI.hasOwnProperty('default') ? URI['default'] : URI;

function toolbar(UI, opts){
  var $toolbar = $('<div style="position: sticky;top: 0;left: 0;z-index: 9999;">\
    <div class="card text-white bg-secondary">\
      <div class="card-body">\
        <div class="btn-toolbar" role="toolbar">\
          <button id="#peui-load_page" onclick="PE.load_page()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 加载页面</button>\
          <button id="#peui-source" onclick="PE.source(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> HTML源码</button>\
          <button id="#peui-source" onclick="PE.hide_ori(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 隐藏原网页</button>\
          <button id="#peui-res" onclick="PE.res(this, \'resolve\')" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 修正外部资源url</button>\
          <button id="#peui-res" onclick="PE.res(this, \'download\')" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 下载外部资源</button>\
          <div class="input-group input-group-sm">\
            <div class="input-group-prepend">\
              <span class="input-group-text" id="">使用Google网页翻译器：</span>\
            </div>\
            <div class="input-group-append">\
              <button onclick="PE.google_translate(this, \'inject\')" class="btn btn-success">注入翻译器</button>\
              <button onclick="PE.google_translate(this, \'del\')" class="btn btn-danger">删除翻译器</button>\
              <button onclick="PE.google_translate(this, \'save\')"  class="btn btn-info">保存结果</button>\
              <button onclick="PE.google_translate(this, \'inject_popup_script\')"  class="btn btn-info">注入提示</button>\
            </div>\
          </div>\
          <button id="#peui-edit_trans" onclick="PE.edit_trans(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 编辑翻译后页面</button>\
          <button id="#peui-edit_trans" onclick="PE.edit_trans(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 保存编辑</button>\
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
          <div class="input-group input-group-sm">\
            <div class="input-group-prepend">\
              <span class="input-group-text" id="">修正不翻译的元素：</span>\
            </div>\
            <div class="input-group-append">\
              <button onclick="PE.correct_not_trans(this, \'select\')" class="btn btn-success">选择元素</button>\
              <button onclick="PE.correct_not_trans(this, \'correct\')" class="btn btn-danger">进行修正</button>\
              <button onclick="PE.correct_not_trans(this, \'clear\')"  class="btn btn-info">清除选择</button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>');
  /*$toolbar.tools = []
  for (var i = opts.toolbar.length - 1; i >= 0; i--) {
    if ($.isArray(opts.toolbar[i])) {
      for (var j = opts.toolbar[i].length - 1; j >= 0; j--) {
        $toolbar.tools.push($PE.find('#peui-'+opts.toolbar[i][j]))
      }
    }
    $toolbar.tools.push(find('#peui-'+opts.toolbar[i]))
  }*/
  UI.toolbar = $toolbar;
  return $toolbar
}

function ori(UI){
  var $ori = $('<iframe id="peui-ori" class="w-100" frameborder="0" src=""></iframe>');
  UI.$ori = $ori;
  return $ori
}

var trans_iframe = function(UI){
  var $trans_iframe = $('<iframe id="peui-trans" class="w-100" frameborder="0" src=""></iframe>');
  $trans_iframe.hidden_overflow_y = function(){
    this.contents().find('html').attr('style', function(){
      var this_style = $(this).attr('style') || '';
      return this_style + ";overflow-y:hidden";
    });
    return this;
  };
  $trans_iframe.show_overflow_y = function(){
    this.contents().find('html').attr('style', function(){
      var this_style = $(this).attr('style') || '';
      return this_style.replace(/;overflow-y:hidden/, '');
    });
    return this;
  };
  $trans_iframe.set_gtr = function(gtr){
    var body = this.contents().find('body');
    console.log(body, gtr);
    var $gtr = body.find('script#google_translate_result');
    if ($gtr.length) {
      $gtr.html(gtr);
    }else{
      body.append('<script id="google_translate_result">'
        +gtr+'</script>');
    }
    return this;
  };
  $trans_iframe.get_gtr = function(){
    var gtr = this.contents().find('script#google_translate_result');
    return gtr.length ? JSON.parse(gtr.html()) : false;
  };
  UI.$trans = $trans_iframe;
  return $trans_iframe
};

var trans_textarea = function(UI){
  var $trans_textarea = $('<textarea id="peui-transHTML" class="w-100"></textarea>');
  $trans_textarea.hide();
  UI.$transHTML = $trans_textarea;
  return $trans_textarea
};

var ori_c = function(UI){
  var $ori_c = $('<div class="col-md-6 border border-danger">\
    <div class="row">\
    </div>\
  </div>');
  $ori_c.find('.row').append(ori(UI));
  return $ori_c
};

var trans_c = function(UI){
  var $trans_c = $('<div class="col-md-6 border border-primary">\
    <div class="row">\
    </div>\
  </div>');
  $trans_c.find('.row').append(trans_textarea(UI));
  $trans_c.find('.row').append(trans_iframe(UI));
  return $trans_c
};

function display_window(UI){
  var $dispaly_window = $('<div class="container-fluid">\
    <div class="row">\
    </div>\
  </div>');
  var $ori_c = ori_c(UI);
  var $trans_c = trans_c(UI);
  $dispaly_window.find('.row').append([$ori_c, $trans_c]);
  $dispaly_window.hide_ori_c = function(){
    $ori_c.hide();
    $trans_c.removeClass('col-md-6').addClass('col-md-12');
  };
  $dispaly_window.show_ori_c = function(){
    $trans_c.removeClass('col-md-12').addClass('col-md-6');
    $ori_c.show();
  };
  UI.display_window = $dispaly_window;
  return $dispaly_window
}

function init_ui(opts, UI){
  var $PE = opts.$PE;
  $PE.append(toolbar(UI, opts));
  $PE.append(display_window(UI));
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
  /**
  *给$trans设置了overflow-y:hidden：保存时要记得取消，
  *不然保存的翻译后的网页再次浏览时y方向超出的也全隐藏了
  */
  
  var hidden_overflow_y = function(){
    PE.UI.$ori.contents().find('html').attr('style', function(){
      var this_style = $$1(this).attr('style');
      return this_style ? this_style + ";overflow-y:hidden" : "overflow-y:hidden";
    });
    PE.UI.$trans.hidden_overflow_y();
  };
  
  $$1.when(get_ref, get_edit)
    .done(function(ref_html,edit_html){
      PE.ori_contents = ref_html[0];
      PE.trans_contents = edit_html[0];
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
      PE.data.trans_height = $trans.contents().height() + 20;
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
    // 放弃修改返回的url
    discard_url: '',
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
    edit_trans: false,
    binding_scroll: false
  };

  // 使用jQuery.extend 覆盖插件默认参数
  this.opts = $$1.extend({}, defaults, opts);

  // 保存的数据
  this.data = {
    undo : [],
    redo : [],
    gt : {}
  };

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
      this.data.undo.push(html);
      this.data.redo = [];
      trans.contentDocument.open();
      trans.contentDocument.write(html);
      trans.contentDocument.close();
    },
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

function hide_ori(btn){
  if (!this.status.hide_ori) {
    $$1(btn).addClass('active');
    this.UI.display_window.hide_ori_c();
    this.status.hide_ori = true;
  }else{
    $$1(btn).removeClass('active');
    this.UI.display_window.show_ori_c();
    this.status.hide_ori = false;
  }
}

function alert$1(data, title = '', type = ''){
  var map= {
    'succ' : 'success',
    'err' : 'danger'
  };
  var alert = '<div class="alert alert-$type$" role="alert">\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
      <span aria-hidden="true">&times;</span>\
    </button>\
    <h4 class="alert-heading">$title$</h4>\
    <p>$data$</p>\
  </div>';
  alert = alert.replace(/\$type\$/, map[type] ? map[type] : 'info');
  alert = alert.replace(/\$title\$/,title);
  alert = alert.replace(/\$data\$/,data);
  console.log(alert,$(alert).alert);
  $('body').prepend(alert).alert();
}

var ajax = function(url, data, succ){
  $$1.ajax({
    url : url,
    type : "post",
    data : data,
    dataType : "json",
    success : function(data){
      if(data.status == true){
        if (succ) {
          succ(data.data, alert$1);
        }else{
          alert$1(data.data);
        }
      }else{
        alert$1(data.msg);
      }
    },
    error : function(data){
      alert$1('服务器发生错误', '', 'err');
    }
  });
};

function publish(){
  ajax(
    this.opts.server_url, 
    {'type':'publish', 'html': this.pageHTML},
    function(data, alert){
      alert('发布成功', '', 'succ');
    }
  );
}

function save(){
  ajax(
    this.opts.server_url, 
    {'type':'save', 'html': this.pageHTML},
    function(data, alert){
      alert('保存成功', '', 'succ');
    }
  );
}

function preview(){
  ajax(
    this.opts.server_url, 
    {'type':'preview', 'html': this.pageHTML},
    function(data, alert){
      alert(data, '', 'succ');  
    }
  );
}

function discard(){
  if(confirm('是否放弃当前修改！')) location.href = this.opts.discard_url;
}

function res(dom, type){
  switch(type){
    case 'resolve' : 
      if (!URI) console.error('未引入urijs！');
      // 记录
      this.data.undo.push({
        name: '修正外部资源url',
        html: this.pageHTML
      });
      // 原页面
      var ori_url = this.opts.ori_url;
      this.ori_contents.find('link').each(function(){
        var href = $$1(this).attr('href');
        href && !URI(href).hostname() && $$1(this).attr('href', URI(href).absoluteTo(ori_url));
        // 去除integrity标签
        $$1(this).removeAttr('integrity');
      });
      this.ori_contents.find('img, script').each(function(){
        var src = $$1(this).attr('src');
        src && !URI(src).hostname() && $$1(this).attr('src', URI(src).absoluteTo(ori_url));
        // 去除integrity标签
        $$1(this).removeAttr('integrity');
      });

      // 翻译页面
      this.trans_contents.find('link').each(function(){
        var href = $$1(this).attr('href');
        href && !URI(href).hostname() && $$1(this).attr('href', URI(href).absoluteTo(ori_url));
        // 去除integrity标签
        $$1(this).removeAttr('integrity');
      });
      this.trans_contents.find('img, script').each(function(){
        var src = $$1(this).attr('src');
        src && !URI(src).hostname() && $$1(this).attr('src', URI(src).absoluteTo(ori_url));
        // 去除integrity标签
        $$1(this).removeAttr('integrity');
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
      ajax(
        this.opts.server_url, 
        {'type':'download_res', 'res_uris': res_uris},
        function(data, alert){
          var msg = '';
          data.forEach(function(res, index, arr){
            msg += (res.downloaded_res_uri ? '成功：' : '失败：') + 
              res.res_uri + '</br>';
          });
          alert(msg);
        }
      );
      break;
  }
}

function undo(){
  var trans = this.UI.$trans.get(0);
  if (!this.data.undo.length) return;
  this.data.redo.push(this.pageHTML);
  if (!this.status.source) {
    trans.contentDocument.open();
    trans.contentDocument.write(this.data.undo.pop());
    trans.contentDocument.close();
  }else{
    this.UI.$transHTML.val(this.data.undo.pop());
  }
}

function redo(){
  var trans = this.UI.$trans.get(0);
  if (!this.data.redo.length) return;
  this.data.undo.push(this.pageHTML);
  if (!this.status.source) {
    trans.contentDocument.open();
    trans.contentDocument.write(this.data.redo.pop());
    trans.contentDocument.close();
  }else{
    this.UI.$transHTML.val(this.data.redo.pop());
  }
}

function reset_style_and_uncheck($o){
  $o.attr('style', function(){
      return $$1(this).attr('ori_style');
    })
    .removeAttr('gpte_not_trans ori_style');
  return $o;
}

function select(){
  var gpte = this;
  this.data.correct_not_trans = {};
  var no_trans_id = 1;
  this.ori_contents.click(this.data.correct_not_trans.ori_click = function(e){
    var $target = $$1(e.target);
    if ($target.attr('gpte_not_trans') === undefined) {
      save_style_and_check($target, 
        'background: #FFAEC9; border:1px solid #ED1C24;', 
        no_trans_id++);
      set_trans(gpte, $target);
    }else{
      // 修改trans界面target对应的节点要用到target的gpte_not_trans属性
      reset_style_and_uncheck(this.trans_contents
        .find('[gpte_not_trans="' + $target.attr('gpte_not_trans') + '"]'));
      reset_style_and_uncheck($target);
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  });
  function set_trans(gpte, $target){
    var select = '';
    select += $target.attr('id') ? '[id="' + $target.attr('id') + '"]' : '';
    select += $target.attr('class') ? '[class="' + $target.attr('class') + '"]' : '';
    select += $target.attr('role') ? '[role="' + $target.attr('role') + '"]' : '';
    select += $target.attr('data') ? '[data="' + $target.attr('data') + '"]' : '';
    var $selected = gpte.trans_contents.find(select);
    if ($selected.length === 1) {
      save_style_and_check($selected, 
        'background: #FFF200; border:1px solid #FF7F27;', 
        $target.attr('gpte_not_trans'));

    }else{
      alert('未找到匹配项，请手动匹配');
      gpte.trans_contents.one('click', gpte.data.correct_not_trans.trans_click = function(e){
        save_style_and_check($$1(e.target), 
          'background: #FFF200; border:1px solid #FF7F27;', 
          $target.attr('gpte_not_trans')
          );
        e.preventDefault();
        e.stopImmediatePropagation();
      });
    }
  }
  function save_style_and_check($o, new_style, id){
    $o.attr('ori_style', function(){
      return $$1(this).attr('style') || '';
    }).attr('style', new_style)
      .attr('gpte_not_trans', id);
  }
}

function correct($ori, $trans){
  var gpte = this;
  this.trans_contents.find('[gpte_not_trans]').each(function(){
    $$1(this).replaceWith(
      reset_style_and_uncheck(gpte.ori_contents
        .find('[gpte_not_trans="' + $$1(this).attr('gpte_not_trans') + '"]'))
      .clone()
    ); 
  });
  this.ori_contents.unbind('click', this.data.correct_not_trans.ori_click);
  this.trans_contents.unbind('click', this.data.correct_not_trans.trans_click);
}

function clear(){
  reset_style_and_uncheck(this.ori_contents.find('[gpte_not_trans]'));
  reset_style_and_uncheck(this.trans_contents.find('[gpte_not_trans]'));
  this.ori_contents.unbind('click', this.data.correct_not_trans.ori_click);
  this.trans_contents.unbind('click', this.data.correct_not_trans.trans_click);
}

function correct_not_trans(dom, type){
  switch(type){
    case 'select': 
      select.call(this);
      break;
    case 'correct': 
      correct.call(this);
      break;
    case 'clear': 
      clear.call(this);
      break;
  }
}

function google_translate(dom, type){
  switch(type){
    case 'inject':
      this.data.w_objs = [];
      for(i in window){
        this.data.w_objs.push(i);
      }
      this.data.$google_translate = $('<div id="PE-gt-e"></div>'+
        '<script id="PE-gt-es">'+
          'function googleTranslateElementInit() {'+
            'new google.translate.TranslateElement({'+
              'layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,'+
              'pageLanguage: \'en\','+
              'includedLanguages: \'zh-CN\''+
            '}, \'google_translate_element\');'+
          '}'+
        '</script>'+
        '<script id="PE-gt-els" src="http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>');
      this.trans_contents.find('body').prepend(this.data.$google_translate);
      this.pageHTML = this.pageHTML;
      break
    case 'del':
      var i = '',
        result = {},//google translate result
        trans_doc = this.trans_contents.get(0),
        json_obj = {
          id: 0,
          ts: {}//translations
        },
        trans_window = this.UI.$trans[0].contentWindow;
      for(i in trans_window){
        if (i.substring(0,11) == 'closure_lm_') {
          result = trans_window[i].a.focus[0].Hd.ia.c;
        }
      }
      this.trans_contents.find(["script[src^='https://translate.googleapis.com/']",
        "link[href^='https://translate.googleapis.com/']",
        "#PE-gt-e",
        "#PE-gt-es",
        "#PE-gt-els",
        ".goog-te-spinner-pos",
        ".skiptranslate"].join(',')).remove();
      this.trans_contents.find('html,body').removeAttr('style');
      
      for(i in result){
        if (result[i].Da[0].ownerDocument == trans_doc) {
          result[i].Da.forEach(function(val){
            $(val).attr('PE-gt-id', json_obj.id);
          });
          json_obj.ts[json_obj.id] = {//与font上的PE-gt-id对应的id为key
            st: result[i].Gk,//结构structure
            t_text: result[i].U,//译文
            text: result[i].text//原文
          };
          json_obj.id++;
        }
      }
      this.data.json_obj = json_obj;
      this.pageHTML = this.pageHTML;
      break
    case 'save':
      this.UI.$trans.set_gtr(JSON.stringify(this.data.json_obj));
      break
    case 'inject_popup_script':
      break
  }
}

function edit_trans(btn){
  if (!this.status.edit_trans) {
    var $fonts = this.trans_contents.find('font font');
    if (!this.UI.$trans.get_gtr()) {
      alert$1('该页面未翻译，或翻译后未保存', '无法编辑', 'err');
      return
    }
    $$1(btn).addClass('active');
    this.status.edit_trans = true;
    $fonts.prop('contenteditable', true)
      .css({
        'color': 'red',
        'cursor': 'text'
      }).on('click', function(e){
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
      });

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
    $$1(btn).removeClass('active');
    var $fonts = this.trans_contents.find('font font');
    var gtr = this.UI.$trans.get_gtr();
    this.status.edit_trans = false;
    for (var t in gtr.ts){
      var t_text = '';
      $fonts.filter("[pe-gt-id="+t+"]").each(function(){
        t_text += $$1(this).text();
      });
      gtr.ts[t].t_text = t_text;
    }
    this.UI.$trans.set_gtr(JSON.stringify(gtr));
    this.trans_contents.find('font font').prop('contenteditable', false)
      .css({
        'color': '',
        'cursor': ''
      }).off('click');
    // 停止font节点变化观察
    /*不用观察，最后一起改了也行
    this.data.edit_trans_observer.disconnect();
    */
  }
}

// 使用requirejs时要手动给window.PE赋值
window.PE = window.PE || exports;

exports.init = init;
exports.load_page = load_page;
exports.source = source;
exports.hide_ori = hide_ori;
exports.publish = publish;
exports.save = save;
exports.preview = preview;
exports.discard = discard;
exports.res = res;
exports.undo = undo;
exports.redo = redo;
exports.correct_not_trans = correct_not_trans;
exports.google_translate = google_translate;
exports.edit_trans = edit_trans;

Object.defineProperty(exports, '__esModule', { value: true });

})));
