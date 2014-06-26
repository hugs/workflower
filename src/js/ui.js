$(function () {

  $(window).bind('click', function(event) {
        console.log('click!');
	});        
        
	$(window).bind('keydown', function(event) {
  		if(event.keyCode === 27) {
              // Escape key
  			document.getElementById("viewport").focus();
  		}            
      if (event.metaKey && event.keyCode==79) {
          // Command + O
          console.log ("Command + O");
          chooseFile("#fileDialog");
      }
      if (event.metaKey && event.keyCode==87) {
          // Command + W
          console.log ("Command + W");
          event.preventDefault()
      }         
	});

  $('#dev-tools').click(function(e) {
      win.showDevTools();
      e.preventDefault();// prevent the default anchor functionality
  });

	
});



