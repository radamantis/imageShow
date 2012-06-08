/*
 * imagesShow component 
 * @author: Radamantis Torres
 * @company: Appcelerator Inc.
 * @email: rtlechuga@appcelerator.com
 * 
 *  */

function imageShow(params){
    if(params.width)
        this.width = params.width;
    else
        this.width = 300;

    if(params.height)
        this.height = params.height;
    else
        this.height = 55;

    if(params.top)
        this.top = params.top;
    else
        this.top = 0;

    if(params.left)
        this.left = params.left;
    else
        this.left = 0;

    if(params.backgroundColor)
        this.backgroundColor = params.backgroundColor;
    else
        this.backgroundColor = '#ccc';

    if(params.backgroundImage)
        this.backgroundImage = params.backgroundImage;
    else
        this.backgroundImage = null;
    if(params.images)
        this.images = params.images;
    else
        this.images = null;
    
    // tapping the image take us to the full screen view of the image
    this.mainView = Ti.UI.createView({
        width : this.width,
        height : this.height,
        top : this.top,
        left : this.left,
        backgroundColor : this.backgroundColor
    });
    //if the developer is passing an image for the background of the view, then, we set the image
    if(this.backgroundImage != null)
        this.mainView.backgroundImage = this.backgroundImage;
    // this is the container for the ribbon
    this.ribbonViewContainer = Ti.UI.createScrollView({
        width: this.width,
        left: 0,
        height: Math.floor(this.height/8),
        bottom:0,
        backgroundColor:'blue',
        contentWidth:'auto',
        contentHeight:Math.floor(this.height/8),
        layout: 'horizontal',
        verticalBounce:false,
        scrollType:'horizontal'
    });
    //build the images into the ribbon
    this.buildRibbon();
    var self = this;


    //Create the big Image container
    this.bigImageContainer = Ti.UI.createView({
        width:(this.width -((this.width/8)*2 )),
        height: ((this.height*3)/4),
        top:10,
        backgroundColor: 'red',
        id:null
    });
    //EVENTS
    this.clickRibbonEvent = function(_event){
        self.putImage(_event.source.image, _event.source.id, self);
    }
    //handle the events into the ribbon
    this.ribbonViewContainer.addEventListener('click', self.clickRibbonEvent);

    this.clickBigEvent = function(_event){
        if(_event.source.id != undefined){
            self.fullScreenImage(_event.source.backgroundImage, _event.source.id);
        }
    }
    this.bigImageContainer.addEventListener('click', self.clickBigEvent);

    //add
    this.mainView.add(this.bigImageContainer);
    this.mainView.add(this.ribbonViewContainer); 
}

//function to put the correct selected image into the bigcontainer
imageShow.prototype.putImage = function(image, index, self){
    Ti.API.info('the image is: '+image+' |the index is: '+index+' |self bigImageContainer? '+self.bigImageContainer.top);
    self.bigImageContainer.setBackgroundImage(image);
    //set the index to work with the listener into the bigContainer

    self.bigImageContainer.id = index;
    //move the ribbon indicator
}

imageShow.prototype.buildRibbon = function(){
    var length = this.images.length;
    //this.ribbonViewContainer.width = (45*length);
    //var path = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator + 'images'+ Ti.Filesystem.separator +dir;
    //var path = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator;
    //var imgDirectory = Ti.Filesystem.getFile(path);
    for(var i=0; i<length;i++){
        var imgView = Ti.UI.createImageView({
            image:this.images[i],
            height: Math.floor((this.height/8)-4),
            id: i,
            left:2,
            backgroundColor:'red'
        });
        Ti.API.info('height: '+imgView.height);
        this.ribbonViewContainer.add(imgView);
    }
}

imageShow.prototype.fullScreenImage = function(image, id){
    var fullWin = Ti.UI.createWindow({
        backgroundColor:'#336699',
        height:400,
        width:300,
        opacity:0.52,
        fullscreen:true,
    });

    var imageview = Ti.UI.createImageView({
        image:image

    });
    var closeButton = Ti.UI.createButton({
        title: 'Close',
        top: 10,
        width: 100,
        height: 50
    })
    closeButton.addEventListener('click', function(){
        fullWin.close();
        })
    fullWin.add(imageview);
    fullWin.open({
        modal:true
    })
    if(Ti.Platform.osname != 'android'){
        fullWin.setLeftNavButton(closeButton);
    }
    Ti.API.info(image+' | '+id);
}


        

module.exports = imageShow;