document.addEventListener('DOMContentLoaded', function () {
    console.log("Verbosify popup!");

	var range = document.querySelector('input'),
		currentProbNode = document.querySelector('span');

	range.addEventListener('input', function () {
	  currentProbNode.innerHTML = range.value;
	}, false);

    document.querySelector('button').addEventListener('click', runVerbosify);      
});

function runVerbosify() {
	var currentProbNode = document.querySelector('span');
    var currentProb = parseFloat(currentProbNode.innerHTML)/100.0;
    console.log("Verbosify clicked!")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {'prob':currentProb}, function(response) {
		  console.log('Verbosified!');
	    });
    }); 
}

