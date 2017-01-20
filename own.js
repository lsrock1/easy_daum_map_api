function preventMap(){
  daum.maps.event.preventMap;
}

function returnMouse(mouse){
  if(mouse&&mouse.latLng&&mouse.point){
    var point=mouse.point.toString().slice(1,-1).split(",");
    point[1]=Number(point[1].trim());
    point[0]=Number(point[0]);
    return {
      name: 'mouseEvent',
      
      position: function(){
        return [mouse.latLng.getLat(),mouse.latLng.getLng()];
      },
      
      point: function(){
        return [point[0],point[1]];
      }
    };
  }
  else{
   return mouse;
  }
}

function markerImage(options){
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
}

function easyMap(){
  return {
    name: 'easyMap',
   
    markerMap: function(markers,value){
      markers.forEach(function(ob){
        ob['map'](value);
      });
    },
    
    markerRemove: function(markers){
      markers.forEach(function(ob){
        ob['remove']();
      });
    },
    
    markerClick: function(markers,overlay){
      if(Array.isArray(overlay)&&markers.length===overlay.length){
        for(var i=0;i<markers.length;i++){
          (function(marker,val){
            marker.on('click',function(){
              val.open(marker);
            });
          }(markers[i],overlay[i]));
        }
      }
    },
    
    customOverlayOnClose: function(overlay,name){
      for(var i =0;i<overlay.length;i++){
        overlay[i]['onClose'](name+"["+i.toString()+"]");
      }
    }
  };  
}


function daumMap(container,options){
  options.mapTypeId=options.mapTypeId ? mapType(options.mapTypeId) : undefined;
  options.center=new daum.maps.LatLng(options.lat,options.lng);
  
  var map=new daum.maps.Map(container, options),
    roadViewOverlay=new daum.maps.RoadviewOverlay();

  function mapType(index){
    var mapTypeId={
      "ROADMAP" : daum.maps.MapTypeId.ROADMAP,
      "SKYVIEW" : daum.maps.MapTypeId.SKYVIEW,
      "HYBRID" : daum.maps.MapTypeId.HYBRID,
      1 : "ROADMAP",
      2 : "SKYVIEW",
      3 : "HYBRID"
    };
    
    return mapTypeId[index];
  }
  
  function overlayMapType(index){
    var overlayMapType={
      "OVERLAY":daum.maps.MapTypeId.OVERLAY,
      "TRAFFIC":daum.maps.MapTypeId.TRAFFIC,
      "TERRAIN":daum.maps.MapTypeId.TERRAIN,
      "BICYCLE":daum.maps.MapTypeId.BICYCLE,
      "BICYCLE_HYBRID":daum.maps.MapTypeId.BICYCLE_HYBRID,
      "USE_DISTRICT":daum.maps.MapTypeId.USE_DISTRICT
    }
    
    return overlayMapType[index];
  }
  
  function controlPosition(index){
    var positions={
      "TOP": daum.maps.ControlPosition.TOP,
      "TOPLEFT":daum.maps.ControlPosition.TOPLEFT,
      "TOPRIGHT":daum.maps.ControlPosition.TOPRIGHT,
      "LEFT":daum.maps.ControlPosition.LEFT,
      "RIGHT":daum.maps.ControlPosition.RIGHT,
      "BOTTOMLEFT":daum.maps.ControlPosition.BOTTOMLEFT,
      "BOTTOM":daum.maps.ControlPosition.BOTTOM,
      "BOTTOMRIGHT":daum.maps.ControlPosition.BOTTOMRIGHT
    }
    
    return positions[index];
  }

  return {
    name: "daumMap",
    
    center: function(lat,lng){
      if(lat&&lng){
        map.setCenter(new daum.maps.LatLng(lat,lng));
        return this;
      }
      else{
        return [map.getCenter().lat,map.getCenter().lng];
      }
    },
    
    level: function(level,options){
      if(level){
        map.setLevel(level,options);
        return this;
      }
      else{
        return map.getLevel();
      }
    },
    
    mapTypeId: function(name){
      if(name){
        map.setMapTypeId(mapType(name));
        return this;
      }
      else{
        var mapId=map.getMapTypeId();
        return mapType(mapId);
      }
    },
    
    bound: function(options){
      if(options.lat1&&options.lng1&&options.lat2&&options.lng2){
        map.setBounds(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.lat1,options.lng1), new daum.maps.LatLng(options.lat2,options.lng2)),
          options.paddingTop,
          options.paddingRight,
          options.paddingBottom,
          options.paddingLeft
        );
      }
      else if(options.marker1&&options.marker2){
        map.setBounds(new daum.maps.LatLngBounds(options.marker1.positionObject(),options.marker2.positionObject()),
          options.paddingTop,
          options.paddingRight,
          options.paddingBottom,
          options.paddingLeft
        );
      }
      else{
        var mapBound=map.getBounds();
        var sw=mapBound.getSouthWest();
        var ne=mapBound.getNorthEast();
  
        return [sw.getLat(),sw.getLng(),ne.getLat(),ne.getLng()];
      }
      return this;
    },
    
    pan: function(options){
      if(options.x&&options.y){
        map.panBy(options.x,options.y);
      }
      else if(options.lat1&&options.lng1&&options.lat2&&options.lng2){
        map.panTo(new daum.maps.LatLngBounds(new daum.maps.LatLng(options.lat1,options.lng1), new daum.maps.LatLng(options.lat2,options.lng2)));
      }
      else{
        map.panTo(new daum.maps.LatLng(options.lat, options.lng));
      }
      return this;
    },
    
    addControl: function(control,position){
      var con= control ==='TYPE' ? new daum.maps.MapTypeControl() : new daum.maps.ZoomControl();
      map.addControl(con,controlPosition(position));
      return this;
    },
    
    removeControl: function(control,position){
      var con= control ==='TYPE' ? new daum.maps.MapTypeControl() : new daum.maps.ZoomControl();
      map.removeControl(con,controlPosition(position));
      return this;
    },
    
    draggable: function(bool){
      if(bool){
        map.setDraggable(bool);
        return this;
      }
      else{
        return map.getDraggable();
      }    
    },
    
    zoomable: function(bool){
      if(bool){
        map.setZoomable(bool);
        return this;
      }
      else{
        return map.getZoomable();
      }
    },
    
    relayout: function(){
      map.relayout();
      return this;
    },
    
    addOverlayMapTypeId: function(name){
      map.addOverlayMapTypeId(overlayMapType(name));
      return this;
    },
    
    removeOverlayMapTypeId: function(name){
      map.removeOverlayMapTypeId(overlayMapType(name));
      return this;
    },
    
    keyboardShortcuts: function(bool){
      if(bool){
        map.setKeyboardShortcuts(bool);
        return this;
      }
      else{
        return map.getKeyboardShortcuts();
      }
    },
    
    on: function(event,func){
      daum.maps.event.addListener(map, event,func);
      return this;
    },
    
    trigger: function(event,data){
      daum.maps.event.trigger(map, event,data);
      return this;
    },
    
    off: function(event,func){
      daum.maps.event.removeListener(map,event,func);
      return this;
    },
    
    object: function(){
      return map;
    },
    
    addRoadViewOverlay: function(){
      roadViewOverlay.setMap(map);
      return this;
    },
    
    removeRoadViewOverlay: function(option){
      roadViewOverlay.setMap(null);
      return this;
    }
  };
}

function marker(options){
  var daumMap=null;
  options.position= options.lat&&options.lng ? new daum.maps.LatLng(options.lat,options.lng) : new daum.maps.Viewpoint(options.pan,options.tilt,options.zoom,options.panoId);
  if(options.map){
    daumMap=options.map;
    options.map=daumMap.object();
  }
  
  var marker=new daum.maps.Marker(options);
  
  return {
    name: "marker",
    
    map: function(getmap){
      if(getmap&&getmap.name=='daumMap'){
        if(getmap!==daumMap){
          marker.setMap(getmap.object());
          daumMap=getmap;
        }
        return this;
      }
      else{
        return daumMap;
      }
    },
    
    remove: function(){
      marker.setMap(null);
      daumMap=null;
      return this;
    },
    
    positionObject : function(){
      return options.position;
    },
    
    image: function(image){
      if(image){
        marker.setImage(image);
        return this;
      }
      else{
        return marker.getImage();
      }
    },
    
    position: function(options){
      if(!options){
        var position=marker.getPosition();
        return [position.getLat(),position.getLng()];
      }
      else if(options.lat&&options.lng){
        marker.setPosition(new daum.maps.LatLng(options.lat,options.lng));
      }
      else if(options.pan&&options.tilt){
        marker.setPosition(new daum.maps.Viewpoint(options.pan,options.tilt,options.zoom,options.panoId));
      }
      return this;
    },
    
    zIndex: function(num){
      if(num){
        marker.setZIndex(num);
        return this;
      }
      else{
        return marker.getZIndex();
      }
    },
    
    visible: function(bool){
      if(bool){
        marker.setVisible(bool);
        return this;
      }
      else{
        return marker.getVisible();
      }
    },
    
    title: function(title){
      if(title){
        marker.setTitle(title);
        return this;
      }
      else{
        return marker.getTitle();
      }
    },
    
    draggable: function(bool){
      if(bool){
        marker.setDraggable(bool);
        return this;
      }
      else{
        return marker.getDraggable();
      }
    },
    
    clickable: function(bool){
      if(bool){
        marker.setClickable(bool);
        return this;
      }
      else{
        return marker.getClickable(bool);
      }
    },
    
    altitude: function(num){
      if(num){
        marker.setAltitude(num);
        return this;
      }
      else{
        return marker.getAltitude();
      }
    },
    
    range: function(num){
      if(num){
        marker.setRange(num);
        return this;
      }
      else{
        return marker.getRange();
      }
    },
    
    opacity: function(num){
      if(num){
        marker.setOpacity(num);
        return this;
      }
      else{
        return marker.getOpacity();
      }
    },
    
    on: function(event,func){
      daum.maps.event.addListener(marker,event,func);
      return this;
    },
    
    trigger: function(event,data){
      daum.maps.event.trigger(marker,event,data);
      return this;
    },
    
    off: function(event,func){
      daum.maps.event.removeEventListener(marker,event,func);
      return this;
    },
    
    object: function(){
      return marker;
    }
  
  }
};
//마커끝

function infoWindow(options){
  var daumMap=null;
  
  if(options.map&&options.lat&&options.lng){
    options.position=new daum.maps.LatLng(options.lat,options.lng);
    daumMap=options.map;
    options.map=daumMap.object();
  }
  
  var infowindow=new daum.maps.InfoWindow(options);
  
  return{
    name: "infoWindow",
    
    open: function(marker){
      if(marker&&marker.name==='marker'){
        infowindow.open(marker.map().object(),marker.object());
        daumMap=marker.map();
        return this;
      }
    },
    
    close: function(){
      infowindow.close();
      return this;
    },
    
    map: function(){
      return daumMap;
    },
    
    position: function(lat,lng){
      if(lat&&lng){
        infowindow.setPosition(new daum.maps.LatLng(lat,lng));
        return this;
      }
      else{
        var latlng=infowindow.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    },
    
    content: function(value){
      if(value){
        infowindow.setContent(value);
        return this;
      }
      else{
        return infowindow.getContent();
      }
    },
    
    zindex: function(value){
      if(value){
        infoWindow.setZIndex(value);
        return this;
      }
      else{
        return infowindow.getZIndex();
      }
    },
    
    altitude: function(value){
      if(value){
        infowindow.setAltitude(value);
        return this;
      }
      else{
        return infowindow.getAltitude();
      }
    },
    
    range: function(value){
      if(value){
        infowindow.setRange(value);
        return this;
      }
      else{
        return infowindow.getRange();
      }
    }
    
  }
}

function customOverlay(options){
  var daumMap=null;
  if(options.map&&options.lat&&options.lng){
    daumMap=options.map;
    options.map=daumMap.object();
    options.position=new daum.maps.LatLng(options.lat,options.lng);
  }
  var div=document.createElement('div');
  div.innerHTML=options.content;
  options.content=div;
  var customoverlay=new daum.maps.CustomOverlay(options);
  

  return {
    name: "CustomOverlay",
    
    open: function(marker){
      var position=marker.position();
      this.position(position[0],position[1]);
      daumMap=marker.map();
      this.map(daumMap);
      return this;
    },
    
    map: function(value){
      if(value){
        customoverlay.setMap(value.object());
        daumMap=value;
        return this;
      }
      else{
        return daumMap;
      }
    },
    
    onClose: function(name){
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
    },
    
    close: function(){
      customoverlay.setMap(null);
      return this;
    },

    position: function(lat,lng){
      if(lat&&lng){
        customoverlay.setPosition(new daum.maps.LatLng(lat,lng));
        return this;
      }
      else{
        var latlng=customoverlay.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    },
    
    content: function(value){
      if(value){
        div.innerHTML=value;
        return this;
      }
      else{
        return div.innerHTML;
      }
    },
    
    zindex: function(value){
      if(value){
        customoverlay.setZIndex(value);
        return this;
      }
      else{
        return customoverlay.getZIndex();
      }
    },
    
    altitude: function(value){
      if(value){
        customoverlay.setAltitude(value);
        return this;
      }
      else{
        return customoverlay.getAltitude();
      }
    },
    
    range: function(value){
      if(value){
        customoverlay.setRange(value);
        return this;
      }
      else{
        return customoverlay.getRange();
      }
    },
    
    on: function(name,func){
      div.addEventListener(div,name, func);
      return this;
    },
    
    off: function(name,func){
      div.removeEventListener(div,name,func);
      return this;
    }
  }
}