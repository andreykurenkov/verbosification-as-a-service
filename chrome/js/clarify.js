function replaceText(node,prob) {
    var text = node.context.data;
	$.ajax({
	    url: 'http://lengthenitfor.me/verbosify',
	    type: 'post',
	    data: JSON.stringify({'text':text,'probability':prob}),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data) {
	           console.log("Text:"+ text + "\nData: " + data+"\n");
	           node.replaceWith(data['text']);
	    }});  
}

function verbosify(prob){
	textNodes = $('body').find(":not(iframe)").addBack().contents().filter(function() {
        return this.nodeType == 3 && /\S/.test(this.nodeValue);
    });
	textNodes.each(function(){
		replaceText($(this),prob);
	});
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Verbosifying!");
    verbosify(request.prob);
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
