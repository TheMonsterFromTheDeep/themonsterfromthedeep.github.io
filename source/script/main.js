var mfd = { 
	nav: { 
		buttons: { }, 
		menus: { },
		open: function(menu) {
			funk.setAttribute(menu,'style','display:block;');
		},
		close: function(menu) {
			funk.setAttribute(menu,'style','display:none;');
		}
	}
};

mfd.pageType = pageType;

funk.listen(window,'load',function() {
	funk.ajax('GET','/nav.html',null,function(response) {
		funk.retrieveId('nav-wrapper').innerHTML = response.text;
		
		var buttonList = funk.retrieveClass('nav-button');
		mfd.nav.buttons.home = buttonList[0];
		mfd.nav.buttons.projects = buttonList[1];
		mfd.nav.buttons.fun = buttonList[2];
		
		var menuList = funk.retrieveClass('nav-menu');
		mfd.nav.menus.projects = menuList[0];
		
		mfd.nav.buttons.projects.listen('mouseenter',function() {
			mfd.nav.open(mfd.nav.menus.projects);
		})
		mfd.nav.buttons.projects.listen('mouseleave',function() {
			mfd.nav.close(mfd.nav.menus.projects);
		})
		mfd.nav.close(mfd.nav.menus.projects);
		
		if(mfd.pageType) {
			switch(mfd.pageType) {
				case 'home':
					funk.setAttribute(mfd.nav.buttons.home,'class','nav-select');
					break;
				case 'project':
					funk.setAttribute(mfd.nav.buttons.projects,'class','nav-select');
					funk.setAttribute(mfd.nav.menus.projects,'class','nav-menu-select');
					break;
				case 'fun':
					funk.setAttribute(mfd.nav.buttons.fun,'class','nav-select');
					break;
			}
		}
	});
});