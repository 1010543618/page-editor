import $ from 'jquery';
export default function(dom, type){
  switch(type){
    case 'undo' : 
      var trans = this.UI.$trans.get(0)
      trans.contentDocument.execCommand('undo');
      break;
    case 'redo' : 
      break;
  }
}