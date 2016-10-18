 		
//    	mui.plusReady(
//    		function()
//    		{
//    		var scan=null;
//    		var Flash=true;
//    		var classObj=document.getElementsByClassName('startRecongize');
//    		for(i=0;i<classObj.length;i++){
//    			
//				classObj[i].onclick('tap',function(){
//    			scan = new plus.barcode.Barcode('barea');
//    			scan.onmarked=onmarked;
//    			scan.start();
//    	
//    				});
//			}
//    		
//    		
//    		document.getElementById('cancelScan').addEventListener('tap',function(){
//    			
//    			scan.cancel();
//    		});
//    		document.getElementById('setFlash').addEventListener('tap',function(){
//    			if (Flash){
//    				scan.setFlash(true);
//    				Flash=false;
//    				
//    			}else{
//    				scan.setFlash(false);
//    				Flash=true;
//    			}
//    			
//    		});
		mui.init();
		
		
	/*	mui.plusReady(function(){
         document.addEventListener('touchstart',startRecognize(),false);
         document.addEventListener('touchstart',cancelScan(),false);
         document.addEventListener('touchstart',setFlash(),false);
         });
		var scan=null;
    	var Flash=true;
      	function startRecognize() {
				scan = new plus.barcode.Barcode('barea');
				scan.onmarked = onmarked; 
				scan.start();
			}
      	function cancelScan() {
				scan.cancel();
			}
      	function setFlash() {
			if (Flash){
    				scan.setFlash(true);
    				Flash=false;
    				
    			}else{
    				scan.setFlash(false);
    				Flash=true;
    			}
		}
      	function onmarked(type,result){
      		var text="未知";
      		switch(type){
      			case plus.barcode.QR:
      			text="QR";
      			break;
      			case plus.barcode.EAN13:
      			text="EAN13";
      			break;
      			case plus.barcode.EAN8:
      			text="EAN8";
      			break;
      		}
      		alert("条码类型"+text+"\n条码内容"+result);
      	}	
		
      	
    */
   //第二种方法
   
  	 var ws=null,wo=null;
	var scan=null,domready=false;
// H5 plus事件处理
function plusReady(){
	if(ws||!window.plus||!domready){
		return;
	}
	// 获取窗口对象
	ws=plus.webview.currentWebview();
	wo=ws.opener();
	// 开始扫描
	ws.addEventListener('show',function(){
		scan=new plus.barcode.Barcode('barea');
	    scan.onmarked=onmarked;
	    scan.start();
	});
	// 显示页面并关闭等待框
    ws.show("pop-in");
    wo.evalJS("closeWaiting()");
    document.addEventListener('click',setFlash(),false);
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}
// 监听DOMContentLoaded事件
document.addEventListener("DOMContentLoaded",function(){
	domready=true;
	plusReady();
},false);

// 二维码扫描成功
function onmarked(type,result){
      		var text="未知";
      		switch(type){
      			case plus.barcode.QR:
      			text="QR";
      			break;
      			case plus.barcode.EAN13:
      			text="EAN13";
      			break;
      			case plus.barcode.EAN8:
      			text="EAN8";
      			break;
      		}
      		alert("条码类型"+text+"\n条码内容"+result);
      		mui.back();
      	}	
// 从相册中选择二维码图片 
function scanPicture() {
    plus.gallery.pick(function(path){
	    plus.barcode.scan(path,onmarked,function(error){
			plus.nativeUI.alert( "无法识别此图片" );
		});
    },function(err){
        plus.nativeUI.alert("Failed: "+err.message);
    });
}
//开启闪光灯
var Flash=true;
function setFlash() {
			if (Flash){
    				scan.setFlash(true);
    				Flash=false;
    				
    			}else{
    				scan.setFlash(false);
    				Flash=true;
    			}
		}