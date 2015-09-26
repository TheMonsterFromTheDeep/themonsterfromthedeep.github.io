var begin = function() { }

alert('retrieving document...');

window.onload = function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		begin();
	});
};