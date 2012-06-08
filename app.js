// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var win1 = Titanium.UI.createWindow();

var imageShow = require('imageShow');

var imgShow = new imageShow({
    width:300,
    height:390,
    top:15,
    left:15,
    backgroundColor: 'navy',
    images: ["KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_ui.png","KS_nav_views.png","paint.png"]
    
})
win1.add(imgShow.mainView);

win1.open();