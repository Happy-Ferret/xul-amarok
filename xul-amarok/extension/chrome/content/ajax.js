


function amarokCall(method, handler, data)
{
	var host = prefs.getCharPref("amarok.host"); 
	var port = prefs.getCharPref("amarok.port");
	var login = prefs.getCharPref("amarok.login");
	var passwd = prefs.getCharPref("amarok.passwd");
	
	var req = new XMLHttpRequest();

	req.open('POST', 'http://'+host+':'+port, true);
	req.handler = handler;
	
	req.onload = function(event) {

		var self = event.target;
		
		if (self.readyState == 4 && self.status != 200) {
			showError(self.status+" : "+self.statusText)
			return false;
		}
		
		response=self.responseXML;
		if (response) {
			eval( self.handler + '\(response\)');
			return true;
		}
		else return false;	
	}

	req.setRequestHeader('Authorization', 'Basic '+btoa(login+':'+passwd));
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	var query = 'method='+method;
	if (data) query += "&"+data;
    req.send(query);
}

