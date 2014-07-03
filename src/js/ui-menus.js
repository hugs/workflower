var gui = require('nw.gui');
var win = gui.Window.get();


var parse = require('./js/parse');
var exec = require('child_process').exec;

// Create the file menu
var file = new gui.Menu();

// Create the file menu options
var openMenuItem = new gui.MenuItem({ label:  "Open...\t\t⌘O" });
var separatorMenuItem = new gui.MenuItem({ type: 'separator' });
var closeMenuItem = new gui.MenuItem({ label: "Close\t\t⌘W" });

// Add the menu options to the file menu option
file.append(openMenuItem);
file.append(separatorMenuItem);
file.append(closeMenuItem);

// Create the menubar
win.menu = new gui.Menu({ type: 'menubar' });

// Attach file menu
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file}), 1);

openMenuItem.on("click", function () {
    console.log("open file!");
    chooseFile();
});

closeMenuItem.on("click", function () {
    console.log("close file!");
});


chooser = document.querySelector("#fileDialog");
chooser.addEventListener("change", function(evt) {
  filePath = this.value;
  console.log(filePath);  
  
  if (filePath.endsWith('playlist.js')) {
    console.log("Playlist!")            
    child = exec('bin/node bin/parse ' + filePath,
      function (error, stdout, stderr) {
        console.log('stdout:\n' + stdout);
        //console.log('stderr:\n' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });             
  }

  $("#greeting").hide();
  $("#main").fadeIn()
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh')
  })
  $("#content").scrollTo("#top")       
   
}, false);

chooseFile = function() {
    chooser.value = null;
    chooser.click();
}


