<?php
set_time_limit(0);
$type = $_POST['type'];
$config = ['res_path' => '../res'];

switch ($type) {
  case 'download_res':
    $res_uris = $_POST['res_uris'];
    $result = [];
    foreach ($res_uris as $key => $res_uri) {
      $result[$key]['res_uri'] = $res_uri;
      $url_a = parse_url($res_uri);
      if(!isset($url_a['host'])) continue;
      // 建立连接
      $curl = curl_init();
      // 设置
      curl_setopt($curl, CURLOPT_URL, $res_uri);
      curl_setopt($curl, CURLOPT_HEADER, 1);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); 
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
      $dirname = dirname($url_a['path']);
      $path = '/' . $url_a['host'] . ($dirname == '\\' || $dirname == '/' ? '' : $dirname);
      $dirpath = $config['res_path'] . $path;
      $filepath = $dirpath . '/' . basename($url_a['path']);
      // 发送
      if (is_file($filepath)) {
        $result[$key]['downloaded_res_uri'] = $path . '/' . basename($url_a['path']);
        continue;
      }
      $content = curl_exec($curl);
      //var_dump($content);
      // curl_exec函数可能返回布尔值 FALSE，但也可能返回等同于 FALSE 的非布尔值。请阅读 布尔类型章节以获取更多信息。应使用 === 运算符来测试此函数的返回值。
      if ($content !== false) {
        is_dir($dirpath) || mkdir($dirpath, 0777 , true) || die('创建文件夹失败');
        file_put_contents($filepath, $content) || die('写入文件失败');
        $result[$key]['downloaded_res_uri'] = $path . '/' . basename($url_a['path']);
      }
      // 关闭
      curl_close($curl);
    }
    return_result($result, true);
    break;
  case 'publish':
    return_result('', true);
    break;
  case 'preview':
    return_result('<a href="/">点击预览</a>', true);
    break;
  case 'save':
    return_result('', true);
    break;
}


function return_result($data, $status, $type = 'json'){
  $result = array(
    'status' => $status,
    'data' => $data
  );

  // json
  if ($type == 'json') {
    header("Content-type: application/json");
    echo json_encode($result);
    die();
  }

  // html
  $string = $CI->load->view('common/msg.html', $result, TRUE);
  echo $string;
  die();
}
