export default function(dom, type){
  switch(type){
    case 'inject':
      this.data.$google_translate = $('<div id="google_translate_element"></div>'+
        '<script>'+
          'function googleTranslateElementInit() {'+
            'new google.translate.TranslateElement({'+
              'layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,'+
              'pageLanguage: \'en\','+
              'includedLanguages: \'zh-CN\''+
            '}, \'google_translate_element\');'+
          '}'+
        '</script>'+
        '<script src="http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>');
      $('body').prepend(this.data.$google_translate);
      break
    case 'del':
      $(this.data.$google_translate).remove()
      $('.goog-te-spinner-pos,.skiptranslate').remove()
      $('html,body').removeAttr('style')
      break
    case 'save':
      // var i = ''
      // for(i in window){
      //   if (i.substring(0,11) == 'closure_lm_') {
      //     $.extend(true, this.data.google_translate_result, window[i].a.focus[0].Hd.ia.c)
      //   }
      // }
      break

  }
}

