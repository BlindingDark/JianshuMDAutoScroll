// ==UserScript==
// @name         Jianshu MD AUTO Scroll
// @name:zh-CN   简书 Markdown 预览同步滚动
// @namespace    jianshu
// @include 	 *://www.jianshu.com/writer*
// @version      1.1
// @description  jianshu Markdown preview AUTO scroll
// @description:zh-CN  给简书的在线 Markdown 编辑器增加输入预览同步滚动的功能
// @author       BlindingDark
// @grant        none
// ==/UserScript==
//
(function() {
    'use strict';
    var spSwitchMain;//span7 main 切换的那个按钮所在的窗体
    var txtMain; //text mousetrap 输入框
    var spPreview;//span6 preview 预览框

    function scrollEvent(){
	// 如果0号输入框隐藏，就绑定到1号输入框
	if($('.text.mousetrap').is(":hidden")){
	    txtMain = $('.text.mousetrap')[1];
	}else{
	    txtMain = $('.text.mousetrap')[0];
	}

	spPreview = $('.span6.preview')[0];

	txtMain.onscroll=function(){ 
	    spPreview.scrollTop = Math.round((txtMain.scrollTop + txtMain.clientHeight) * spPreview.scrollHeight / txtMain.scrollHeight - spPreview.clientHeight);
	};

	spPreview.onscroll=function(){
	    txtMain.scrollTop = Math.round((spPreview.scrollTop + spPreview.clientHeight) * txtMain.scrollHeight  / spPreview.scrollHeight - txtMain.clientHeight);
	};
    }

    function addSwitchListener(){
	spSwitchMain = $('.span7.main')[0];
	spSwitchMain.onclick=function(){
	    scrollEvent();
	};
    }

    function tampermonkey_wait(){
	if((spSwitchMain = $('.span7.main')[0])===undefined){
	    window.setTimeout(tampermonkey_wait,1000); 
	}else{
	    if ((txtMain = $('.text.mousetrap')[0])===undefined)	{    
		window.setTimeout(tampermonkey_wait,1000); 
	    } else {
		if ((spPreview = $('.span6.preview')[0])===undefined){
		    window.setTimeout(tampermonkey_wait,1000); 
		} else {
		    addSwitchListener();
		    scrollEvent();
		}
	    }
	}
    }

    function jQuery_start(){
	tampermonkey_wait();
    }

    function Tampermonkey_jQuery_wait(){
	if(typeof jQuery == 'undefined') {
	    window.setTimeout(Tampermonkey_jQuery_wait,1000);
	    console.log("waiting for jQuery prepared");
	}
	else {
	    $ = jQuery;
	    console.log("jQuery ready");

	    jQuery_start();

	}

    }


    Tampermonkey_jQuery_wait();


})();
