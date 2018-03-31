import $ from 'jquery';
import alert from '../ui/alert'
export {ajax}
var ajax = function(url, data, succ){
  $.ajax({
    url : url,
    type : "post",
    data : data,
    dataType : "json",
    success : function(data){
      if(data.status == true){
        if (succ) {
          succ(data.data, alert);
        }else{
          alert(data.data);
        }
      }else{
        alert(data.msg);
      }
    },
    error : function(data){
      alert('服务器发生错误', '', 'err');
    }
  });
}
