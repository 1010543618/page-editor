import $ from 'jquery';
export default function(){
  var trans = this.UI.$trans.get(0)
  if (!this.data.undo.length) return;
  this.data.redo.push(this.pageHTML)
  if (!this.status.source) {
    trans.contentDocument.open();
    trans.contentDocument.write(this.data.undo.pop());
    trans.contentDocument.close();
  }else{
    this.UI.$transHTML.val(this.data.undo.pop())
  }
}
