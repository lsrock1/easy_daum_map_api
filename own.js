(function(window){
    var returnMouseEvent=function(mouse){
        this.lat=mouse.latLng.getLat();
        this.lng=mouse.latLng.getLng();
        this.point=mouse.point.toString().slice(1,-1).split(",");
    };
    
    returnMouseEvent.prototype.position=function(){
      return [this.lat,this.lng]; 
    };
    
    returnMouseEvent.prototype.point=function(){
        return [this.point[0],this.point[1]];
    };
    
    window.returnMouseEvent=returnMouseEvent;
    
    var easyMap=function(){
    };
    
    easyMap.prototype.markerMap=function(markers,value){
      markers.forEach(function(ob){
        ob['map'](value);
      });
    };
    
    easyMap.prototype.markerRemove=function(markers){
      markers.forEach(function(ob){
        ob['remove']();
      });
    };
    
    easyMap.prototype.markerClick= function(markers,overlay){
      if(Array.isArray(overlay)&&markers.length===overlay.length){
        for(var i=0;i<markers.length;i++){
          (function(marker,val){
            marker.on('click',function(){
              val.open(marker);
            });
          }(markers[i],overlay[i]));
        }
      }
    };
    
    easyMap.prototype.customOverlayOnClose= function(overlay,name){
      for(var i =0;i<overlay.length;i++){
        overlay[i]['onClose'](name+"["+i.toString()+"]");
      }
    };
    
    window.easyMap=easyMap;
    
    window.preventMap=function(){
      daum.maps.event.preventMap;
    };

    window.markerImage=function(options){
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
    
    var daumMap=function(container,options){
        options.mapTypeId=options.mapTypeId ? this.mapType(options.mapTypeId) : undefined;
        options.center=new daum.maps.LatLng(options.lat,options.lng);
        this.map=new daum.maps.Map(container, options);
        this.roadViewOverlay=new daum.maps.RoadviewOverlay();
    };
    
    daumMap.prototype.mapType=function(index){
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
    
    daumMap.prototype.overlayMapType=function(index){
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
      
    daumMap.prototype.controlPosition=function(index){
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
    
    daumMap.prototype.center=function(lat,lng){
      if(lat&&lng){
        this.map.setCenter(new daum.maps.LatLng(lat,lng));
        return this;
      }
      else{
        return [this.map.getCenter().lat,this.map.getCenter().lng];
      }
    };
    
    daumMap.prototype.level= function(level,options){
      if(level){
        this.map.setLevel(level,options);
        return this;
      }
      else{
        return this.map.getLevel();
      }
    };
    
    daumMap.prototype.mapTypeId= function(name){
      if(name){
        this.map.setMapTypeId(this.mapType(name));
        return this;
      }
      else{
        var mapId=this.map.getMapTypeId();
        return this.mapType(mapId);
      }
    };
    
    daumMap.prototype.bound= function(options){
      if(options.lat1&&options.lng1&&options.lat2&&options.lng2){
        this.map.setBounds(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.lat1,options.lng1), new daum.maps.LatLng(options.lat2,options.lng2)),
          options.paddingTop,
          options.paddingRight,
          options.paddingBottom,
          options.paddingLeft
        );
      }
      else if(options.marker1&&options.marker2){
        this.map.setBounds(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.marker1.position[0],options.marker1.position[1]),new daum.maps.LatLng(options.marker2.position[0],options.marker2.position[1])),
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
  
        return [sw.getLat(),sw.getLng(),ne.getLat(),ne.getLng()];
      }
      return this;
    };
    
    daumMap.prototype.pan = function(options){
      if(options.x&&options.y){
        this.map.panBy(options.x,options.y);
      }
      else if(options.lat1&&options.lng1&&options.lat2&&options.lng2){
        this.map.panTo(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.lat1,options.lng1), new daum.maps.LatLng(options.lat2,options.lng2)));
      }
      else{
        this.map.panTo(new daum.maps.LatLng(options.lat, options.lng));
      }
      return this;
    };
    
    daumMap.prototype.addControl= function(control,position){
      var con= control ==='TYPE' ? new daum.maps.MapTypeControl() : new daum.maps.ZoomControl();
      this.map.addControl(con,this.controlPosition(position));
      return this;
    };
    
    daumMap.prototype.removeControl = function(control,position){
      var con= control ==='TYPE' ? new daum.maps.MapTypeControl() : new daum.maps.ZoomControl();
      this.map.removeControl(con,this.controlPosition(position));
      return this;
    };
    
    daumMap.prototype.draggable = function(bool){
      if(bool){
        this.map.setDraggable(bool);
        return this;
      }
      else{
        return this.map.getDraggable();
      }    
    };
    
    daumMap.prototype.zoomable = function(bool){
      if(bool){
        this.map.setZoomable(bool);
        return this;
      }
      else{
        return this.map.getZoomable();
      }
    };
    
    daumMap.prototype.relayout = function(){
      this.map.relayout();
      return this;
    };
    
    daumMap.prototype.addOverlayMapTypeId = function(name){
      this.map.addOverlayMapTypeId(this.overlayMapType(name));
      return this;
    };
    
    daumMap.prototype.removeOverlayMapTypeId = function(name){
      this.map.removeOverlayMapTypeId(this.overlayMapType(name));
      return this;
    };
    
    daumMap.prototype.keyboardShortcuts = function(bool){
      if(bool){
        this.map.setKeyboardShortcuts(bool);
        return this;
      }
      else{
        return this.map.getKeyboardShortcuts();
      }
    };
    
    daumMap.prototype.on = function(event,func){
      daum.maps.event.addListener(this.map, event,func);
      return this;
    };
    
    daumMap.prototype.trigger = function(event,data){
      daum.maps.event.trigger(this.map, event,data);
      return this;
    };
    
    daumMap.prototype.off = function(event,func){
      daum.maps.event.removeListener(this.map,event,func);
      return this;
    };
    
    daumMap.prototype.addRoadViewOverlay = function(){
      this.roadViewOverlay.setMap(this.map);
      return this;
    };
    
    daumMap.prototype.removeRoadViewOverlay = function(option){
      this.roadViewOverlay.setMap(null);
      return this;
    };
    
    window.daumMap=daumMap;
    
    var marker=function(options){
        this.daumMap=null;
        options.position= options.lat&&options.lng ? new daum.maps.LatLng(options.lat,options.lng) : new daum.maps.Viewpoint(options.pan,options.tilt,options.zoom,options.panoId);
        if(options.map){
          this.daumMap=options.map;
          options.map=this.daumMap.map;
        }
        this.marker=new daum.maps.Marker(options);
    };
    
    marker.prototype.map = function(daumMap){
      if(daumMap){
        this.marker.setMap(daumMap.map);
        this.daumMap=daumMap;
        return this;
      }
      else{
        return this.daumMap;
      }
    };
    
    marker.prototype.remove = function(){
      this.marker.setMap(null);
      this.daumMap=null;
      return this;
    };
    
    marker.prototype.image = function(image){
      if(image){
        this.marker.setImage(image);
        return this;
      }
      else{
        return this.marker.getImage();
      }
    };
    
    marker.prototype.position = function(options){
      if(!options){
        var position=this.marker.getPosition();
        return [position.getLat(),position.getLng()];
      }
      else if(options.lat&&options.lng){
        this.marker.setPosition(new daum.maps.LatLng(options.lat,options.lng));
      }
      else if(options.pan&&options.tilt){
        this.marker.setPosition(new daum.maps.Viewpoint(options.pan,options.tilt,options.zoom,options.panoId));
      }
      return this;
    };
    
    marker.prototype.zIndex = function(num){
      if(num){
        this.marker.setZIndex(num);
        return this;
      }
      else{
        return this.marker.getZIndex();
      }
    };
    
    marker.prototype.visible = function(bool){
      if(bool){
        this.marker.setVisible(bool);
        return this;
      }
      else{
        return this.marker.getVisible();
      }
    };
    
    marker.prototype.title = function(title){
      if(title){
        this.marker.setTitle(title);
        return this;
      }
      else{
        return this.marker.getTitle();
      }
    };
    
    marker.prototype.draggable = function(bool){
      if(bool){
        this.marker.setDraggable(bool);
        return this;
      }
      else{
        return this.marker.getDraggable();
      }
    };
    
    marker.prototype.clickable = function(bool){
      if(bool){
        this.marker.setClickable(bool);
        return this;
      }
      else{
        return this.marker.getClickable(bool);
      }
    };
    
    marker.prototype.altitude = function(num){
      if(num){
        this.marker.setAltitude(num);
        return this;
      }
      else{
        return this.marker.getAltitude();
      }
    };
    
    marker.prototype.range = function(num){
      if(num){
        this.marker.setRange(num);
        return this;
      }
      else{
        return this.marker.getRange();
      }
    };
    
    marker.prototype.opacity = function(num){
      if(num){
        this.marker.setOpacity(num);
        return this;
      }
      else{
        return this.marker.getOpacity();
      }
    };
    
    marker.prototype.on = function(event,func){
      daum.maps.event.addListener(this.marker,event,func);
      return this;
    };
    
    marker.prototype.trigger = function(event,data){
      daum.maps.event.trigger(this.marker,event,data);
      return this;
    };
    
    marker.prototype.off = function(event,func){
      daum.maps.event.removeEventListener(this.marker,event,func);
      return this;
    };
    
    window.marker=marker;
    
    var infoWindow=function(options){
      this.daumMap=null;
      if(options.map&&options.lat&&options.lng){
        options.position=new daum.maps.LatLng(options.lat,options.lng);
        this.daumMap=options.map;
        options.map=this.daumMap.map;
      }
      this.infowindow=new daum.maps.InfoWindow(options);
    };
    
    infoWindow.prototype.open = function(marker){
      if(marker){
        this.infowindow.open(marker.map().map,marker.marker);
        this.daumMap=marker.map();
        return this;
      }
    };
    
    infoWindow.prototype.close = function(){
      this.infowindow.close();
      return this;
    };
    
    infoWindow.prototype.map = function(){
      return daumMap;
    };
    
    infoWindow.prototype.position = function(lat,lng){
      if(lat&&lng){
        this.infowindow.setPosition(new daum.maps.LatLng(lat,lng));
        return this;
      }
      else{
        var latlng=this.infowindow.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    };
    
    infoWindow.prototype.content = function(value){
      if(value){
        this.infowindow.setContent(value);
        return this;
      }
      else{
        return this.infowindow.getContent();
      }
    };
    
    infoWindow.prototype.zindex = function(value){
      if(value){
        this.infoWindow.setZIndex(value);
        return this;
      }
      else{
        return this.infowindow.getZIndex();
      }
    };
    
    infoWindow.prototype.altitude = function(value){
      if(value){
        this.infowindow.setAltitude(value);
        return this;
      }
      else{
        return this.infowindow.getAltitude();
      }
    };
    
    infoWindow.prototype.range = function(value){
      if(value){
        this.infowindow.setRange(value);
        return this;
      }
      else{
        return this.infowindow.getRange();
      }
    };
    
    window.infoWindow = infoWindow;
    
    var customOverlay=function(options){
      this.daumMap=null;
      if(options.map&&options.lat&&options.lng){
        this.daumMap=options.map;
        options.map=this.daumMap.map;
        options.position=new daum.maps.LatLng(options.lat,options.lng);
      }
      this.div=document.createElement('div');
      this.div.innerHTML=options.content;
      options.content=this.div;
      this.customoverlay=new daum.maps.CustomOverlay(options);
    };
    
    customOverlay.prototype.open=function(marker){
      var position=marker.position();
      this.position(position[0],position[1]);
      this.map(marker.map());
      return this;
    };
    
    customOverlay.prototype.map = function(value){
      if(value){
        this.customoverlay.setMap(value.map);
        this.daumMap=value;
        return this;
      }
      else{
        return this.daumMap;
      }
    };
    
    customOverlay.prototype.onClose= function(name){
      var totalContent=this.content();
      var content=totalContent;
      var length=0;
      while(1){
        var point=content.indexOf("class");
        if(point===-1){
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
    
    customOverlay.prototype.close = function(){
      this.customoverlay.setMap(null);
      return this;
    };
    
    customOverlay.prototype.position = function(lat,lng){
      if(lat&&lng){
        this.customoverlay.setPosition(new daum.maps.LatLng(lat,lng));
        return this;
      }
      else{
        var latlng=this.customoverlay.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    };
    
    customOverlay.prototype.content = function(value){
      if(value){
        this.div.innerHTML=value;
        return this;
      }
      else{
        return this.div.innerHTML;
      }
    };
    
    customOverlay.prototype.zIndex = function(value){
      if(value){
        this.customoverlay.setZIndex(value);
        return this;
      }
      else{
        return this.customoverlay.getZIndex();
      }
    };
    
    customOverlay.prototype.altitude = function(value){
      if(value){
        this.customoverlay.setAltitude(value);
        return this;
      }
      else{
        return this.customoverlay.getAltitude();
      }
    };
    
    customOverlay.prototype.range = function(value){
      if(value){
        this.customoverlay.setRange(value);
        return this;
      }
      else{
        return this.customoverlay.getRange();
      }
    };
    
    customOverlay.prototype.on = function(name,func){
      this.div.addEventListener(name, func);
      return this;
    };
    
    customOverlay.prototype.off = function(name,func){
      this.div.removeEventListener(name,func);
      return this;
    };
    
    window.customOverlay=customOverlay;

})(window);