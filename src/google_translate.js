export default function(dom, type){
  switch(type){
    case 'inject':
      this.data.w_objs = []
      for(i in window){
        this.data.w_objs.push(i)
      }
      this.data.$google_translate = $('<div id="PE-gt-e"></div>'+
        '<script id="PE-gt-es">'+
          'function googleTranslateElementInit() {'+
            'new google.translate.TranslateElement({'+
              'layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,'+
              'pageLanguage: \'en\','+
              'includedLanguages: \'zh-CN\''+
            '}, \'google_translate_element\');'+
          '}'+
        '</script>'+
        '<script id="PE-gt-els" src="http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>');
      this.trans_contents.find('body').prepend(this.data.$google_translate)
      this.pageHTML = this.pageHTML
      break
    case 'del':
      var i = '',
        result = {},//google translate result
        trans_doc = this.trans_contents.get(0),
        json_obj = {
          id: 0,
          ts: {}//translations
        },
        trans_window = this.UI.$trans[0].contentWindow
      for(i in trans_window){
        if (i.substring(0,11) == 'closure_lm_') {
          result = trans_window[i].a.focus[0].Hd.ia.c
        }
      }
      this.trans_contents.find(["script[src^='https://translate.googleapis.com/']",
        "link[href^='https://translate.googleapis.com/']",
        "#PE-gt-e",
        "#PE-gt-es",
        "#PE-gt-els",
        ".goog-te-spinner-pos",
        ".skiptranslate"].join(',')).remove()
      this.trans_contents.find('html,body').removeAttr('style')
      
      for(i in result){
        if (result[i].Da[0].ownerDocument == trans_doc) {
          result[i].Da.forEach(function(val){
            $(val).attr('PE-gt-id', json_obj.id)
          })
          json_obj.ts[json_obj.id] = {//与font上的PE-gt-id对应的id为key
            st: result[i].Gk,//结构structure
            t_text: result[i].U,//译文
            text: result[i].text//原文
          }
          json_obj.id++
        }
      }
      this.data.json_obj = json_obj
      this.pageHTML = this.pageHTML
      break
    case 'save':
      this.trans_contents.find('body').append('<script id="google_translate_result">google_translate_result = '
        +JSON.stringify(this.data.json_obj)+'</script>')
      break
    case 'inject_popup_script':
      break
  }
}

