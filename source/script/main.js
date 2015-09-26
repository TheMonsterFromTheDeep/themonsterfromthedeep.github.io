funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		if(pageType) {
			switch(pageType) {
				case 'home':
					funk.setAttribute(funk.retrieveClass('nav-button')[0],'class','nav-select');
					break;
				case 'project':
					funk.setAttribute(funk.retrieveClass('nav-button')[1],'class','nav-select');
					break;
			}
		}
	});
});