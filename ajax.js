/*
function createXHR(){				//创建一个对象
	if(typeof XMLHttpRequest != 'undefined'){	//高版本浏览器
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != 'undefined'){	//低版本浏览器
		var version = [			//版本
			'MSXML2.XMLHttp.6.0',
			'MSXML2.XMLHttp.3.0',
			'MSXML2.XMLHttp',
		];
		for(var i=0;version.length;i++){
			try{
				return new ActiveXObject(version[i]);				
			}catch(e){
				
			}			
		}
		
	}else{
		throw new Error("您的系统或系统不支持XHR对象");
	}	
}

//名值对转换成字符串
function params(data){
	var arr = [];
	for(var i in data){	//i可以的到name;data[i]可以得到value
		arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));	//encodeURIComponent进行编码
	}
	//alert(arr);		//name=Lee,age=100需要把,换成&
	return arr.join('&');	//join默认查找,转换成自定义符号
}
*/
//封装AJAX
function ajax(obj){			
	var xhr = (function(){
		if(typeof XMLHttpRequest != 'undefined'){	//高版本浏览器
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != 'undefined'){	//低版本浏览器
			var version = [			//版本
				'MSXML2.XMLHttp.6.0',
				'MSXML2.XMLHttp.3.0',
				'MSXML2.XMLHttp',
			];
			for(var i=0;version.length;i++){
				try{
					return new ActiveXObject(version[i]);				
				}catch(e){
					
				}			
			}
			
		}else{
			throw new Error("您的系统或系统不支持XHR对象");
		}
	})();						//createXHR自定义函数。创建跨浏览器XHR对象
	obj.url = obj.url + '?rand='+Math.random();	//加随机数，不然IE默认调用缓存
	//obj.data = params(obj.data);				//名值对转换成字符串params自定义函数
	obj.data = (function(data){
		var arr = [];
		for(var i in data){	//i可以的到name;data[i]可以得到value
			arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));	//encodeURIComponent进行编码
		}
		//alert(arr);		//name=Lee,age=100需要把,换成&
		return arr.join('&');	//join默认查找,转换成自定义符号		
	})(obj.data);
	 if(obj.method === 'get'){					//post需要使用系统指定send函数，在下面
		if(obj.url.indexOf('?') == -1){		//查找url中的第一个？位置。如果没有找到就返回-1
			obj.url = obj.url+ '?' + obj.data;		//url中没有？就添加？
		}else{
			obj.url = obj.url+ '&' + obj.data;		//url中有问好就使用&来链接
		}
		obj.url = obj.url + '&' + obj.data;
	 }
	 
	if(obj.async === true){//异步使用
		xhr.onreadystatechange = function(){		//当请求被发送到服务器时,需要执行一些基于响应的任务。每当 readyState 改变时，就会触发 onreadystatechange 事件。
			if(xhr.readyState == 4){	//从 0 到 4 发生变化,4表示请求已完成，且响应已就绪
				callAsync();
			}
		}
	}

	xhr.open(obj.method,obj.url,obj.async);					//准备请求
	if(obj.method === 'post'){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");	//按照手册里面设置的。就是修改请求的头部信息，来模拟post提交。
		xhr.send(obj.data);
	}else{
		xhr.send(null);
	}
	
	if(obj.async === false){	//同步使用，需要等上面信息处理完才来执行
		callAsync();
	}
	
	function callAsync(){			//async表示同步、异步
		if(xhr.status == 200){		//200: "OK";404: 未找到页面
			obj.success(xhr.responseText);//responseText获得字符串形式的响应数据。
		}else{
			alert("获取数据错误。错误号："+xhr.status+'，错误信息：'+xhr.statusText);
		}
	}
}
/*
//调用AJAX
addEvent(document,'click',function(){
	ajax({
		method:'post',
		url:'demo.php',
		data:{
			'name':'Lee',
			'age':100,
		},		
		success:function(text){
			alert(text);			//需要显示的内容。内容直接在php中输出就行
		},
		async:false
	});
});
*/
/*
//作用域，无法返回
function a(){
	function b(){
		return 123;
	}
	return 456;
}
alert(a());		



*/












