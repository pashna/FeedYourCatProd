define(function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;__fest_buf+=("<audio src=\"sound\/score.wav\" id=\"score-sound\"></audio><div class=\"game-play\"><div class=\"toolbar toolbar_float_left\"><p><a href=\"#\" class=\"toolbar__button\" id=\"game-screen__back\">Back</a></p></div><div class=\"warning\"><div class=\"warning__massage\" id=\"warning\"></div></div><div class=\"token\"><div class=\"token__text\">Your token to play:</div><div id=\"token\" class=\"token__text_x2\"></div><div class=\"token__text\">Enter it on your smartphone</div></div><div class=\"content content_width_xl\"><div class=\"game-screen\"><div class=\"win-menu\" id=\"win\"><p><div class=\"win-menu__text\">Perfect!...</div></p><p><div class=\"win-menu__text_x1\">...But your cat wanna eat more!</div></p><p><div><img src=\"img\/star.png\" class=\"win-menu__star\" id=\"1_star\"/><img src=\"img\/star.png\" class=\"win-menu__star\" id=\"2_star\"/><img src=\"img\/star.png\" class=\"win-menu__star\" id=\"3_star\"/></div></p><p><div class=\"toolbar__button\" id=\"replay-button_win\">Replay</div><div class=\"toolbar__button\" id=\"next-level\">Next Level</div></p></div><canvas id=\"draw\" width=\"1000\" height=\"600\" class=\"game-screen__canvas\">:( Ваш браузер не может\n                 с нами играть.</canvas><img src=\"img\/sausage.png\" id=\"sausage\" class=\"game-screen__sausage\"/><img src=\"img\/1.png\" id=\"platform-img\" class=\"game-screen__platform\"/><div id=\"cat\"><img src=\"img\/cat_left.png\" id=\"cat_left\"/><img src=\"img\/cat_right.png\" id=\"cat_right\"/></div></div><div id=\"1ose\" class=\"gameOverScreen\"></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });