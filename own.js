function isInt(n) {
   return n % 1 === 0;
}

function daumMap(container,options){
  var options={
    center: new daum.maps.LatLng(options.lat,options.lng),
    level: options.level,
    mapTypeId: options.mapTypeId,
    draggable: options.draggable,
    scrollwheel: options.scrollwheel,
    disableDoubleClick: options.disableDoubleClick,
    disableDoubleClickZoom: options.disableDoubleClickZoom,
    projectionId: options.projectionId,
    tileAnimation: options.tileAnimation,
    keyboardShortcuts: options.keyboardShortcuts
  };
  
  var map=new daum.maps.Map(container, options);
  var markers=[];
  
  return {
    center: function(lat,lng){
      if(isNaN(lat)||isNaN(lng)){
        return [map.getCenter().lat,map.getCenter().lng];
      }
      else{
        map.setCenter(new daum.maps.Latmng(lat,lng));
      }
    },
    
    level: function(level,options){
      if(isNaN(level)){
        return this.map.getLevel();
      }
      else{
        return this.map.setLevel(level,options);
      }
    },
    
    mapTypeId: function(name){
      if(isNaN(name)){
        var mapId=typeof map.getMapTypeId();
        switch(mapId){
          case "daum.maps.MapTypeId.ROADMAP":
            return "ROADMAP";
          case "daum.maps.MapTypeId.SKYVIEW":
            return "SKYVIEW";
          default:
            return "HYBRID";
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
      if(isNaN(lat1)||isNaN(lng1)||isNaN(lat2)||isNaN(lng1)){
        var mapBound=this.map.getBounds();
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
      if(isNaN(bool)){
        return map.getDraggable();
      }
      else{
        map.setDraggable(bool);
      }
    },
    
    zoomable: function(bool){
      if(isNaN(bool)){
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
      if(isNaN(bool)){
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
    
    mark: function(options){
      var mark= new marker(map,options);
      markers.push(mark);
      return mark;
    },
    
    object: function(){
      return map;
    }
  };
}

//마커 객체 정의

function marker(map,options){
  var options={
    position: new daum.maps.LatLng(options.lat,options.lng),
    map: map,
    image: options.image,
    title: options.title,
    draggable: options.draggable,
    clickable: options.clickable,
    zIndex: options.zIndex,
    opacity: options.opacity,
    altitude: options.altitude,
    range: options.range
  };
  var marker=new daum.maps.Marker(options);

  return {
    map: function(map){
      if(typeof map =='object'){
        marker.setMap(map.object());
      }
      else if(map==null){
        marker.setMap(null);
      }
      else{
        return map;
        // return this.marker.getMap();
      }
    },
    
    remove: function(){
      marker.setMap(null);
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
      if(isNaN(num)){
        return marker.getZIndex();
      }
      else{
        marker.setZIndex(num);
      }
    },
    
    visible: function(bool){
      if(isNaN(bool)){
        return marker.getVisible();
      }
      else{
        marker.setVisible(bool);
      }
    },
    
    title: function(title){
      if(isNaN(title)){
        return marker.getTitle();
      }
      else{
        marker.setTitle(title);
      }
    },
    
    draggable: function(bool){
      if(isNaN(bool)){
        return marker.getDraggable();
      }
      else{
        marker.setDraggable(bool);
      }
    },
    
    clickable: function(bool){
      if(isNaN(bool)){
        return marker.getClickable(bool);
      }
      else{
        marker.setClickable(bool);
      }
    },
    
    altitude: function(num){
      if(isNaN(num)){
        return marker.getAltitude();
      }
      else{
        marker.setAltitude(num);
      }
    },
    
    range: function(num){
      if(isNaN(num)){
        return marker.getRange();
      }
      else{
        marker.setRange(num);
      }
    },
    
    opacity: function(num){
      if(isNaN(num)){
        return marker.getOpacity();
      }
      else{
        marker.setOpacity(num);
      }
    }
  
  }
};
//마커끝