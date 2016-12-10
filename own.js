function isInt(n) {
   return n % 1 === 0;
}

Array.prototype.mapFunc=function(name,value){
  var list=[]
  this.forEach(function(ob){
    var content=ob[name](value);
    if(content){
      list.push(content);
    }
  });
  if(list.length>0){
    return list;
  }
};

// daum.maps.event.preventMap();
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
  
  var options={
    center: new daum.maps.LatLng(options.lat,options.lng),
    level: options.level,
    mapTypeId: options.mapTypeId,
    draggable: options.draggable,
    scrollwheel: options.scrollwheel,
    disableDoubleClick: options.disableDoubleClick,
    disableDoubleClickZoom: options.disableDoubleClickZoom,
    //projectionId: options.projectionId,
    tileAnimation: options.tileAnimation,
    keyboardShortcuts: options.keyboardShortcuts
  };
  
  var map=new daum.maps.Map(container, options);
  
  return {
    center: function(lat,lng){
      if(!lat||!lng){
        return [map.getCenter().lat,map.getCenter().lng];
      }
      else{
        map.setCenter(new daum.maps.Latmng(lat,lng));
      }
    },
    
    level: function(level,options){
      if(!level){
        return map.getLevel();
      }
      else{
        return map.setLevel(level,options);
      }
    },
    
    mapTypeId: function(name){
      if(!name){
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
      else{
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
    },
    
    bound: function(lat1,lng1,lat2,lng2,paddingTop,paddingRight,paddingBottom,paddingLeft){
      if(!lat1||!lng1||!lat2||!lng1){
        var mapBound=map.getBounds();
        var sw=mapBound.getSouthWest();
        var ne=mapBound.getNorthEast();
  
        return [sw.getLat(),sw.getLng(),ne.getLat(),ne.getLng()];
      }
      else{
        map.setBound(new daum.maps.LatLngBounds(new daum.maps.Latmng(lat1,lng1), new daum.maps.Latmng(lat2,lng2)),
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft
        );
      }
    },
    
    pan: function(lat1,lng1,lat2,lng2){
      if(isNaN(lat2)&&isNaN(lng2)){
        if(isInt(lat1)&&isInt(lng1)){
          map.panBy(lat1,lng1);
        }
        else{
          map.panTo(new daum.maps.LatLng(lat1, lng1));
        }
      }
      else{
        map.panTo(new daum.maps.LatLngBounds(new daum.maps.Latmng(lat1,lng1), new daum.maps.Latmng(lat2,lng2)));
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
      if(!bool){
        return map.getDraggable();
      }
      else{
        map.setDraggable(bool);
      }
    },
    
    zoomable: function(bool){
      if(!bool){
        return map.getZoomable();
      }
      else{
        map.setZoomable(bool);
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
      if(!bool){
        return map.getKeyboardShortcuts();
      }
      else{
        map.setKeyboardShortcuts(bool);
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
  var tag=options.tag;
  var options={
    position: new daum.maps.LatLng(options.lat,options.lng),
    image: options.image,
    title: options.title,
    draggable: options.draggable,
    clickable: options.clickable,
    zIndex: options.zIndex,
    opacity: options.opacity,
    altitude: options.altitude,
    range: options.range
  };
  
  var daumMap=null;
  
  var marker=new daum.maps.Marker(options);
  
  return {
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
    
    image: function(image){
      if(image instanceof daum.maps.MarkerImage){
        marker.setImage(image);
      }
      else{
        return marker.getImage();
      }
    },
    
    position: function(name,a,b,c,d){
      if(name=='latlng'){
        marker.setPosition(new daum.maps.LatLng(a,b));
      }
      else if(name=='viewpoint'){
        marker.setPosition(new daum.maps.Viewpoint(a,b,c,d));
      }
      else{
        return marker.getPosition();
      }
    },
    
    zindex: function(num){
      if(!num){
        return marker.getZIndex();
      }
      else{
        marker.setZIndex(num);
      }
    },
    
    visible: function(bool){
      if(!bool){
        return marker.getVisible();
      }
      else{
        marker.setVisible(bool);
      }
    },
    
    title: function(title){
      if(!title){
        return marker.getTitle();
      }
      else{
        marker.setTitle(title);
      }
    },
    
    draggable: function(bool){
      if(!bool){
        return marker.getDraggable();
      }
      else{
        marker.setDraggable(bool);
      }
    },
    
    clickable: function(bool){
      if(!bool){
        return marker.getClickable(bool);
      }
      else{
        marker.setClickable(bool);
      }
    },
    
    altitude: function(num){
      if(!num){
        return marker.getAltitude();
      }
      else{
        marker.setAltitude(num);
      }
    },
    
    range: function(num){
      if(!num){
        return marker.getRange();
      }
      else{
        marker.setRange(num);
      }
    },
    
    opacity: function(num){
      if(!num){
        return marker.getOpacity();
      }
      else{
        marker.setOpacity(num);
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
    }
  
  }
};
//마커끝