var gui = require('nw.gui');
var win = gui.Window.get();

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

win.on('close', function() {
  this.hide(); // Pretend to be closed already
  console.log("Workflower exiting...");
  if (process.hasOwnProperty('children')) {
    // console.log("Workflower child processes:");
    for (var key in process.children) {
      if (process.children.hasOwnProperty(key)) {
        // console.log('child: ' + process.children[key].pid);
        // console.log('  exitCode: ' + process.children[key].exitCode);
        // console.log('  killed: ' + process.children[key].killed);
        process.children[key].kill('SIGINT');
      }
    }
  }

  this.close(true);
});

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
    console.log("Playlist!");
  }

  $("#greeting").hide();
  $("#main").fadeIn();
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
  })
  $("#content").scrollTo("#top");

}, false);

chooseFile = function() {
    chooser.value = null;
    chooser.click();
}


