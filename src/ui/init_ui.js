import toolbar from './toolbar.js'
import display_window from './display_window.js'
export default function(opts, UI){
  var $PE = opts.$PE;
  // 以后写toolbar
  $PE.append(toolbar)

  $PE.append(display_window)
  UI.$ori = $PE.find('#peui-ori')
  UI.$trans = $PE.find('#peui-trans')
  UI.$transHTML = $PE.find('#peui-transHTML')
  console.log(UI)
}