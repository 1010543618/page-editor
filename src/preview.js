import $ from 'jquery';
import {ajax} from './core/utils'
export default function(){
  ajax(
    this.opts.server_url, 
    {'type':'preview', 'html': this.pageHTML},
    function(data, alert){
      alert(data, '', 'succ');  
    }
  );
}
