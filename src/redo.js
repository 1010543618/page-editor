import $ from 'jquery';
export default function(){
  var trans = this.UI.$trans.get(0)
  if (!this.data.redo.length) return;
  this.data.undo.push(this.pageHTML)
  if (!this.status.source) {
    trans.contentDocument.open();
    trans.contentDocument.write(this.data.redo.pop());
    trans.contentDocument.close();
  }else{
    this.UI.$transHTML.val(this.data.redo.pop())
  }
}