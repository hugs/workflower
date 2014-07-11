var path = require('path');
var gui = require('nw.gui');
var win = gui.Window.get();

// Create the file menu
var file = new gui.Menu();

// Create the file menu options
var openMenuItem = new gui.MenuItem({ label:  "Open...\t\t⌘O" });

var checkWebsitesDemo = new gui.MenuItem({ label: "Check Websites" });
var examples = new gui.Menu();
examples.append(checkWebsitesDemo);
var examplesMenuItem = new gui.MenuItem({ label:  "Examples" });
examplesMenuItem.submenu = examples;

var separatorMenuItem = new gui.MenuItem({ type: 'separator' });
var closeMenuItem = new gui.MenuItem({ label: "Close\t\t⌘W" });

// Add the menu options to the file menu option
file.append(openMenuItem);
file.append(examplesMenuItem);
file.append(separatorMenuItem);
file.append(closeMenuItem);


// Create the view menu
var view = new gui.Menu();
// Create the view menu options
var reloadMenuItem = new gui.MenuItem({ label:  "Reload\t\t⌘R" });
// Add the menu option to the view menu option
view.append(reloadMenuItem);


// Create the menubar
win.menu = new gui.Menu({ type: 'menubar' });

// Attach file menu
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file}), 1);

// Attach view menu
win.menu.insert(new gui.MenuItem({ label: 'View', submenu: view}), 3);

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
    console.log("Open file!");
    chooseFile();
});

checkWebsitesDemo.on("click", function () {
  console.log("Check Websites!");
  //workflower.filePath = filePath;
  var demoFilePath = path.join(process.cwd(),
    'node_modules',
    'angelo',
    'workflows',
    'check-websites',
    'playlist.js'
  );
  workflower.filePath = demoFilePath;
  workflower.restart();  
});

closeMenuItem.on("click", function () {
    console.log("Close!");
    win.close();
});


chooser = document.querySelector("#fileDialog");
chooser.addEventListener("change", function(evt) {
  filePath = this.value;
  console.log(filePath);

  if (filePath.endsWith('playlist.js')) {
    console.log("Playlist!");
  }
  workflower.filePath = filePath;
  workflower.restart();

}, false);

chooseFile = function() {
  chooser.value = null;
  setTimeout(function() {
    chooser.click();
  }, 200);
}

function initScrolling() {
  jQuery(function( $ ){
  	/**
  	 * Most jQuery.localScroll's settings, actually belong to jQuery.ScrollTo, check it's demo for an example of each option.
  	 * @see http://flesler.demos.com/jquery/scrollTo/
  	 * You can use EVERY single setting of jQuery.ScrollTo, in the settings hash you send to jQuery.LocalScroll.
  	 */

  	// The default axis is 'y', but in this demo, I want to scroll both
  	// You can modify any default like this
  	$.localScroll.defaults.axis = 'xy';

  	/**
  	 * NOTE: I use $.localScroll instead of $('#navigation').localScroll() so I
  	 * also affect the >> and << links. I want every link in the page to scroll.
  	 */
  	$('#target_nav').localScroll({
  		target: '#content', // could be a selector or a jQuery object too.
  		queue:false,
  		duration:0,
  		hash:true,
  		onBefore:function( e, anchor, $target ){
  			// The 'this' is the settings object, can be modified
  		},
  		onAfter:function( anchor, settings ){
  			// The 'this' contains the scrolled element (#content)
  		}
  	});
  });
}

initScrolling();
$("#main").hide();

Angelo = require('angelo').Angelo;
var nodeBinaryPath = path.join(process.cwd(), 'bin', 'node');
workflower = new Angelo({
  nodeBinary: nodeBinaryPath,
  verbose: true
});

workflower.on('loaded', function() {
  var mainContent = template({
    playlists: this.playlists
  });
  $("#main").html(mainContent);
  $("#greeting").hide();
  $("#main").fadeIn();
  Prism.highlightAll();
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
  })
  initScrolling();
  $("#content").scrollTo('#'+workflower.playlists[0][1][0].id);
})

swig  = require('swig');
template = swig.compileFile('template/template.html');

$('.workflower-play').click(function() {
  workflower.play();
});

reloadMenuItem.on("click", function () {
    console.log("reload!");
    workflower.restart();
});