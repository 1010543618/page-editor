export default '<div style="position: sticky;top: 0;left: 0;z-index: 9999;">\
  <div class="card text-white bg-secondary">\
    <div class="card-body">\
      <div class="btn-toolbar" role="toolbar">\
        <button id="#peui-load_page" onclick="PE.load_page(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> HTML源码</button>\
        <button id="#peui-source" onclick="PE.source(this)" class="btn btn-primary btn-sm"><i class="fa fa-check"></i> HTML源码</button>\
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