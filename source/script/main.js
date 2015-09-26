funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		var buttons = funk.retrieveClass('nav-button');
		var homeButton = buttons[0];
		var projectButton = buttons[1];
		var projectMenu = '';
		
		funk.ajax('GET','/source/page/nav/menu/project.html',null,function(response) {
			projectMenu = response.text;
			
			projectButton.listen('mouseenter',function() {
				projectButton.innerHTML = "Project" + projectMenu;
			});
			
			projectButton.listen('mouseleave',function() {
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