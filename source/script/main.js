var buttons = { };
var homeButton;
var projectButton;
var projectMenu;

funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		buttonList = funk.retrieveClass('nav-button');
		homeButton = buttonList[0];
		projectButton = buttonList[1];
		projectMenu = '';
		
		buttons = { home: homeButton, project: projectButton };
		
		funk.ajax('GET','/source/page/nav/menu/project.html',null,function(response) {
			projectMenu = response.text;
			
			projectButton.listen('mouseenter',function() {
				projectButton.innerHTML = '<a class="nav-text" href="/misc/projects">Projects</a>' + projectMenu;
			});
			
			projectButton.listen('mouseleave',function() {
				projectButton.innerHTML = '<a class="nav-text" href="/misc/projects">Projects</a>';
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