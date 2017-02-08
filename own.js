(function(window){
    
    var own={};
    
    var MouseEvent=function(mouse){
        if(!(this instanceof MouseEvent)){
          return new MouseEvent(mouse);
        }
        this.lat=mouse.latLng.getLat();
        this.lng=mouse.latLng.getLng();
        this.point=mouse.point.toString().slice(1,-1).split(",");
    };
    
    MouseEvent.prototype.position=function(){
      return [this.lat,this.lng]; 
    };
    
    MouseEvent.prototype.point=function(){
        return [this.point[0],this.point[1]];
    };
    
    own.MouseEvent = MouseEvent;

    var EasyMap=function () {};

    EasyMap.markerMap = function (markers, map) {
      markers.forEach(function(ob){
        ob['map'](map);
      });
    };

    EasyMap.markerRemove = function(markers){
      markers.forEach(function(ob){
        ob['remove']();
      });
    };

    EasyMap.markerClickOpen = function (markers, overlay) {
      var markerLength = markers.length;
      if(Array.isArray(overlay) && markerLength === overlay.length){
        for(var i=0 ; i<markerLength ; i++){
          (function (marker, val) {
            marker.on('click', function(){
              val.open(marker);
            });
          }(markers[i], overlay[i]));
        }
      }
    };
    
    EasyMap.customOverlayOnClose= function(overlay,name){
      for(var i =0;i<overlay.length;i++){
        overlay[i]['onClose'](name+"["+i.toString()+"]");
      }
    };
    
    own.EasyMap=EasyMap;
    
    own.preventMap=function(){
      daum.maps.event.preventMap;
    };

    own.markerImage=function(options){
      return new daum.maps.MarkerImage(
        options.src,
        new daum.maps.Size(options.height, options.width),
        {
          offset: new daum.maps.Point(options.x,options.y),
          alt: options.alt,
          coords: options.coords,
          shape: options.shape,
          spriteOrigin: new daum.maps.Point(options.sX,options.sY),
          spriteSize: new daum.maps.Size(options.sHeight, options.sWidth)
        }
      );
    };
    
    var DaumMap=function(container,options){
        if(!(this instanceof DaumMap)){
          return new DaumMap(container,options);
        }
        options.mapTypeId=options.mapTypeId ? this.mapType(options.mapTypeId) : undefined;
        options.center=new daum.maps.LatLng(options.center[0],options.center[1]);
        this.map=new daum.maps.Map(container, options);
        this.roadViewOverlay=new daum.maps.RoadviewOverlay();
    };
    
    DaumMap.prototype.mapType=function(index){
        var mapTypeId={
          "ROADMAP" : daum.maps.MapTypeId.ROADMAP,
          "SKYVIEW" : daum.maps.MapTypeId.SKYVIEW,
          "HYBRID" : daum.maps.MapTypeId.HYBRID,
          1 : "ROADMAP",
          2 : "SKYVIEW",
          3 : "HYBRID"
        };
        
        return mapTypeId[index];
      };
    
    DaumMap.prototype.overlayMapType=function(index){
        var overlayMapType={
          "OVERLAY":daum.maps.MapTypeId.OVERLAY,
          "TRAFFIC":daum.maps.MapTypeId.TRAFFIC,
          "TERRAIN":daum.maps.MapTypeId.TERRAIN,
          "BICYCLE":daum.maps.MapTypeId.BICYCLE,
          "BICYCLE_HYBRID":daum.maps.MapTypeId.BICYCLE_HYBRID,
          "USE_DISTRICT":daum.maps.MapTypeId.USE_DISTRICT
        };
        
        return overlayMapType[index];
      };
      
    DaumMap.prototype.controlPosition=function(index){
        var positions={
          "TOP": daum.maps.ControlPosition.TOP,
          "TOPLEFT":daum.maps.ControlPosition.TOPLEFT,
          "TOPRIGHT":daum.maps.ControlPosition.TOPRIGHT,
          "LEFT":daum.maps.ControlPosition.LEFT,
          "RIGHT":daum.maps.ControlPosition.RIGHT,
          "BOTTOMLEFT":daum.maps.ControlPosition.BOTTOMLEFT,
          "BOTTOM":daum.maps.ControlPosition.BOTTOM,
          "BOTTOMRIGHT":daum.maps.ControlPosition.BOTTOMRIGHT
        };
        
        return positions[index];
      };
    
    DaumMap.prototype.center=function(position){
      if(position){
        this.map.setCenter(new daum.maps.LatLng(position[0], position[1]));
        return this;
      }
      else{
        return [this.map.getCenter().lat, this.map.getCenter().lng];
      }
    };
    
    DaumMap.prototype.level= function(level, options){
      if(level){
        this.map.setLevel(level, options);
        return this;
      }
      else{
        return this.map.getLevel();
      }
    };
    
    DaumMap.prototype.mapTypeId= function(name){
      if(name){
        this.map.setMapTypeId(this.mapType(name));
        return this;
      }
      else{
        var mapId=this.map.getMapTypeId();
        return this.mapType(mapId);
      }
    };
    
    DaumMap.prototype.bound= function(options){
      if(options.position1&&options.position2){
        this.map.setBounds(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.position1[0],options.position1[1]), new daum.maps.LatLng(options.position2[0],options.position2[1])),
          options.paddingTop,
          options.paddingRight,
          options.paddingBottom,
          options.paddingLeft
        );
      }
      else if(options.marker1&&options.marker2){
        var m1posi=options.marker1.position();
        var m2posi=options.marker2.position();
        this.map.setBounds(new daum.maps.LatLngBounds(new daum.maps.LatLng(m1posi[0],m1posi[1]),new daum.maps.LatLng(m2posi[0],m2posi[1])),
          options.paddingTop,
          options.paddingRight,
          options.paddingBottom,
          options.paddingLeft
        );
      }
      else{
        var mapBound=this.map.getBounds();
        var sw=mapBound.getSouthWest();
        var ne=mapBound.getNorthEast();
  
        return [[sw.getLat(),sw.getLng()],[ne.getLat(),ne.getLng()]];
      }
      return this;
    };
    
    DaumMap.prototype.pan = function(options){
      if(options.x&&options.y){
        this.map.panBy(options.x,options.y);
      }
      else if(options.position1&&options.position2){
        this.map.panTo(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.position1[0],options.position1[1]), new daum.maps.LatLng(options.position2[0],options.position2[1])));
      }
      else{
        this.map.panTo(new daum.maps.LatLng(options.position[0], options.position[1]));
      }
      return this;
    };
    
    DaumMap.prototype.addControl= function(control,position){
      var con= control ==='TYPE' ? new daum.maps.MapTypeControl() : new daum.maps.ZoomControl();
      this.map.addControl(con,this.controlPosition(position));
      return this;
    };
    
    DaumMap.prototype.removeControl = function(control,position){
      var con= control ==='TYPE' ? new daum.maps.MapTypeControl() : new daum.maps.ZoomControl();
      this.map.removeControl(con,this.controlPosition(position));
      return this;
    };
    
    DaumMap.prototype.draggable = function(bool){
      if(bool){
        this.map.setDraggable(bool);
        return this;
      }
      else{
        return this.map.getDraggable();
      }    
    };
    
    DaumMap.prototype.zoomable = function(bool){
      if(bool){
        this.map.setZoomable(bool);
        return this;
      }
      else{
        return this.map.getZoomable();
      }
    };
    
    DaumMap.prototype.relayout = function(){
      this.map.relayout();
      return this;
    };
    
    DaumMap.prototype.addOverlayMapTypeId = function(name){
      this.map.addOverlayMapTypeId(this.overlayMapType(name));
      return this;
    };
    
    DaumMap.prototype.removeOverlayMapTypeId = function(name){
      this.map.removeOverlayMapTypeId(this.overlayMapType(name));
      return this;
    };
    
    DaumMap.prototype.keyboardShortcuts = function(bool){
      if(bool){
        this.map.setKeyboardShortcuts(bool);
        return this;
      }
      else{
        return this.map.getKeyboardShortcuts();
      }
    };
    
    DaumMap.prototype.on = function(event,func){
      daum.maps.event.addListener(this.map, event,func);
      return this;
    };
    
    DaumMap.prototype.trigger = function(event,data){
      daum.maps.event.trigger(this.map, event,data);
      return this;
    };
    
    DaumMap.prototype.off = function(event,func){
      daum.maps.event.removeListener(this.map,event,func);
      return this;
    };
    
    DaumMap.prototype.addRoadViewOverlay = function(){
      this.roadViewOverlay.setMap(this.map);
      return this;
    };
    
    DaumMap.prototype.removeRoadViewOverlay = function(){
      this.roadViewOverlay.setMap(null);
      return this;
    };
    
    own.DaumMap=DaumMap;
    
    var Marker=function(options){
        if(!(this instanceof Marker)){
            return new Marker(options);
        }
        this.daumMap=null;
        options.position= options.position ? new daum.maps.LatLng(options.position[0],options.position[1]) : new daum.maps.Viewpoint(options.pan,options.tilt,options.zoom,options.panoId);
        if(options.map){
          this.daumMap=options.map;
          options.map=this.daumMap.map;
        }
        this.marker=new daum.maps.Marker(options);
    };
    
    Marker.prototype.map = function(daumMap){
      if(daumMap){
        this.marker.setMap(daumMap.map);
        this.daumMap=daumMap;
        return this;
      }
      else{
        return this.daumMap;
      }
    };
    
    Marker.prototype.remove = function(){
      this.marker.setMap(null);
      this.daumMap=null;
      return this;
    };
    
    Marker.prototype.image = function(image){
      if(image){
        this.marker.setImage(image);
        return this;
      }
      else{
        return this.marker.getImage();
      }
    };
    
    Marker.prototype.position = function(options){
      if(!options){
        var position=this.marker.getPosition();
        return [position.getLat(),position.getLng()];
      }
      else if(options.position){
        this.marker.setPosition(new daum.maps.LatLng(options.position[0],options.position[1]));
      }
      else if(options.pan&&options.tilt){
        this.marker.setPosition(new daum.maps.Viewpoint(options.pan,options.tilt,options.zoom,options.panoId));
      }
      return this;
    };
    
    Marker.prototype.zIndex = function(num){
      if(num){
        this.marker.setZIndex(num);
        return this;
      }
      else{
        return this.marker.getZIndex();
      }
    };
    
    Marker.prototype.visible = function(bool){
      if(bool){
        this.marker.setVisible(bool);
        return this;
      }
      else{
        return this.marker.getVisible();
      }
    };
    
    Marker.prototype.title = function(title){
      if(title){
        this.marker.setTitle(title);
        return this;
      }
      else{
        return this.marker.getTitle();
      }
    };
    
    Marker.prototype.draggable = function(bool){
      if(bool){
        this.marker.setDraggable(bool);
        return this;
      }
      else{
        return this.marker.getDraggable();
      }
    };
    
    Marker.prototype.clickable = function(bool){
      if(bool){
        this.marker.setClickable(bool);
        return this;
      }
      else{
        return this.marker.getClickable(bool);
      }
    };
    
    Marker.prototype.altitude = function(num){
      if(num){
        this.marker.setAltitude(num);
        return this;
      }
      else{
        return this.marker.getAltitude();
      }
    };
    
    Marker.prototype.range = function(num){
      if(num){
        this.marker.setRange(num);
        return this;
      }
      else{
        return this.marker.getRange();
      }
    };
    
    Marker.prototype.opacity = function(num){
      if(num){
        this.marker.setOpacity(num);
        return this;
      }
      else{
        return this.marker.getOpacity();
      }
    };
    
    Marker.prototype.on = function(event,func){
      daum.maps.event.addListener(this.marker,event,func);
      return this;
    };
    
    Marker.prototype.trigger = function(event,data){
      daum.maps.event.trigger(this.marker,event,data);
      return this;
    };
    
    Marker.prototype.off = function(event,func){
      daum.maps.event.removeEventListener(this.marker,event,func);
      return this;
    };
    
    own.Marker=Marker;
    
    var InfoWindow=function(options){
      if(!(this instanceof InfoWindow)){
          return new InfoWindow(options);
      }
      this.daumMap=null;
      options.position=new daum.maps.LatLng(options.position[0], options.position[1]);
      if(options.map){
        this.daumMap = options.map;
        options.map = this.daumMap.map;
      }
      this.infowindow=new daum.maps.InfoWindow(options);
    };
    
    InfoWindow.prototype.open = function(marker){
      if(marker){
        this.infowindow.open(marker.map().map, marker.marker);
        this.daumMap = marker.map();
        return this;
      }
    };
    
    InfoWindow.prototype.close = function(){
      this.infowindow.close();
      return this;
    };
    
    InfoWindow.prototype.map = function(){
      return this.daumMap;
    };
    
    InfoWindow.prototype.position = function(position){
      if(position){
        this.infowindow.setPosition(new daum.maps.LatLng(position[0],position[1]));
        return this;
      }
      else{
        var latlng=this.infowindow.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    };
    
    InfoWindow.prototype.content = function(value){
      if(value){
        this.infowindow.setContent(value);
        return this;
      }
      else{
        return this.infowindow.getContent();
      }
    };
    
    InfoWindow.prototype.zIndex = function(value){
      if(value){
        this.infoWindow.setZIndex(value);
        return this;
      }
      else{
        return this.infowindow.getZIndex();
      }
    };
    
    InfoWindow.prototype.altitude = function(value){
      if(value){
        this.infowindow.setAltitude(value);
        return this;
      }
      else{
        return this.infowindow.getAltitude();
      }
    };
    
    InfoWindow.prototype.range = function(value){
      if(value){
        this.infowindow.setRange(value);
        return this;
      }
      else{
        return this.infowindow.getRange();
      }
    };
    
    own.InfoWindow = InfoWindow;
    
    var CustomOverlay=function(options){
      if(!(this instanceof CustomOverlay)){
          return new CustomOverlay(options);
      }
      this.daumMap=null;
      if(options.map){
        this.daumMap=options.map;
        options.map=this.daumMap.map;
      }
      if(options.position){
          options.position=new daum.maps.LatLng(options.position[0],options.position[1]);
      }
      this.div=document.createElement('div');
      this.div.innerHTML=options.content;
      options.content=this.div;
      this.customoverlay=new daum.maps.CustomOverlay(options);
    };
    
    CustomOverlay.prototype.open = function(marker){
      var position=marker.position();
      this.customoverlay.setPosition(new daum.maps.LatLng(position[0],position[1]));
      this.map(marker.map());
      return this;
    };
    
    CustomOverlay.prototype.map = function(value){
      if(value){
        this.customoverlay.setMap(value.map);
        this.daumMap=value;
        return this;
      }
      else{
        return this.daumMap;
      }
    };
    
    CustomOverlay.prototype.onClose = function(name){
      var totalContent = this.content();
      var content = totalContent;
      var length = 0;
      while(1){
        var point = content.indexOf("class");
        if(point === -1){
          break;
        }
        var dot=content[point+6];
        var lastDot=content.slice(point+7).indexOf(dot)+point+7;
        if (content.slice(point+7,lastDot).indexOf("close")!==-1){
          totalContent=totalContent.slice(0,length+lastDot+1)+"onclick='"+name+".close()'"+totalContent.slice(length+lastDot+1);
          this.content(totalContent);
          break;
        }
        length+=content.slice(0,lastDot+1).length;
        content=content.slice(lastDot+1);
      }
      return this;
    };

    CustomOverlay.prototype.close = function(){
      this.customoverlay.setMap(null);
      return this;
    };
    
    CustomOverlay.prototype.position = function(position){
      if(position){
        this.customoverlay.setPosition(new daum.maps.LatLng(position[0],position[1]));
        return this;
      }
      else{
        var latlng=this.customoverlay.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    };
    
    CustomOverlay.prototype.content = function(value){
      if(value){
        this.div.innerHTML=value;
        return this;
      }
      else{
        return this.div.innerHTML;
      }
    };
    
    CustomOverlay.prototype.zIndex = function(value){
      if(value){
        this.customoverlay.setZIndex(value);
        return this;
      }
      else{
        return this.customoverlay.getZIndex();
      }
    };
    
    CustomOverlay.prototype.altitude = function(value){
      if(value){
        this.customoverlay.setAltitude(value);
        return this;
      }
      else{
        return this.customoverlay.getAltitude();
      }
    };
    
    CustomOverlay.prototype.range = function(value){
      if(value){
        this.customoverlay.setRange(value);
        return this;
      }
      else{
        return this.customoverlay.getRange();
      }
    };
    
    CustomOverlay.prototype.on = function(name,func){
      this.div.addEventListener(name, func);
      return this;
    };
    
    CustomOverlay.prototype.off = function(name,func){
      this.div.removeEventListener(name,func);
      return this;
    };
    
    own.CustomOverlay=CustomOverlay;
    
    var DaumRoadView=function(container, options){
        if(!(this instanceof DaumRoadView)){
            return new DaumRoadView(container, options);
        }
        this.roadView = new daum.maps.Roadview(container, options);
        this.roadviewClient = new daum.maps.RoadviewClient();
    };
    
    DaumRoadView.prototype.map = this.roadView;
    
    DaumRoadView.prototype.panoId = function(options){
        if(options){
            this.roadView.setPanoId(options.panoId, new daum.maps.LatLng(options.position[0], options.position[1]));
            return this;
        }
        else{
            return this.roadView.getPanoId();
        }
    };
    
    DaumRoadView.prototype.viewPoint=function(options){
        if(options){
            this.roadView.setViewpoint(options);
            return this;
        }
        else{
            return this.roadView.getViewpointWithPanoId();
        }
    };
    
    DaumRoadView.prototype.position=function(options){
        if(options){
            var posi=new daum.maps.LatLng(options.position[0],options.position[1]);
            var road=this.roadView;
            this.roadviewClient.getNearestPanoId(posi, options.radius||50, function(panoId){
                road.setPanoId(panoId,posi);
            });
            return this;
        }
        else{
            var position = this.roadView.getPosition();
            return [position.getLat(), position.getLng()];
        }
    };
    
    DaumRoadView.prototype.relayout=function(){
        this.roadView.relayout();
        return this;
    };
    
    DaumRoadView.prototype.on = function(event,func){
        daum.maps.event.addListener(this.roadView, event,func);
    };
    
    DaumRoadView.prototype.off = function(event,func){
        daum.maps.event.removeListener(this.roadView,event,func);
    };
    
    DaumRoadView.prototype.trigger = function(event,func){
        daum.maps.event.trigger(this.roadView,event,func);
    };
    
    own.DaumRoadView = DaumRoadView;
    
    window.own=own;

})(this);