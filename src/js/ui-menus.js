var fs = require('fs');
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

openMenuItem.on("click", function () {
    console.log("open file!");
    chooseFile("#fileDialog");
});

closeMenuItem.on("click", function () {
    console.log("close file!");
});

chooseFile = function(name) {
    var chooser = document.querySelector(name);
    chooser.addEventListener("change", function(evt) {
      console.log(this.value);

      fs.readFile(this.value, 'utf8', function (err,data) {
          if (err) {
              return console.log(err);
          }
          $("#greeting").hide();
          $("#content").show();
          $("#content").text(data);
          $("#content").filePath = this.value;
          
      });      
    }, false);

    chooser.click();
}



