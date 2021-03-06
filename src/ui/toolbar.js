export default function(UI, opts){
  var $toolbar = $('<div style="position: sticky;top: 0;left: 0;z-index: 9999;">\
    <div class="card text-white bg-secondary">\
      <div class="card-body">\
        <div class="btn-toolbar" role="toolbar">\
          <button id="#peui-load_page" onclick="PE.load_page()" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 加载页面</button>\
          <button id="#peui-source" onclick="PE.source(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> HTML源码</button>\
          <button id="#peui-source" onclick="PE.hide_ori(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 隐藏原网页</button>\
          <button id="#peui-res" onclick="PE.disable_script(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 禁用js</button>\
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
          <button id="#peui-edit_trans" onclick="PE.clear_unnecessary_tags(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> 清理编辑时产生的多余的标签</button>\
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
  UI.toolbar = $toolbar
  return $toolbar
}