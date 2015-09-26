funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		var buttons = funk.retrieveClass('nav-button');
		var homeButton = buttons[0];
		var projectButton = buttons[1];
		
		funk.ajax('GET','/source/page/nav/menu/project.html',null,function(response) {
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
					funk.setAttribute(homeButton,'class','nav-select');
					break;
				case 'project':
					funk.setAttribute(projectButton,'class','nav-select');
					break;
			}
		}
	});
});