function isInt(n) {
   return n % 1 === 0;
}

function preventMap(){
  daum.maps.event.preventMap;
}

Array.prototype.markerMap=function(value){
  this.forEach(function(ob){
    ob['map'](value);
  });
};

Array.prototype.markerRemove=function(){
  this.forEach(function(ob){
    ob['remove']();
  });
};

Array.prototype.markerClick=function(value){
  if(Array.isArray(value)&&this.length==value.length){
    for(var i=0;i<this.length;i++){
      (function(marker,val){
        marker.on('click',function(){
          val.open(marker);
        });
      }(this[i],value[i]));
    }
  }
};

Array.prototype.customOverlayOnClose=function(name){
  for(var i =0;i<this.length;i++){
    this[i]['onClose'](name+"["+i.toString()+"]");
  }
};

function daumMap(container,options){
  if(options.mapTypeId){
    switch(name){
      case "ROADMAP":
        options.mapTypeId=daum.maps.MapTypeId.ROADMAP;
        break;
      case "SKYVIEW":
        options.mapTypeId=daum.maps.MapTypeId.SKYVIEW;
        break;
      case "HYBRID":
        options.mapTypeId=daum.maps.MapTypeId.HYBRID;
        break;
      default: break;
    }
  }
  options.center=new daum.maps.LatLng(options.lat,options.lng);
  
  var map=new daum.maps.Map(container, options);
  
  return {
    name: "daumMap",
    
    center: function(lat,lng){
      if(lat&&lng){
        map.setCenter(new daum.maps.Latmng(lat,lng));
      }
      else{
        return [map.getCenter().lat,map.getCenter().lng];
      }
    },
    
    level: function(level,options){
      if(level){
        return map.setLevel(level,options);
      }
      else{
        return map.getLevel();
      }
    },
    
    mapTypeId: function(name){
      if(name){
        switch(name){
          case "ROADMAP":
            map.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
            break;
          case "SKYVIEW":
            map.setMapTypeId(daum.maps.MapTypeId.SKYVIEW);
            break;
          case "HYBRID":
            map.setMapTypeId(daum.maps.MapTypeId.HYBRID);
            break;
          default: break;
        }
      }
      else{
        var mapId=map.getMapTypeId();
        switch(mapId){
          case 1:
            return "ROADMAP";
          case 2:
            return "SKYVIEW";
          case 3:
            return "HYBRID";
          default:
            break;
        }
      }
    },
    
    bound: function(lat1,lng1,lat2,lng2,paddingTop,paddingRight,paddingBottom,paddingLeft){
      if(lat1&&lng1&&lat2&&lng2){
        map.setBounds(new daum.maps.LatLngBounds(new daum.maps.LatLng(lat1,lng1), new daum.maps.LatLng(lat2,lng2)),
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft
        );
      }
      else if(lat1&&typeof lat1 =='object'&&lng1&&typeof lng1=='object'){
        map.setBounds(new daum.maps.LatLngBounds(lat1.positionObject(),lng1.positionObject()),
        lat2,
        lng2,
        paddingTop,
        paddingRight
        );
      }
      else{
        var mapBound=map.getBounds();
        var sw=mapBound.getSouthWest();
        var ne=mapBound.getNorthEast();
  
        return [sw.getLat(),sw.getLng(),ne.getLat(),ne.getLng()];
      }
    },
    
    pan: function(lat1,lng1,lat2,lng2){
      if(!lat2&&!lng2){
        if(isInt(lat1)&&isInt(lng1)){
          map.panBy(lat1,lng1);
        }
        else{
          map.panTo(new daum.maps.LatLng(lat1, lng1));
        }
      }
      else{
        map.panTo(new daum.maps.LatLngBounds(new daum.maps.LatLng(lat1,lng1), new daum.maps.LatLng(lat2,lng2)));
      }
    },
    
    addControl: function(control,position){
      var posi;
      var con;
      if(control=="Type"){
        con =new daum.maps.MapTypeControl();
      }
      else{
        con = new daum.maps.ZoomControl();
      }
    
      switch(position){
        case "TOP":
          posi= daum.maps.ControlPosition.TOP;
          break;
        case "TOPLEFT":
          posi=daum.maps.ControlPosition.TOPLEFT;
          break;
        case "TOPRIGHT":
          posi=daum.maps.ControlPosition.TOPRIGHT;
          break;
        case "LEFT":
          posi=daum.maps.ControlPosition.LEFT;
          break;
        case "RIGHT":
          posi=daum.maps.ControlPosition.RIGHT;
          break;
        case "BOTTOMLEFT":
          posi=daum.maps.ControlPosition.BOTTOMLEFT;
          break;
        case "BOTTOM":
          posi=daum.maps.ControlPosition.BOTTOM;
          break;
        case "BOTTOMRIGHT":
          posi=daum.maps.ControlPosition.BOTTOMRIGHT;
          break;
        default:break;
      }
    
      map.addControl(con,posi);
    },
    
    removeControl: function(control,position){
      var posi;
      var con;
      if(control=="Type"){
        con =new daum.maps.MapTypeControl();
      }
      else{
        con = new daum.maps.ZoomControl();
      }
  
      switch(position){
        case "TOP":
          posi= daum.maps.ControlPosition.TOP;
          break;
        case "TOPLEFT":
          posi=daum.maps.ControlPosition.TOPLEFT;
          break;
        case "TOPRIGHT":
          posi=daum.maps.ControlPosition.TOPRIGHT;
          break;
        case "LEFT":
          posi=daum.maps.ControlPosition.LEFT;
          break;
        case "RIGHT":
          posi=daum.maps.ControlPosition.RIGHT;
          break;
        case "BOTTOMLEFT":
          posi=daum.maps.ControlPosition.BOTTOMLEFT;
          break;
        case "BOTTOM":
          posi=daum.maps.ControlPosition.BOTTOM;
          break;
        case "BOTTOMRIGHT":
          posi=daum.maps.ControlPosition.BOTTOMRIGHT;
          break;
        default:break;
      }
  
      map.removeControl(con,posi);
    },
    
    draggable: function(bool){
      if(bool){
        map.setDraggable(bool);
      }
      else{
        return map.getDraggable();
      }
    },
    
    zoomable: function(bool){
      if(bool){
        map.setZoomable(bool);
      }
      else{
        return map.getZoomable();
      }
    },
    
    relayout: function(){
      map.relayout();
    },
    
    addOverlayMapTypeId: function(name){
      var type;
      switch(name){
        case "ROADVIEW":
          type=daum.maps.MapTypeId.ROADVIEW;
        case "OVERLAY":
          type=daum.maps.MapTypeId.OVERLAY;
        case "TRAFFIC":
          type=daum.maps.MapTypeId.TRAFFIC;
        case "TERRAIN":
          type=daum.maps.MapTypeId.TERRAIN;
        case "BICYCLE":
          type=daum.maps.MapTypeId.BICYCLE;
        case "BICYCLE_HYBRID":
          type=daum.maps.MapTypeId.BICYCLE_HYBRID;
        case "USE_DISTRICT":
          type=daum.maps.MapTypeId.USE_DISTRICT;
        default: break;
      }
      map.addOverlayMapTypeId(type);
    },
    
    removeOverlayMapTypeId: function(name){
      var type;
      switch(name){
        case "ROADVIEW":
          type=daum.maps.MapTypeId.ROADVIEW;
        case "OVERLAY":
          type=daum.maps.MapTypeId.OVERLAY;
        case "TRAFFIC":
          type=daum.maps.MapTypeId.TRAFFIC;
        case "TERRAIN":
          type=daum.maps.MapTypeId.TERRAIN;
        case "BICYCLE":
          type=daum.maps.MapTypeId.BICYCLE;
        case "BICYCLE_HYBRID":
          type=daum.maps.MapTypeId.BICYCLE_HYBRID;
        case "USE_DISTRICT":
          type=daum.maps.MapTypeId.USE_DISTRICT;
        default: break;
      }
      map.removeOverlayMapTypeId(type);
    },
    
    keyboardShortcuts: function(bool){
      if(bool){
        map.setKeyboardShortcuts(bool);
      }
      else{
        return map.getKeyboardShortcuts();
      }
    },
    
    on: function(event,func){
      daum.maps.event.addListener(map, event,func);
    },
    
    trigger: function(event,data){
      daum.maps.event.trigger(map, event,data);
    },
    
    off: function(event,func){
      daum.maps.event.removeListener(map,event,func);
    },
    
    object: function(){
      return map;
    }
  };
}

//마커 객체 정의

function marker(options){
  var daumMap=null;
  options.position=new daum.maps.LatLng(options.lat,options.lng);
  if(options.map){
    daumMap=options.map;
    options.map=daumMap.object();
  }
  
  
  var marker=new daum.maps.Marker(options);
  
  return {
    name: "marker",
    
    map: function(getmap){
      if(typeof getmap =='object'){
        if(getmap!=daumMap){
          marker.setMap(getmap.object());
          daumMap=getmap;
        }
      }
      else{
        return daumMap;
      }
    },
    
    remove: function(){
      marker.setMap(null);
      daumMap=null;
    },
    
    positionObject : function(){
      return options.position;
    },
    
    image: function(image){
      if(image&&image instanceof daum.maps.MarkerImage){
        marker.setImage(image);
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
      else if(options.name=='latlng'){
        marker.setPosition(new daum.maps.LatLng(options.lat,options.lng));
      }
      else if(options.name=='viewpoint'){
        marker.setPosition(new daum.maps.Viewpoint(options.lat1,options.lng1,options.lat2,options.lng2));
      }
    },
    
    zindex: function(num){
      if(num){
        marker.setZIndex(num);
      }
      else{
        return marker.getZIndex();
      }
    },
    
    visible: function(bool){
      if(bool){
        marker.setVisible(bool);
      }
      else{
        return marker.getVisible();
      }
    },
    
    title: function(title){
      if(title){
        marker.setTitle(title);
      }
      else{
        return marker.getTitle();
      }
    },
    
    draggable: function(bool){
      if(bool){
        marker.setDraggable(bool);
      }
      else{
        return marker.getDraggable();
      }
    },
    
    clickable: function(bool){
      if(bool){
        marker.setClickable(bool);
      }
      else{
        return marker.getClickable(bool);
      }
    },
    
    altitude: function(num){
      if(num){
        marker.setAltitude(num);
      }
      else{
        return marker.getAltitude();
      }
    },
    
    range: function(num){
      if(num){
        marker.setRange(num);
      }
      else{
        return marker.getRange();
      }
    },
    
    opacity: function(num){
      if(num){
        marker.setOpacity(num);
      }
      else{
        return marker.getOpacity();
      }
    },
    
    on: function(event,func){
      daum.maps.event.addListener(marker,event,func);
    },
    
    trigger: function(event,func){
      daum.maps.event.trigger(marker,event,func);
    },
    
    off: function(event,func){
      daum.maps.event.removeEventListener(marker,event,func);
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
      infowindow.open(marker.map().object(),marker.object());
      daumMap=marker.map();
    },
    
    close: function(){
      infowindow.close();
    },
    
    map: function(){
      return daumMap;
    },
    
    position: function(lat,lng){
      if(lat&&lng){
        infowindow.setPosition(new daum.maps.LatLng(lat,lng));
      }
      else{
        var latlng=infowindow.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    },
    
    content: function(value){
      if(value){
        infowindow.setContent(value);
      }
      else{
        return infowindow.getContent();
      }
    },
    
    zindex: function(value){
      if(value){
        infoWindow.setZIndex(value);
      }
      else{
        return infowindow.getZIndex();
      }
    },
    
    altitude: function(value){
      if(value){
        infowindow.setAltitude(value);
      }
      else{
        return infowindow.getAltitude();
      }
    },
    
    range: function(value){
      if(value){
        infowindow.setRange(value);
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
    },
    
    map: function(value){
      if(value){
        customoverlay.setMap(value.object());
        daumMap=value;
      }
      else{
        return daumMap;
      }
    },
    
    onClose: function(name){
      var content=this.content();
      var point=content.search("close");
      content=content.slice(0,point+6)+"onclick='"+name+".remove()'"+content.slice(point+6);
      this.content(content);
    },
    
    remove: function(){
      customoverlay.setMap(null);
    },

    position: function(lat,lng){
      if(lat&&lng){
        customoverlay.setPosition(new daum.maps.LatLng(lat,lng));
      }
      else{
        var latlng=customoverlay.getPosition();
        return [latlng.getLat(),latlng.getLng()];
      }
    },
    
    content: function(value){
      if(value){
        div.innerHTML=value;
      }
      else{
        return div.innerHTML;
      }
    },
    
    zindex: function(value){
      if(value){
        customoverlay.setZIndex(value);
      }
      else{
        return customoverlay.getZIndex();
      }
    },
    
    altitude: function(value){
      if(value){
        customoverlay.setAltitude(value);
      }
      else{
        return customoverlay.getAltitude();
      }
    },
    
    range: function(value){
      if(value){
        customoverlay.setRange(value);
      }
      else{
        return customoverlay.getRange();
      }
    },
    
    on: function(name,func){
      div.addEventListener(name, func);
    },
    
    off: function(name,func){
      div.removeEventListener(name,func);
    }
  }
}