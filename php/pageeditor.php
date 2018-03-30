<?php
$type = $_POST['type'];
$config = ['res_path' => '../res'];

switch ($type) {
  case 'download_res':
    $res_uris = $_POST['res_uris'];
    foreach ($res_uris as $key => &$res_uri) {
      $url_a = parse_url($res_uri);
      $host = $url_a['host'];
      $path = $config['res_path'] . '/' . $url_a['host'] . dirname($url_a['path']);
      $file = basename($url_a['path']);
      
      // 建立连接
      $curl = curl_init();
      // 设置
      curl_setopt($curl, CURLOPT_URL, $res_uri);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
      // 发送
      $content = curl_exec($curl);
      //var_dump($content);
      // curl_exec函数可能返回布尔值 FALSE，但也可能返回等同于 FALSE 的非布尔值。请阅读 布尔类型章节以获取更多信息。应使用 === 运算符来测试此函数的返回值。
      if ($content !== false) {
        is_dir($path) || mkdir($path, 0777 , true) || die('创建文件夹失败');
        file_put_contents($path . '/' . $file, $content) || die('写入文件失败');
      }
      // 关闭
      curl_close($curl);
    }
    break;
}