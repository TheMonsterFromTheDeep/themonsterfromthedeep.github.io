var buttons = { };
var homeButton;
var projectButton;
var projectMenu;

var menu = { };

function open(button) {
	button.element.innerHTML = button.button + button.menu;
}

function close(button) {
	button.element.innerHTML = button.button;
}

funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		buttonList = funk.retrieveClass('nav-button');
		homeButton = buttonList[0];
		projectButton = buttonList[1];
		projectMenu = '';
		
		buttons = { home: homeButton, project: projectButton };
		
		menu = {
			project: { element: projectButton, button: '<a class="nav-text" href="/misc/projects">Projects</a>', menu: projectMenu }
		}
		
		funk.ajax('GET','/source/page/nav/menu/project.html',null,function(response) {
			projectMenu = response.text;
			
			projectButton.listen('mouseenter',function() {
				open(menu.project);
			});
			
			projectButton.listen('mouseleave',function() {
				close(menu.project);
			});
		});
		
		funk.retrieveId('nav-wrapper').listen('mouseleave',function() {
			close(menu.project);
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