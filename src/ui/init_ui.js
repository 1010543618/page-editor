import toolbar from './toolbar.js'
import display_window from './display_window.js'
export default function(opts, UI){
  var $PE = opts.$PE;
  $PE.append(toolbar(UI, opts))
  $PE.append(display_window(UI))
}