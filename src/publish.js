import $ from 'jquery';
import {ajax} from './core/utils'
export default function(){
  ajax(
    this.opts.server_url, 
    {'type':'publish', 'html': this.pageHTML},
    function(data, alert){
      alert('发布成功', '', 'succ');
    }
  );
}
