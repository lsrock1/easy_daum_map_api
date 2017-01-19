# daumMap 객체
지도 객체

##생성자 함수: daumMap(container,options)

지도를 생성한다.
```javascript
var container = document.getElementById('map'),
  options = {
      lat: 33.450701,
  	  lng: 126.570667,
      level: 3
  };

var map = daumMap(container, options);
```

매개변수
* options
  * center : 삭제
  * lat (Number): 중심좌표 위도 (필수)
  * lng (Number): 중심좌표 경도 (필수)
  * mapTypeId (String: ROADMAP , SKYVIEW , HYBRID 중 하나): 지도 종류
  * 나머지 [다음 지도](http://apis.map.daum.net/web/documentation/#Map)와 같음


##메소드

### 1. center

####.center(): 중심좌표 반환  

```javascript
 map.center();
//[33.450701,126.570667]
```
  반환값
  * [Number, Number]


####.center(위도,경도): 위도,경도 값으로 중심좌표 변경

```javascript
map.center(33.450701,126.570667);
//중심좌표 위도 33.450701 경도 126.570667 로 변경
```

  매개변수 
  * 위도 (Number)
  * 경도 (Number)


### 2. level

####.level(): 현재 확대 축소 수준 반환  

```javascript
 map.level();
//3
```
  반환값
  * Number


####.level(level,options): 확대 축소 수준을 매개변수로 설정, options 객체로 다양한 효과 가능

```javascript
map.level(3,options);
//확대 축소 수준 3으로 변경
```

  매개변수
  * level (Number)
  * options (Object) [참조](http://apis.map.daum.net/web/documentation/#Map_setLevel)


### 3. mapTypeId

####.mapTypeId(): 현재 지도 종류 반환

```javascript
 map.mapTypeId();
//"ROADMAP"
```
  반환값
  * String


####.mapTypeId(지도 종류): 지도 종류 변경

```javascript
map.mapTypeId("SKYVIEW");
//지도 종류 스카이뷰로 변경
```

  매개변수 
  * 지도 종류 (String): SKYVIEW ROADMAP HYBRID 문자열 중 하나 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)


### 4. bound

####.bound(): 현재 지도의 화면 영역 반환

```javascript
 map.bound();
//[33.4488882499644, 126.56798133906949, 33.45251321509635, 126.5733411966229]
```
  반환값
  * [첫째 좌표의 위도(Float),첫째 좌표의 경도(Float),둘째 좌표의 위도(Float),둘째 좌표의 경도(Float)]
  * 반환되는 좌표 규칙 [참조](http://apis.map.daum.net/web/documentation/#LatLngBounds)


####.bound(위도1,경도1,위도2,경도2): 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다
####위도,경도,위도,경도 순으로 두개의 좌표 전달

```javascript
map.bound(33.4488882499644, 126.56798133906949, 33.45251321509635, 126.5733411966229);
//두 좌표가 보이도록 지도 확대 축소
```

  매개변수 
  * 위도1 (Float): 보여야 할 첫째 좌표의 위도 값
  * 경도1 (Float): 보여야 할 첫째 좌표의 경도 값
  * 위도2 (Float): 보여야 할 둘째 좌표의 위도 값
  * 경도2 (Float): 보여야 할 둘째 좌표의 경도 값

####.bound(마커,마커)
####두개의 marker 객체를 전달했을 때

```javascript
map.bound(marker1,marker2);
//두 마커가 보이도록 지도 확대 축소
```

  매개변수 
  * 마커 (Object): 마커 객체
  * 마커 (Object): 마커 객체


### 5. pan

####.pan(x,y): 중심좌표 해당 픽셀만큼 부드럽게 이동

```javascript
map.pan(50,100);
//오른쪽으로 50 픽셀 위쪽으로 100 픽셀 이동
```
  매개변수
  * x (Integer): x축 이동 픽셀값
  * y (Integer): y축 이동 픽셀값


####.pan(위도,경도): 해당 위,경도로 중심좌표 부드럽게 이동

```javascript
map.pan(33.450701,126.570667);
//33.450701,126.570667로 부드럽게 이동
```

  매개변수 
  * 위도 (Float)
  * 경도 (Float)


####.pan(위도1,경도1,위도2,경도2): 두 좌표가 보이는 영역으로 부드럽게 이동
[참조](http://apis.map.daum.net/web/documentation/#Map_panTo)
```javascript
map.pan(33.4488882499644, 126.56798133906949, 33.45251321509635, 126.5733411966229);
//두 좌표가 보이도록 지도 이동
```

  매개변수 
  * 위도1 (Float): 보여야 할 첫째 좌표의 위도 값
  * 경도1 (Float): 보여야 할 첫째 좌표의 경도 값
  * 위도2 (Float): 보여야 할 둘째 좌표의 위도 값
  * 경도2 (Float): 보여야 할 둘째 좌표의 경도 값


### 6. addControl

####.addControl(컨트롤러 이름,위치): 지도에 컨트롤러를 올린다

```javascript
map.addControl("TYPE","TOP");
//타입 컨트롤러를 상단에 올린다

map.addControl("ZOOM","BOTTOMLEFT");
//줌컨트롤러를 왼쪽 아래에 올린다
```

  매개변수 [참조](http://apis.map.daum.net/web/sample/addMapControl/)
  * 컨트롤러 이름 (String): TYPE, ZOOM
  * 위치 (String): TOP, TOPLEFT, TOPRIGHT, LEFT, RIGHT, BOTTOMLEFT, BOTTOMRIGHT


### 7. removeControl

####.removeControl(컨트롤러 이름,위치): 지도에 컨트롤러를 없앤다

```javascript
map.removeControl("TYPE","TOP");
//상단에 있는 타입 컨트롤러를 없앤다

map.removeControl("ZOOM","BOTTOMLEFT");
//왼쪽 아래에 있는 줌컨트롤러를 없앤다
```

  매개변수 [참조](http://apis.map.daum.net/web/sample/addMapControl/)
  * 컨트롤러 이름 (String): TYPE, ZOOM
  * 위치 (String): TOP, TOPLEFT, TOPRIGHT, LEFT, RIGHT, BOTTOMLEFT, BOTTOMRIGHT


### 8. draggable

####.draggable(): 마우스 드래그와 모바일 터치를 이용한 지도 이동 가능 여부를 반환한다

```javascript
map.draggable();
//true
```

  반환값
  * Boolean

####.draggable(Boolean): 마우스 드래그와 모바일 터치를 이용한 지도 이동 가능 여부를 설정한다

```javascript
map.draggable(false);
//마우스 드래그 및 모바일 터치로 이동 불가
```

  매개변수
  * Boolean


### 9. zoomable

####.zoomable(): 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 반환한다.

```javascript
map.zoomable();
//true
```

  반환값
  * Boolean

####.zoomable(Boolean): 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 설정한다.

```javascript
map.zoomable(false);
//마우스 휠 및 모바일 터치로 확대, 축소 불가
```

  매개변수
  * Boolean


### 10. relayout

####.relayout(): 지도를 표시하는 HTML elemente의 크기를 변경한 후에는 반드시 이 함수를 호출해야 한다.

```javascript
map.relayout();
```


### 11. addOverlayMapTypeId

####.addOverlayMapTypeId(타일 종류): 지도에 로드뷰, 교통정보 등의 오버레이 타입의 타일 이미지를 올린다.

```javascript
map.addOverlayMapTypeId("TRAFFIC");
//교통정보 타일 이미지를 올린다

map.addOverlayMapTypeId("TERRAIN");
//지형도 타일 이미지를 올린다
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)
  * 타일 종류 (String): TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT, OVERLAY


### 12. removeOverlayMapTypeId

####.removeOverlayMapTypeId(타일 종류): 지도에 로드뷰, 교통정보 등의 오버레이 타입의 타일 이미지를 삭제한다.

```Javascript
map.removeOverlayMapTypeId("TRAFFIC");
//교통정보 타일 이미지를 없앤다

map.removeOverlayMapTypeId("TERRAIN");
//지형도 타일 이미지를 없앤다
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)
  * 타일 종류 (String): TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT, OVERLAY


### 13. keyboardShortcuts

####.keyboardShortcuts(): 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 반환한다.

```javascript
map.keyboardShortcuts();
//true
```

  반환값
  * Boolean

####.keyboardShortcuts(Boolean): 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 설정한다.

```javascript
map.keyboardShortcuts(false);
//키보드로 조절 불가
```

  매개변수
  * Boolean


### 14. on

####.on(이벤트 이름,콜백함수): 지도에 이벤트를 등록한다

```javascript
map.on('center_changed',function(){
  console.log("중심 좌표가 변경됩니다");
});
//중심 좌표가 변경되었을 때 콘솔에 로그를 띄우는 이벤트를 등록합니다

map.on("click",function(e){
  var latlng = e.position;
  alert(latlng);
});
//지도를 클릭했을 때 위 경도를 알림창으로 띄우는 이벤트를 등록합니다
```

  매개변수 [지도 기본 이벤트](http://apis.map.daum.net/web/documentation/#Map_Events)
  * 이벤트 이름 (String)
  * 콜백함수 (Function)
  

#### mouseEvent

click, dbclick, rightclick, mousemove 이벤트는 콜백함수로 mouseEvent라는 인자를 전달하는데  
이 인자는 두가지 메소드를 가집니다.
```javascript
map.on('click',function(mouseEvent){
  alert(mouseEvent.position());
});
//지도를 클릭했을 때 위 경도를 알림창으로 띄우는 이벤트를 등록합니다

map.on("click",function(mouseEvent){
  alert(mouseEvent.point());
});
//지도를 클릭했을 때 픽셀 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```
  
  
### 14. off

####.off(이벤트 이름, 콜백함수): 지도의 이벤트를 제거한다