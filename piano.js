"use strict";
function PianoApp()
{
 	var version = "6.1",
 		audioManager = AudioManager("audio");
 		//alert(audioManager);
 	function setStatus(message)
 	{
 		$("#app>footer").text(message);
 	};

 	this.start = function()
 	{
 		initKeyboard();
 		loadAudio();
 		
 		$("#app>header").append(version);
 		setStatus("ready");
 	};
	function loadAudio()
	{
 		var count = 0,
 			loaded = 0,
 			error = false;

 		$(".keys .piano-key").each(function()
 		{
 			count++;
 			var noteName = escape($(this).data("note"));
 			audioManager.getAudio(noteName,
 				function()
 				{
 					if (error) return;
 					if (++loaded == count) setStatus("Ready.");
 					else setStatus("Loading " +
						Math.floor(100 * loaded / count) + "%");
 				},
 				function(audio)
 				{
 					error = true;
 					setStatus("Error loading: " + audio.src);
 					}
 			);
 		});
	};

	function initKeyboard()
	{
 		var $keys = $(".keys .piano-key");
 		if ($.isTouchSupported)
		{
 			$keys.touchstart(function(e) {
 			e.stopPropagation();
 			e.preventDefault();
 			keyDown($(this));
 		})
 		.touchend(function() { keyUp($(this)); })
 		}
 		else
 		{
 			//alert("I am here" + $keys);
 			$keys.mousedown(function() {
 			keyDown($(this));
 			return false;
 		})
 		.mouseup(function() { keyUp($(this)); })
 		.mouseleave(function() { keyUp($(this)); });
 		}
	};

	function keyDown($key)
	{
		
 		if (!$key.hasClass("down"))
 		{
 			//alert("I am here key class" + $key);
 			$key.addClass("down");
 			var noteName = $key.data("note");
 			//alert(noteName);
 			var audio = getAudio(escape(noteName));
 			//alert(audio.src)
 			audio.currentTime = 0;
 			audio.play();
 		}
	};

	function keyUp($key)
	{
 		$key.removeClass("down");
	};

	// function raga{
	// 	var ragas = {};

	// 	ragas.mohanamC = new Array("3C", "3D", "3E", "3G", "3A")
	// 	ragas.mohanamCsh = new Array("3C#", "3D#", "3", "3G#", "3A#")

	// 	var ragaName = window.prompt("Enter raga name")

	// };


};



$(function() {
 	window.app = new PianoApp();
 	window.app.start();
});