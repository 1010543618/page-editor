import $ from 'jquery';
export default function(){
  if(confirm('是否放弃当前修改！')) location.href = this.opts.discard_url;
}