<?php
	// $comType=$_GET["comdata"];
	// $comdata = array();
	// $dir = opendir($comType);
	// while(($file = readdir($dir))!=false){
	// 	$ns = explode('.', $file);
	// 	if ($file!="." && $file!=".." && $ns[1]=="xml") { 
	// 		$doc = new DOMDocument(); 
	// 		$doc -> load($comType.'/'.$ns[0].'.xml');
	// 		$coms = $doc->getElementsByTagName( "com" );
	// 		$name = $ns[0];
	// 		foreach( $coms as $com ) 
	// 		{ 
	// 			$intros = $com->getElementsByTagName( "intro" );
	// 			$intro = $intros->item(0)->nodeValue;
	// 			// $images = $com->getElementsByTagName( "image" );
	// 			// $image = $images->item(0)->nodeValue;
	// 		} 
	// 		$temparray = array($name,$intro,$image);
	// 		array_push($comdata, $temparray);
	// 	} 
	// }
	// $rs="[";
	// foreach($comdata as $k=>$v)
	// {
	// 	$rs.='[';
	// 	foreach($v as $k=>$v){
	// 		$rs.='"'.$v.'",';
	// 	}
	// 	$rs.='],';
	// }
	// $rs.=']';
	// $rs=str_replace(',]',']',$rs);
	// echo $rs;
	// closedir($dir);

$type=$_GET["type"];
$dirlist=getDir($type);
$returndata="[";
foreach($dirlist as $k=>$v){
	$returndata.="{type:'".$type."',name:'".$v."'";
	if(file_exists($type.'/'.$v.'/intro.json')){
		$json = file_get_contents($type.'/'.$v.'/intro.json');
		$json = json_decode($json);
		foreach($json as $task){
			$returndata.=",intro:'".$task->intro."'";
			if($task->response){
				$returndata.=",response:true";
			}
			else{
				$returndata.=",response:false";
			}
			if($task->css3){
				$returndata.=",css3:true";
			}
			else{
				$returndata.=",css3:false";
			}
		}
	}
	if(file_exists($type.'/'.$v.'/style.css')){
		$returndata.=",usestyle:true";
	}
	else{
		$returndata.=",usestyle:false";
	}
	if(file_exists($type.'/'.$v.'/_config.scss')){
		$returndata.=",usesass:true";
	}
	else{
		$returndata.=",usesass:false";
	}
	if(file_exists($type.'/'.$v.'/control.js')){
		$returndata.=",usejs:true";
	}
	else{
		$returndata.=",usejs:false";
	}
	if(file_exists($type.'/'.$v.'/icon.png')){
		$returndata.=",hasicon:true";
	}
	else{
		$returndata.=",hasicon:false";
	}
	$returndata.="},";
}
$returndata.="]";
$returndata=str_replace(',]',']',$returndata);
echo $returndata;
//获取文件目录列表,该方法返回数组
function getDir($dir) {
    $dirArray[]=NULL;
    if (false != ($handle = opendir ( $dir ))) {
        $i=0;
        while ( false !== ($file = readdir ( $handle )) ) {
            //去掉"“.”、“..”以及带“.xxx”后缀的文件
            if ($file != "." && $file != ".." && !strpos($file,".") && $file != ".DS_Store") {
                $dirArray[$i]=$file;
                $i++;
            }
        }
        //关闭句柄
        closedir ( $handle );
    }
    return $dirArray;
}
//获取文件列表
function getFile($dir) {
    $fileArray[]=NULL;
    if (false != ($handle = opendir ( $dir ))) {
        $i=0;
        while ( false !== ($file = readdir ( $handle )) ) {
            //去掉"“.”、“..”以及带“.xxx”后缀的文件
            if ($file != "." && $file != ".." && strpos($file,".") ) {
                $fileArray[$i]=$file;
                if($i==100){
                    break;
                }
                $i++;
            }
        }
        //关闭句柄
        closedir ( $handle );
    }
    return $fileArray;
}
?>