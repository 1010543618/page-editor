import $ from 'jquery';
export default function(){
  var aa = URI(ORI_URL+'/123/789');
  $('#gpte-trans').contents().find('link').each(function(){
    var href = $(this).attr('href')
    console.log(URI(href))
    href && !URI(href).hostname() && $(this).attr('href', URI(ORI_URL).absoluteTo(href) + href);
  })
  $('#gpte-trans').contents().find('img, script').each(function(){
    var src = $(this).attr('src')
    src && !URI(src).hostname() && $(this).attr('src', URI(ORI_URL).absoluteTo(src) + src);
  })
};