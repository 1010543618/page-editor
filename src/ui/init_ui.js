import Toolbar from './toolbar.js'
import display_window from './display_window.js'
export default function(opts, UI){
  var $PE = opts.$PE;

  
  var toolbar = new Toolbar({opt_items: opts.toolbar});
  $PE.append(toolbar.getHtmlTpl())
  $PE.append(display_window)
  UI.ori = $PE.find('ori')
  UI.trans = $PE.find('trans')
  UI.transHTML = $PE.find('transHTML')
}