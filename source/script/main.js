funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		funk.ajax('GET','/source/page/nav/menu/project.html',null,function(response) {
			var projectButton = funk.retrieveClass('nav-button')[1];
		
			projectButton.listen('mouseenter',function() {
				projectButton.innerHTML = "Project" + response.text;
			});
			
			projectButton.listen('mouseexit',function() {
				projectButton.innerHTML = "Project";
			});
		});
		
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