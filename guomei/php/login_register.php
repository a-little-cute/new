<?php
	
	header("Access-Control-Allow-Origin: *");
	include "public.php";
	//接口实现登录和注册功能
	$status = $_GET["status"];//参数控制登录还是注册功能
	$uname = $_GET["uname"];//接收用户名
	$upwd  = $_GET["upwd"];//接收密码
	$tel = isset( $_GET["tel"] )? $_GET["tel"] : "";
	if( $status == "login" ){
		//登录功能
//		if( $uname == "" ){
//			$sql = "select * from user where tel='$tel'";
//		}else{
			$sql = "select * from user where uname='$uname'";
//		}
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		if( $arr ){ //用户名存在
			if( $upwd == $arr["upwd"] ){
				echo 1;//登录成功
			}else{
				echo 2;//密码错误
			}
		}else{
			echo 0;//用户名不存在
		}
	}else if( $status == "register" ){
		//注册功能
		$sql = "insert into user(uname,upwd,tel) values('$uname','$upwd','$tel')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//注册成功
		}else{
			echo 0;//注册失败
		}
	}
	
	
	//接口：http://www.tuling123.com/openapi/api?key=2465e182e4154777a3a02da0ccaa6c88&userid=1&info="+txt.value
?>