// ==UserScript==
// @name         简书 Markdown 预览同步滚动
// @namespace    jianshu
// @include 	*://www.jianshu.com/writer*
// @version      0.1
// @description  使简书的在线 Markdown 编辑器具有输入和预览同步滚动的功能
// @author       BlindingDark
// @match        http://tampermonkey.net/documentation.php?ext=dhdg
// @grant        none
// ==/UserScript==
//
(function() {
    'use strict';
    // Your code here...
    //text mousetrap span6 preview
    function jQuery_start(){

	var txtMain;
	var spPreview;

	function tampermonkey_start(){

	    txtMain = $('.text.mousetrap')[0];
	    spPreview = $('.span6.preview')[0];

	    txtMain.onscroll=function(){ 
		spPreview.scrollTop = Math.round((txtMain.scrollTop + txtMain.clientHeight) * spPreview.scrollHeight / txtMain.scrollHeight - spPreview.clientHeight);
	    };

	    spPreview.onscroll=function(){
		txtMain.scrollTop = Math.round((spPreview.scrollTop + spPreview.clientHeight) * txtMain.scrollHeight  / spPreview.scrollHeight - txtMain.clientHeight);
	    };

	}



	function tampermonkey_wait(){

	    if ((txtMain = $('.text.mousetrap')[0])===undefined)	{    
		window.setTimeout(tampermonkey_wait,1000); 
	    } else {
		if ((spPreview = $('.span6.preview')[0])===undefined){
		    window.setTimeout(tampermonkey_wait,1000); 
		} else {
		    tampermonkey_start();
		}
	    }
	}


	tampermonkey_wait();

	//TODO 点击预览按钮重新设置监听


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
