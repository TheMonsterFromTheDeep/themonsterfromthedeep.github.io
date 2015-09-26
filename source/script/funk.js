var test;

var funk = { };

if(Element.setAttribute) {
	funk.setAttribute = function(element,attribute,value) { element.setAttribute(attribute,value); }
}
else {
	funk.setAttribute = function(element,attribute,value) { element[attribute] = value; }
}

if(Element.getAttribute) {
	funk.getAttribute = function(element,attribute) { return element.getAttribute(attribute); }
}
else {
	funk.getAttribute = function(element,attribute) { return element[attribute]; }
}

funk.retrieveEveryElementChild = function(element) {
	if(element.nodeType != 1 && element.nodeType != 9) { return []; }
	if(!element.hasChildNodes()) { return []; }
	
	var all = [];
	
	var last = 0;
	
	for(var i = 0; i < element.children.length; i++) {
		all[last] = element.children[i]; last++;
		if(element.children[i].hasChildNodes()) {
			var toAdd = funk.retrieveEveryElementChild(element.children[i]);
			for(var j = 0; j < toAdd.length; j++) {
				all[last] = toAdd[j];
				last++;
			}
		}			
	}
	
	return all;
}

funk.retrieveAll = function() {
	if(document.getElementsByTagName) {
		var tagAll = document.getElementsByTagName('*');
		if(tagAll != null) {
			return tagAll;
		}
	}
	return funk.retrieveEveryElementChild(document);
}

if(document.getElementsByTagName) {
	funk.retrieveTag = function(tag) { return document.getElementsByTagName(tag); }
}
else {
	funk.retrieveTag = function(tag) {
		if(tag === '*') { return funk.retrieveAll(); }
		var all = funk.retrieveAll();
		
		var ret = [];
		for(var i = 0; i < all.length; i++) {
			if(all[i].tagName === tag.toUpperCase()) {
				ret[ret.length] = all[i];
			}
		}
		
		return ret;
	}
}

if(document.getElementById) {
	funk.retrieveId = function(id) { return document.getElementById(id); }
}
else {
	funk.retrieveId = function(id) {
		var all = funk.retrieveAll();
		for(var i = 0; i < all.length; i++) {
			if(funk.getAttribute(all[i],'id') === id) {
				return all[i];
			}
		}
		return null;
	}
}

if(document.getElementsByClassName) {
	funk.retrieveClass = function(name) { return document.getElementsByClassName(name); }
}
else {
	funk.retrieveClass = function(name) {
		var all = funk.retrieveAll();
		
		var ret = [];
		for(var i = 0; i < all.length; i++) {
			if(funk.getAttribute(all[i],'class') === name) {
				ret[ret.length] = all[i];
			}
		}
		
		return ret;
	}
}

funk.listen = function(elem,evt,handler) {
	if(elem.addEventListener) {
		elem.addEventListener(evt,handler,false);
	}
	else if(elem.attachEvent) {
		elem.attachEvent(evt,handler);
	}
	else if(elem.setAttribute) {
		elem.setAttribute('on' + evt,handler);
	}
	else {
		elem['on' + evt] = handler;
	}
}

Element.prototype.listen = function(evt,handler) {
	funk.listen(this,evt,handler);
}

funk.ajax = function(requestType,url,data,handler) {
	var request;
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else {
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	request.open(requestType,url,true);
	
	request.onreadystatechange = function() {
		var response = { text: request.responseText, state: request.readyState, code: request.status };
		handler(response);
	}
	
	request.send(data);
}