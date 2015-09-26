var mfd = { 
	nav: { 
		buttons: { }, 
		menus: { } 
		open: function(menu) {
			funk.setAttribute(menu,'style','display:block;');
		}
		close: function(menu) {
			funk.setAttribute(menu,'style','display:none;');
		}
	}
}

if(pageType) { mfd.pageType = pageType; }
else { mfd.pageType = ''; }

funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		buttonList = funk.retrieveClass('nav-button');
		mfd.nav.buttons.home = buttonList[0];
		mfd.nav.buttons.projects = buttonList[1];
		
		menuList = funk.retrieveClass('nav-menu');
		mfd.nav.menu.projects = menuList[0];
		
		mfd.nav.buttons.projects.listen('mouseenter',function() {
			mfd.nav.open(mfd.nav.buttons.projects);
		})
		mfd.nav.buttons.projects.listen('mouseleave',function() {
			mfd.nav.close(mfd.nav.buttons.projects);
		})
		
		if(mfd.pageType) {
			switch(mfd.pageType) {
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