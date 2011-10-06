(function() {

var defaultURL = 'http://mattkersley.com';

// Load the url into the requested iframe
function loadPage(url, frame) {
	// If the url does not start with http, https, or file, then add http
	if ( url.substr(0,4) !== 'http' && url.substr(0,5) !== 'https' && url.substr(0,4) !== 'file' ) {
		// If the url somehow ended up as http:////, fix it.
		url = ('http://'+url).replace('////', '//');
  }

	// Grab all the iframes. If an iframe changes, change the others as well
	$('iframe').not(frame).attr('src', url).load(function() {
		// Update the window hash to accurately portray whats being shown
		document.location.hash = url;
		var u;  
		    try{
      u = $this.contents().get(0).location;
    } catch(e) {
    }


		console.log( u );
	});
}


$(document).ready(function(){
  // Grab the hash string, if there is one
	var query = document.location.hash.substr(1) || false;
   
	// Load the initial page query. Start with the query string and fallback to the default
  if ( query ) {    
		$('#urlarea').val(query);
    loadPage(query);
  }
	else {
		loadPage(defaultURL);
	}

	// Toggle between emulated device widths and fixed height
  $('#accurate').change(function() {
		$('#frames').toggleClass('widthOnly');
  });

	// Fake the form submission. Grab the value and load that into the iframes
  $('form').submit(function(e) {
		var url = $('#urlarea').val();
		e.preventDefault();
    loadPage( url );
  });
	
});

})();
