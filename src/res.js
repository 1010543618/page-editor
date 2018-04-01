import $ from 'jquery';
import URI from 'urijs/URI';
import {ajax} from './core/utils'
export default function(dom, type){
  switch(type){
    case 'resolve' : 
      if (!URI) console.error('未引入urijs！');
      // 记录
      this.data.undo.push(this.pageHTML)
      
      var ori_url = this.opts.ori_url
      this.ori_contents.find('link').each(function(){
        var href = $(this).attr('href');
        href && !URI(href).hostname() && $(this).attr('href', URI(href).absoluteTo(ori_url));
      });
      this.trans_contents.find('link').each(function(){
        var href = $(this).attr('href');
        href && !URI(href).hostname() && $(this).attr('href', URI(href).absoluteTo(ori_url));
      });
      this.ori_contents.find('img, script').each(function(){
        var src = $(this).attr('src');
        src && !URI(src).hostname() && $(this).attr('src', URI(src).absoluteTo(ori_url));
      });
      this.trans_contents.find('img, script').each(function(){
        var src = $(this).attr('src');
        src && !URI(src).hostname() && $(this).attr('src', URI(src).absoluteTo(ori_url));
      });
      break;
    case 'download' : 
      var res_uris = [];
      this.trans_contents.find('link').each(function(){
        $(this).attr('href') && res_uris.push($(this).attr('href'));
      });
      this.trans_contents.find('img, script').each(function(){
        $(this).attr('src') && res_uris.push($(this).attr('src'));
      });
      ajax(
        this.opts.server_url, 
        {'type':'download_res', 'res_uris': res_uris},
        function(data, alert){
          var msg = ''
          data.forEach(function(res, index, arr){
            msg += (res.downloaded_res_uri ? '成功：' : '失败：') + 
              res.res_uri + '</br>';
          })
          alert(msg);
        }
      );
      break;
  }
}