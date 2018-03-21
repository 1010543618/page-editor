import toolbar from './toolbar.js'
import display_window from './display_window.js'
export default function(opts, UI){
  var $PE = opts.$PE;
  // 以后写toolbar
  $PE.append(toolbar)
  for (var i = opts.toolbar.length - 1; i >= 0; i--) {
    if ($.isArray(opts.toolbar[i])) {
      for (var j = opts.toolbar[i].length - 1; j >= 0; j--) {
        UI.$ori = $PE.find('#peui-'+opts.toolbar[i][j])
      }
    }
    UI.$ori = $PE.find('#peui-'+opts.toolbar[i])
  }
  $PE.append(display_window)
  UI.$ori = $PE.find('#peui-ori')
  UI.$trans = $PE.find('#peui-trans')
  UI.$transHTML = $PE.find('#peui-transHTML')
}