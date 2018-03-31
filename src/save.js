import $ from 'jquery';
import {ajax} from './core/utils'
export default function(){
  ajax(
    this.opts.server_url, 
    {'type':'save', 'html': this.pageHTML},
    function(data, alert){
      alert('保存成功', '', 'succ');
    }
  );
}