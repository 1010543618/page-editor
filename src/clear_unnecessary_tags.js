import $ from 'jquery';
import alert from './ui/alert'
export default function(dom){
  if(this.UI.$trans.clear_unnecessary_tags()){
    alert('清理成功')
  }else{
    alert('清理失败')
  }
}