function isInt(n) {
   return n % 1 === 0;
}

function kakaoMap(container,options){
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
  
  this.map=new daum.maps.Map(container, options);
  this.markers=[];
  
  this.center=function(lat,lng){
    if(isNaN(lat)||isNaN(lng)){
      return [this.map.getCenter().lat,this.map.getCenter().lng];
    }
    else{
      this.map.setCenter(new daum.maps.Latmng(lat,lng));
    }
  };
  
  this.level=function(level,options){
    if(isNaN(level)){
      return this.map.getLevel();
    }
    else{
      return this.map.setLevel(level,options);
    }
  };
  
  this.mapTypeId=function(name){
    if(isNaN(name)){
      var mapId=typeof map.getMapTypeId();
      if(mapId == "daum.maps.MapTypeId.ROADMAP"){
        return "ROADMAP";
      }
      else if(mapId =="daum.maps.MapTypeId.SKYVIEW"){
        return "SKYVIEW";
      }
      else{
        return "HYBRID";
      }
    }
    else{
      switch(name){
        case "ROADMAP":
          this.map.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
          break;
        case "SKYVIEW":
          this.map.setMapTypeId(daum.maps.MapTypeId.SKYVIEW);
          break;
        case "HYBRID":
          this.map.setMapTypeId(daum.maps.MapTypeId.HYBRID);
          break;
        default: break;
      }
    }
  };
  
  this.bound=function(lat1,lng1,lat2,lng2,paddingTop,paddingRight,paddingBottom,paddingLeft){
    if(isNaN(lat1)||isNaN(lng1)||isNaN(lat2)||isNaN(lng1)){
      var mapBound=this.map.getBounds();
      var sw=mapBound.getSouthWest();
      var ne=mapBound.getNorthEast();

      return [sw.getLat(),sw.getLng(),ne.getLat(),ne.getLng()];
    }
    else{
      this.map.setBound(new daum.maps.LatLngBounds(new daum.maps.Latmng(lat1,lng1), new daum.maps.Latmng(lat2,lng2)),
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      );
    }
  };
  
  this.pan=function(lat1,lng1,lat2,lng2){
    if(isNaN(lat2)&&isNaN(lng2)){
      if(isInt(lat1)&&isInt(lng1)){
        this.map.panBy(lat1,lng1);
      }
      else{
        this.map.panTo(new daum.maps.LatLng(lat1, lng1));
      }
    }
    else{
      this.map.panTo(new daum.maps.LatLngBounds(new daum.maps.Latmng(lat1,lng1), new daum.maps.Latmng(lat2,lng2)));
    }
  };
  
  this.addControl=function(control,position){
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
  
    this.map.addControl(con,posi);
  };
  
  this.removeControl=function(control,position){
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

    this.map.removeControl(con,posi);
  };
  
  this.draggable=function(bool){
    if(isNaN(bool)){
      return this.map.getDraggable();
    }
    else{
      this.map.setDraggable(bool);
    }
  };
  
  this.zoomable=function(bool){
    if(isNaN(bool)){
      return this.map.getZoomable();
    }
    else{
      this.map.setZoomable(bool);
    }
  };
  
  this.relayout=function(){
    this.map.relayout();
  };
  
  this.addOverlayMapTypeId=function(name){
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
    this.map.addOverlayMapTypeId(type);
  };
  
  this.removeOverlayMapTypeId=function(name){
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
    this.map.removeOverlayMapTypeId(type);
  };
  
  this.keyboardShortcuts=function(bool){
    if(isNaN(bool)){
      return this.map.getKeyboardShortcuts();
    }
    else{
      this.map.setKeyboardShortcuts(bool);
    }
  };
  
  this.on=function(event,func){
    daum.maps.event.addListener(this.map, event,func);
  };
  
  this.trigger=function(event,data){
    daum.maps.event.trigger(this.map, event,data);
  };
  
  this.marker=function(options){
    var mark= new marker(this.map,options);
    markers.push(mark);
    return mark;
  };
}

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
  this.marker=new daum.maps.Marker(options);
  
  this.map=function(map){
    if(map instanceof daum.maps.Map){
      this.marker.setMap(map);
    }
    else if(map==null){
      this.marker.setMap(null);
    }
    else{
      return this.marker.getMap();
    }
  };
  
  this.image=function(image){
    if(image instanceof daum.maps.MarkerImage){
      this.marker.setImage(image);
    }
    else{
      return this.marker.getImage();
    }
  };
  
  this.position=function(name,a,b,c,d){
    if(name=='latlng'){
      this.marker.setPosition(new daum.maps.LatLng(a,b));
    }
    else if(name=='viewpoint'){
      this.marker.setPosition(new daum.maps.Viewpoint(a,b,c,d));
    }
    else{
      return this.marker.getPosition();
    }
  }
};