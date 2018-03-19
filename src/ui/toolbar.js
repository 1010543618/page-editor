import utils from '../core/utils.js'
import UIBase from './uibase.js'
export default Toolbar
var Toolbar = function (options){
  console.log(this, options);
  this.initOptions(options);
  this.initToolbar();
};
Toolbar.prototype = {
  items: null,
  initToolbar: function (){
    var items = [];
    for (var i=0; i < this.opt_items.length; i++) {
      items.push(new Button[opts.toolbar])
    }
    this.items = this.items || [];
  },
  add: function (item,index){
    if(index === undefined){
        this.items.push(item);
    }else{
        this.items.splice(index,0,item)
    }

  },
  getHtmlTpl: function (){
    var buff = [];
    console.log(this)
    for (var i=0; i<this.items.length; i++) {
        buff[i] = this.items[i].renderHtml();
    }
    return '<div style="position: sticky;top: 0;left: 0;z-index: 9999;">\
              <div class="card text-white bg-secondary">\
                <div class="card-body">\
                  <div class="btn-toolbar" role="toolbar">'
                  + buff.join('') +
                '</div>\
                </div>\
              </div>\
            </div>'
  },
  postRender: function (){
    var box = this.getDom();
    for (var i=0; i<this.items.length; i++) {
        this.items[i].postRender();
    }
    uiUtils.makeUnselectable(box);
  },
  _onMouseDown: function (e){
    var target = e.target || e.srcElement,
        tagName = target && target.tagName && target.tagName.toLowerCase();
    if (tagName == 'input' || tagName == 'object' || tagName == 'object') {
        return false;
    }
  }
};
utils.inherits(Toolbar, UIBase);
