# DaumMap 객체
지도 객체

## 생성자 함수: own.DaumMap(container,options)

지도를 생성한다.
```javascript
var container = document.getElementById('map'),
  options = {
      center: [33.450701, 126.570667],
      level: 3
  };

var map = new own.DaumMap(container, options);
```

  매개변수
  * container (Node) : 지도가 표시될 HTML 요소
  * options (Object)
    * center (Array): [중심좌표 위도 (Number), 중심좌표 경도 (Number)] 필수
    * level (Number) : 확대 수준 (기본값: 3)
    * mapTypeId (String: ROADMAP , SKYVIEW , HYBRID 중 하나): 지도 종류
    * draggable (Boolean): 마우스 드래그, 휠, 모바일 터치를 이용한 시점 변경(이동, 확대, 축소) 가능 여부
    * scrollwheel (Boolean): 마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
    * disableDoubleClick (Boolean) : 더블클릭 이벤트 및 더블클릭 확대 가능 여부
    * disableDoubleClickZoom (Boolean) : 더블클릭 확대 가능 여부
    * projectionId (String) : 투영법 지정
    * tileAnimation (Boolean) : 지도 타일 애니메이션 설정 여부 (기본값: true)
    * keyboardShortcuts (Boolean | Object) : 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부 (기본값: false)
      * speed (Number) : 지도 이동 속도


## 메소드

### 1. center

#### .center(): 중심좌표 반환  

```javascript
 map.center();
//[33.450701, 126.570667]
```
  반환값
  * Array
    * (Number): 위도
    * (Number): 경도


#### .center(위도,경도): 위도,경도 값으로 중심좌표 변경

```javascript
map.center([33.450701, 126.570667]);
//중심좌표 위도 33.450701 경도 126.570667 로 변경
```

  매개변수 
  * Array 
    * (Number): 위도
    * (Number): 경도


### 2. level

#### .level(): 현재 확대 축소 수준 반환  

```javascript
 map.level();
//3
```
  반환값
  * level (Number)


#### .level(level,options): 확대 축소 수준을 매개변수로 설정, options 객체로 다양한 효과 가능

```javascript
map.level(3, options);
//확대 축소 수준 3으로 변경
```

  매개변수
  * level (Number)
  * options (Object) [참조](http://apis.map.daum.net/web/documentation/#Map_setLevel)


### 3. mapTypeId

#### .mapTypeId(): 현재 지도 종류 반환

```javascript
 map.mapTypeId();
//"ROADMAP"
```
  반환값
  * 지도 종류 (String)


#### .mapTypeId(지도 종류): 지도 종류 변경

```javascript
map.mapTypeId("SKYVIEW");
//지도 종류 스카이뷰로 변경
```

  매개변수 
  * 지도 종류 (String): SKYVIEW ROADMAP HYBRID 문자열 중 하나 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)


### 4. bound

#### .bound(): 현재 지도의 화면 영역 반환

```javascript
 map.bound();
//[[33.4488882499644, 126.56798133906949], [33.45251321509635, 126.5733411966229]]
```
  반환값
  * Array
    * Array
      * (Number): 첫째 좌표의 위도
      * (Number): 첫째 좌표의 경도
    * Array
      * (Number): 둘째 좌표의 위도
      * (Number): 둘째 좌표의 경도
  * 반환되는 좌표 규칙 [참조](http://apis.map.daum.net/web/documentation/#LatLngBounds)


#### .bound(options): 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다

#### 두개의 좌표 전달

```javascript
var options={
  position1 : [33.4488882499644, 126.56798133906949],
  position2 : [33.45251321509635, 126.5733411966229]
};
map.bound(options);
//두 좌표가 보이도록 지도 확대 축소
```

  매개변수
  * options (Object)
    * position1 (Array):
      * (Number): 보여야 할 첫째 좌표의 위도 값
      * (Number): 보여야 할 첫째 좌표의 경도 값
    * position2 (Array):
      * (Number): 보여야 할 둘째 좌표의 위도 값
      * (Number): 보여야 할 둘째 좌표의 경도 값

#### 두개의 marker 객체를 전달

```javascript
var options={
  marker1 : obj_marker1,
  marker2 : obj_marker2
};
map.bound(options);
//두 마커가 보이도록 지도 확대 축소
```

  매개변수
  * options (Object)
    * marker1 (Object): 마커 객체
    * marker2 (Object): 마커 객체


### 5. pan

#### .pan(options): 부드럽게 이동

#### x,y축 전달

```javascript
var options={
  x: 50,
  y: 100
};
map.pan(options);
//오른쪽으로 50 픽셀 위쪽으로 100 픽셀 이동
```
  매개변수
  * options (Object)
    * x (Number): x축 이동 픽셀값
    * y (Number): y축 이동 픽셀값


#### 좌표 하나 전달

```javascript
var options={
  position: [33.450701, 126.570667]
};
map.pan(options);
//33.450701,126.570667로 부드럽게 이동
```

  매개변수
  * options (Object)
    * position (Array):
      * (Number): 위도값
      * (Number): 경도값


#### 두 좌표 전달
[참조](http://apis.map.daum.net/web/documentation/#Map_panTo)
```javascript
var options={
  position1: [33.4488882499644, 126.56798133906949],
  position2: [33.45251321509635, 126.5733411966229]
};
map.pan(options);
//두 좌표가 보이도록 지도 이동
```

  매개변수
  * options (Object)
    * position1 (Array):
      * (Number): 보여야 할 첫째 좌표의 위도 값
      * (Number): 보여야 할 첫째 좌표의 경도 값
    * position2 (Array):
      * (Number): 보여야 할 둘째 좌표의 위도 값
      * (Number): 보여야 할 둘째 좌표의 경도 값


### 6. addControl

#### .addControl(컨트롤러 이름,위치): 지도에 컨트롤러를 올린다

```javascript
map.addControl("TYPE", "TOP");
//타입 컨트롤러를 상단에 올린다

map.addControl("ZOOM", "BOTTOMLEFT");
//줌컨트롤러를 왼쪽 아래에 올린다
```

  매개변수 [참조](http://apis.map.daum.net/web/sample/addMapControl/)
  * 컨트롤러 이름 (String): TYPE, ZOOM
  * 위치 (String): TOP, TOPLEFT, TOPRIGHT, LEFT, RIGHT, BOTTOMLEFT, BOTTOMRIGHT


### 7. removeControl

#### .removeControl(컨트롤러 이름,위치): 지도에 컨트롤러를 없앤다

```javascript
map.removeControl("TYPE", "TOP");
//상단에 있는 타입 컨트롤러를 없앤다

map.removeControl("ZOOM", "BOTTOMLEFT");
//왼쪽 아래에 있는 줌컨트롤러를 없앤다
```

  매개변수 [참조](http://apis.map.daum.net/web/sample/addMapControl/)
  * 컨트롤러 이름 (String): TYPE, ZOOM
  * 위치 (String): TOP, TOPLEFT, TOPRIGHT, LEFT, RIGHT, BOTTOMLEFT, BOTTOMRIGHT


### 8. draggable

#### .draggable(): 마우스 드래그와 모바일 터치를 이용한 지도 이동 가능 여부를 반환한다

```javascript
map.draggable();
//true
```

  반환값
  * Boolean

#### .draggable(Boolean): 마우스 드래그와 모바일 터치를 이용한 지도 이동 가능 여부를 설정한다

```javascript
map.draggable(false);
//마우스 드래그 및 모바일 터치로 이동 불가
```

  매개변수
  * Boolean


### 9. zoomable

#### .zoomable(): 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 반환한다.

```javascript
map.zoomable();
//true
```

  반환값
  * Boolean

#### .zoomable(Boolean): 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 설정한다.

```javascript
map.zoomable(false);
//마우스 휠 및 모바일 터치로 확대, 축소 불가
```

  매개변수
  * Boolean


### 10. relayout

#### .relayout(): 지도를 표시하는 HTML elemente의 크기를 변경한 후에는 반드시 이 함수를 호출해야 한다.

```javascript
map.relayout();
```


### 11. addOverlayMapTypeId

#### .addOverlayMapTypeId(타일 종류): 지도에 로드뷰, 교통정보 등의 오버레이 타입의 타일 이미지를 올린다.

```javascript
map.addOverlayMapTypeId("TRAFFIC");
//교통정보 타일 이미지를 올린다

map.addOverlayMapTypeId("TERRAIN");
//지형도 타일 이미지를 올린다
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)
  * 타일 종류 (String): TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT, OVERLAY


### 12. removeOverlayMapTypeId

#### .removeOverlayMapTypeId(타일 종류): 지도에 로드뷰, 교통정보 등의 오버레이 타입의 타일 이미지를 삭제한다.

```Javascript
map.removeOverlayMapTypeId("TRAFFIC");
//교통정보 타일 이미지를 없앤다

map.removeOverlayMapTypeId("TERRAIN");
//지형도 타일 이미지를 없앤다
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)
  * 타일 종류 (String): TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT, OVERLAY


### 13. keyboardShortcuts

#### .keyboardShortcuts(): 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 반환한다.

```javascript
map.keyboardShortcuts();
//true
```

  반환값
  * Boolean

#### .keyboardShortcuts(Boolean): 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 설정한다.
  
```javascript
map.keyboardShortcuts(false);
//키보드로 조절 불가
```

  매개변수
  * Boolean


### 14. on
  
#### .on(이벤트 이름,콜백함수): 지도에 이벤트를 등록한다
  
```javascript
map.on('center_changed',function(){
  console.log("중심 좌표가 변경됩니다");
});
//중심 좌표가 변경되었을 때 콘솔에 로그를 띄우는 이벤트를 등록합니다

map.on("click",function(e){
  var latlng = own.MouseEvent(e);
  alert(latlng.position());
});
//지도를 클릭했을 때 위 경도를 알림창으로 띄우는 이벤트를 등록합니다
```

  매개변수 [지도가 기본으로 일으키는 이벤트](http://apis.map.daum.net/web/documentation/#Map_Events)
  * 이벤트 이름 (String)
  * 콜백함수 (Function)
  

#### [MouseEvent](/readme/MouseEvent.md#MouseEvent-객체)
  
click, dbclick, rightclick, mousemove 이벤트는 콜백함수에게 mouseEvent라는 인자를 전달하는데  
이 인자를 returnMouseEvent 객체 생성자에 다시 전달하면 다음에서 제공하는  
복잡한 메소드 없이 정보를 가져올 수 있게 재정의된 returnMouseEvent 객체를 반환합니다
```javascript
map.on('click',function(mouseEvent){
  mouseEvent = own.MouseEvent(mouseEvent);
  alert(mouseEvent.position());
});
//지도를 클릭했을 때 위 경도를 알림창으로 띄우는 이벤트를 등록합니다

map.on("click",function(mouseEvent){
  mouseEvent = own.MouseEvent(mouseEvent);
  alert(mouseEvent.point());
});
//지도를 클릭했을 때 화면 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```
  
  
### 14. off

#### .off(이벤트 이름, 제거할 함수): 지도의 이벤트를 제거한다
  
```javascript
var event= function(){
  console.log("중심 좌표가 변경됩니다");
};
map.on('center_changed', event);
//중심 좌표가 변경되었을 때 콘솔에 로그를 띄우는 이벤트를 등록합니다

map.off('center_changed', event);
//중심 좌표가 변경되었을 때 콘솔에 로그를 띄우는 이벤트를 제거합니다
```

  매개변수
  * 이벤트 이름 (String)
  * 제거할 함수 (Function)


### 15. trigger
  
#### .trigger(이벤트 이름,데이터): 지도에 이벤트를 발생시킨다
  
```javascript
map.on("own_event",function(data){
  console.log(data);
});

map.trigger("own_event",'사용자 이벤트');
```

  매개변수 [지도가 기본으로 일으키는 이벤트](http://apis.map.daum.net/web/documentation/#Map_Events)
  * 이벤트 이름 (String)
  * 데이터 (*) : 이벤트를 처리하는 함수에 넘길 변수


### 16. addRoadViewOverlay

#### .addRoadViewOverlay(): 지도에 로드뷰 선을 그린다
  
```javascript
map.addRoadViewOverlay();
```
 

### 17. removeRoadViewOverlay

#### .removeRoadViewOverlay(): 지도에 로드뷰 선을 제거한다
  
```javascript
map.removeRoadViewOverlay();
```


### 메소드 체인
```javascript
map
.center([33.450701, 126.570667])
.level(4)
.mapTypeId("SKYVIEW")
.bound({
  position1 : [33.4488882499644, 126.56798133906949],
  position2 : [33.45251321509635, 126.5733411966229]
})
.pan({x: 5, y: 10})
.relayout()
.on('center_changed', function(){
  console.log("중심 좌표가 변경됩니다");
})
```

맘껏 이어보세요!
