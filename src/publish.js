import $ from 'jquery';
export default function(){
  $.ajax({
    url : this.opts.publish_url,
    type : "post",
    data : {'html': this.opts.transHTML},
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
}
