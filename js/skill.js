
/*
 *Time：2017/8/28
 *Author：MrZhj
 *Name：放大镜插件(兼容IE8及以上)
*/

var minpho = document.getElementById("min_pho");
var maxpho = document.getElementById("max_pho");
var silder = document.getElementById("silder");
var maxImg = document.getElementById("big_pic");
var imgBox = document.getElementById("img-box");

//获取imgBox的marginleft与margintop
function getStyle(node){
	var style = null;
	
	if (window.getComputedStyle) {
		style = window.getComputedStyle(node, null);
		//非ie所支持的获取非行间样式的方法
	} else{
		style = node.currentStyle;
		//ie所支持的获取非行间样式的方法
	}
	return style;
}
var mark = getStyle(minpho);
var minLeft = parseInt(mark.marginLeft);
var minTop = parseInt(mark.marginTop);

//左侧小图
minpho.onmouseenter = function(){
	maxpho.style.display = "block";
	silder.style.display = "block";
	document.onmousemove = function(e){
		var ev = e||window.event;
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var maxWidth = minpho.clientWidth - silder.offsetWidth;
		var maxHeight = minpho.clientHeight - silder.offsetHeight;
		var x  = ev.clientX - imgBox.offsetLeft - silder.offsetWidth/2-minLeft;
		var y  = ev.clientY - imgBox.offsetTop - silder.offsetHeight/2-minTop+scrollTop;
		if (x >= maxWidth) {
			x = maxWidth;
		} else if (x <= 0){
			x = 0;
		}
		if (y >= maxHeight) {
			y = maxHeight;
		}else if(y <= 0){
			y = 0;
		}

		//右侧大图
		var percentX = x / maxWidth;
		var percentY = y / maxHeight;
		maxImg.style.left = -percentX * (maxImg.clientWidth - maxpho.offsetWidth) + "px";
		maxImg.style.top = -percentY * (maxImg.clientHeight - maxpho.offsetHeight) + "px";

		//slider
		silder.style.left = x + minLeft + "px";
		silder.style.top = y + minTop + "px";
	}
}
minpho.onmouseleave = function(){
	maxpho.style.display = "none";
	silder.style.display = "none";
}