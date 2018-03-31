export default function(data, title = '', type = ''){
  var map= {
    'succ' : 'success',
    'err' : 'danger'
  }
  var alert = '<div class="alert alert-$type$" role="alert">\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
      <span aria-hidden="true">&times;</span>\
    </button>\
    <h4 class="alert-heading">$title$</h4>\
    <p>$data$</p>\
  </div>';
  alert = alert.replace(/\$type\$/, map[type] ? map[type] : 'info');
  alert = alert.replace(/\$title\$/,title);
  alert = alert.replace(/\$data\$/,data);
  console.log(alert,$(alert).alert);
  $('body').prepend(alert).alert();
}
