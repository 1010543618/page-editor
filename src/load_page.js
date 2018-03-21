import $ from 'jquery';
export default function(PE, callback){
  $.ajax({
    url : PE.opts.page_url,
    type : "get",
    dataType : "html",
    success : function(html){
      PE.ori_contents = PE.trans_contents = html
      callback(PE);
    },
    error : function(data){
      alert("服务器发生错误");
    }
  });
}
