<?php
	require 'config.php';
	
	$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
	
	$query = mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}'")or die("SQL 错误");

	if(mysql_fetch_array($query,MYSQL_ASSOC)){	//找到数据了就返回真
		
	}
	
	echo mysql_affected_rows();
	
	mysql_close();
?>