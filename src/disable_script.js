import $ from 'jquery';
export default function(btn){
  if (!this.status.disable_script) {
    $(btn).addClass('active')
    this.status.disable_script = true
    this.trans_contents.find('script').replaceWith(function(){
      return this.outerHTML
        .replace(/^<script/, '<pe-no-script')
        .replace(/<\/script>/, '<\/pe-no-script>')
      })
  }else{
    $(btn).removeClass('active')
    this.status.disable_script = false
    this.trans_contents.find('pe-no-script').replaceWith(function(){
      return this.outerHTML
        .replace(/^<pe-no-script/, '<script')
        .replace(/<\/pe-no-script>/, '<\/script>')
      })
  }
}