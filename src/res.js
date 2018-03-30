import $ from 'jquery';
import URI from 'urijs';
export default function(dom, type){
  switch(type){
    case 'resolve' : 
      if (!URI) console.error('未引入urijs！');
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
      $.ajax({
        url : this.opts.server_url,
        type : "post",
        data : {'type':'download_res', 'res_uris': res_uris},
        dataType : "json",
        success : function(data){
          if(data.status == true){
            alert(data.data);
          }else{
            alert(data.msg);
          }
        },
        error : function(data){
          alert("服务器发生错误");
        }
      });
      break;
  }
}