daum 지도 api easy
=======================

다음 지도를 사용하기 쉽게 만든 js입니다.

![Alt text](/image/mi.png)  
빨간색: 인포윈도우  
파란색: 마커

#포함하기

own.min.js를 daum map api 스크립트 소스 아래에 포함합니다.

```{.javascript}
<script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
<script src="/own.min.js"></script>
```

#예제

##1. 지도에 마커 올리기
![Alt text](/image/marker.png)
###* 방법 (1) 마커객체 생성 후 map 메소드 사용

```{.javascript}
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701, //지도의 중심 위도
  	lng: 126.570667,//지도의 중심 경도
  	level: 3 //확대 축소 정도
  };
   
  var map=daumMap(container,options); //지도 초기화
   
  var mark={
  	lat: 33.450701, //마커의 위도
  	lng: 126.570667,//마커의 경도
  }
  //마커 옵션
  
  var marker1=marker(mark); //마커객체 생성
  marker1.map(map); //마커를 지도에 표시
  marker1.remove(); //마커 지우기
</script>
```

###* 방법 (2) 마커객체 생성 옵션에 map 넣기

```{.javascript}
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
   
  var mark={
  	lat: 33.450701,
  	lng: 126.570667,
  	map: map //마커를 생성할 지도
  }
  //마커 옵션
  
  var marker1=marker(mark1); //마커객체 생성
  marker1.remove(); //마커 지우기
</script>
```  
    
###* 방법 (3) easyMap의 markerMap 매소드 사용(여러개의 마커 사용시 편리)

```{.javascript}
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
   
  var mark={
  	lat: 33.450701,
  	lng: 126.570667
  }
  //마커 옵션
  
  var marker1=marker(mark1); //마커객체 생성
  easyMap.markerMap([marker1],map) //마커 올리기
</script>
```    
    
##2. 다중 마커 사용
![Alt text](/image/markers.png)
```{.javascript}
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
  
  var mark1={
  	lat: 33.450701,
  	lng: 126.570667
  }
  
  var mark2={
  	lat: 33.450701,
  	lng: 126.580667
  }
  //마커 옵션
  
  var markers=[]
  markers.push(marker(mark1)); //첫 번째 마커객체 생성 markers 배열에 삽입
  markers.push(marker(mark2)); //두 번째 마커객체 생성 markers 배열에 삽입
  
  easyMap.markerMap(markers,map); //모든 마커를 map이라는 지도에 표시
  easyMap.markerRemove(markers); //모든 마커 지우기
</script>
```

##3. 인포윈도우 생성
![Alt text](/image/info.png)
```{.javascript}
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
   
  var info1={
    content: '<div style="padding:5px;">11</div>',
    removable: true,
    map: map, //인포윈도우를 올릴 지도
    lat: 33.450701, //올릴 위치 위도
    lng: 126.570667 //올릴 위치 경도
  }
   
  var info2={
      content: '<div style="padding:5px;">22</div>',
      removable: true,
      map: map,
      lat: 33.450701,
      lng: 126.580667
  }
  //인포윈도우 옵션
  
  var infow1=infoWindow(info1);
  var infow2=infoWindow(info2);
  //인포윈도우 생성
  
</script>
```

##4. 마커 위에 인포윈도우 생성
![Alt text](/image/infomarker.png)
```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
  
  var mark1={
  	lat: 33.450701,
  	lng: 126.570667
  }
  
  var mark2={
  	lat: 33.450701,
  	lng: 126.580667
  }
  //마커 옵션
  
  var markers=[];
  markers.push(marker(mark1));
  markers.push(marker(mark2));
  easyMap.markerMap(markers,map);
  //마커 생성
  
  var info1={
    content: '<div style="padding:5px;">11</div>',
    removable: true
  }
   
  var info2={
      content: '<div style="padding:5px;">22</div>',
      removable: true
  }
  //인포윈도우 옵션
  
  var infow1=infoWindow(info1);
  var infow2=infoWindow(info2);
  //인포윈도우 생성
  
  infow1.open(marker1);
  infow2.open(marker2);
  //마커 바로위에 인포윈도우 띄우기
</script>
```   


##5. 마커 클릭 이벤트에 인포윈도우 연결

###* 방법 (1) 마커의 on 메소드 사용

```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
  
  var mark1={
  	lat: 33.450701,
  	lng: 126.570667,
  	clickable: true
  }
  
  var mark2={
  	lat: 33.450701,
  	lng: 126.580667,
  	clickable: true
  }
  //마커 옵션
  
  var markers=[];
  markers.push(marker(mark1));
  markers.push(marker(mark2));
  easyMap.markerMap(markers,map);
  //마커 생성
  
  var info1={
    content: '<div style="padding:5px;">11</div>',
    removable: true
  }
   
  var info2={
      content: '<div style="padding:5px;">22</div>',
      removable: true
  }
  //인포윈도우 옵션
  
  var infow1=infoWindow(info1);
  var infow2=infoWindow(info2);
  //인포윈도우 생성
  
  marker1.on('click',function(){
      infow1.open(marker1);
  })
  //marker1 클릭에 infow1 인포윈도우 오픈 연결
  
  marker2.on('click',function(){
      infow2.open(marker2);
  })
  //marker2 클릭에 infow2 인포윈도우 오픈 연결
</script>
```


###* 방법 (2) easyMap의 markerClick 메소드 사용(여러개의 마커와 인포윈도우 사용시 편리)

```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
  
  var map=daumMap(container,options); //지도 초기화
  
  var mark1={
  	lat: 33.450701,
  	lng: 126.570667,
  	clickable: true
  }
  
  var mark2={
  	lat: 33.450701,
  	lng: 126.580667,
  	clickable: true
  }
  //마커 옵션
  
  var markers=[];
  markers.push(marker(mark1));
  markers.push(marker(mark2));
  easyMap.markerMap(markers,map);
  //마커 생성 및 지도에 올리기
  
  var info1={
    content: '<div style="padding:5px;">11</div>',
    removable: true
  }
   
  var info2={
      content: '<div style="padding:5px;">22</div>',
      removable: true
  }
  //인포윈도우 옵션
  
  var infows=[];
  infows.push(infoWindow(info1));
  infows.push(infoWindow(info2));
  //인포윈도우 생성
  
  easyMap.markerClick(markers,infows);
  //각 배열의 N번째 마커와 인포윈도우 클릭으로 연결
  
</script>
```
  
##6. 닫기 가능한 다중 커스텀 오버레이 띄우기

오버레이의 css는 다음 공식 api 예제를 참고했습니다. [여기](http://apis.map.daum.net/web/sample/dragCustomOverlay/)  
괜찮은 커스텀 오버레이 css는 다음 공식 예제 [여기](http://apis.map.daum.net/web/sample/removableCustomOverlay/)에서 참고하시면 됩니다  


```javascript
<style type="text/css">
    .overlay {
        left: -50px;
        position:absolute;
        top:0;
        width:100px;
        height: 100px;
        background: #fff;
        border:1px solid #ccc;
        border-radius: 5px;
        white-space: pre;
        word-wrap: break-word;
        position: absolute;top: -150px;
    }
    .close{
        font-size: 30px;
    }
</style>
<body>
  <div id="map" style="width:500px;height:400px;"></div>
</body>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=daumMap(container,options); //지도 초기화
  
  var mOptions=[
    {
      lat: 33.450701,
  	  lng: 126.570667,
  	  clickable: true
    },
    {
      lat: 33.450701,
  	  lng: 126.580667,
  	  clickable: true
    }
  ];
  //옵션 배열
  
  var markers=[];
  //마커들을 저장할 배열
  
  mOptions.forEach(function(option){
    markers.push(marker(option));
  });
  //마커 객체 생성
  
  var cOptions=[
    {
      content:'<div class="overlay">11111<br/><button class="close">&times;</button></div>',
      clickable: true,
    },
    {
      content:'<div class="overlay">22222<br/><button class="close">&times;</button></div>',
      clickable: true,
    }
  ]
  //커스텀 오버레이 옵션
  
  var overlays=[];
  //오버레이들을 저장할 배열
  
  cOptions.forEach(function(option){
    overlays.push(customOverlay(option));
  });
  //오버레이 객체 생성
  
  easyMap.customOverlayOnClose(overlays,'overlays');
  //오버레이 요소 중 close 클래스에 close 이벤트를 등록합니다
  //첫 번째 인자로 오버레이들이 담긴 배열을 두 번째 인자로 배일의 이름을 전달합니다
  //close 클래스인 button을 클릭하면 개별 오버레이가 닫히게 됩니다
  
  easyMap.markerClick(markers,overlays);
  //각 배열의 N번째 마커와 오버레이를 클릭으로 연결
  //마커를 클릭하면 오버레이가 열립니다
  
  overlays[0].on("mouseover",function(){
    overlays[0].close();
  })
  //오버레이에 마우스를 올리면 닫히는 이벤트를 등록합니다
  //같은 형태로 다른 이벤트를 등록할 수 있습니다
</script>
```

# daumMap 객체
지도 객체

##생성자 함수: daumMap(container,options)

지도를 생성한다.
```{.javascript}
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

```{.javascript}
 map.center();
//[33.450701,126.570667]
```
  반환값
  * [Number, Number]


####.center(위도,경도): 위도,경도 값으로 중심좌표 변경

```{.javascript}
map.center(33.450701,126.570667);
//중심좌표 위도 33.450701 경도 126.570667 로 변경
```

  매개변수 
  * 위도 (Number)
  * 경도 (Number)


### 2. level

####.level(): 현재 확대 축소 수준 반환  

```{.javascript}
 map.level();
//3
```
  반환값
  * Number


####.level(level,options): 확대 축소 수준을 매개변수로 설정, options 객체로 다양한 효과 가능

```{.javascript}
map.level(3,options);
//확대 축소 수준 3으로 변경
```

  매개변수
  * level (Number)
  * options (Object) [참조](http://apis.map.daum.net/web/documentation/#Map_setLevel)


### 3. mapTypeId

####.mapTypeId(): 현재 지도 종류 반환

```{.javascript}
 map.mapTypeId();
//"ROADMAP"
```
  반환값
  * String


####.mapTypeId(지도 종류): 지도 종류 변경

```{.javascript}
map.mapTypeId("SKYVIEW");
//지도 종류 스카이뷰로 변경
```

  매개변수 
  * 지도 종류 (String): SKYVIEW ROADMAP HYBRID 문자열 중 하나 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)


### 4. bound

####.bound(): 현재 지도의 화면 영역 반환

```{.javascript}
 map.bound();
//[33.4488882499644, 126.56798133906949, 33.45251321509635, 126.5733411966229]
```
  반환값
  * [첫째 좌표의 위도(Float),첫째 좌표의 경도(Float),둘째 좌표의 위도(Float),둘째 좌표의 경도(Float)]
  * 반환되는 좌표 규칙 [참조](http://apis.map.daum.net/web/documentation/#LatLngBounds)


####.bound(위도1,경도1,위도2,경도2): 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다
####위도,경도,위도,경도 순으로 두개의 좌표 전달

```{.javascript}
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

```{.javascript}
map.bound(marker1,marker2);
//두 마커가 보이도록 지도 확대 축소
```

  매개변수 
  * 마커 (Object): 마커 객체
  * 마커 (Object): 마커 객체


### 5. pan

####.pan(x,y): 중심좌표 해당 픽셀만큼 부드럽게 이동

```{.javascript}
map.pan(50,100);
//오른쪽으로 50 픽셀 위쪽으로 100 픽셀 이동
```
  매개변수
  * x (Integer): x축 이동 픽셀값
  * y (Integer): y축 이동 픽셀값


####.pan(위도,경도): 해당 위,경도로 중심좌표 부드럽게 이동

```{.javascript}
map.pan(33.450701,126.570667);
//33.450701,126.570667로 부드럽게 이동
```

  매개변수 
  * 위도 (Float)
  * 경도 (Float)


####.pan(위도1,경도1,위도2,경도2): 두 좌표가 보이는 영역으로 부드럽게 이동
[참조](http://apis.map.daum.net/web/documentation/#Map_panTo)
```{.javascript}
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

```{.javascript}
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

```{.javascript}
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

```{.javascript}
map.draggable();
//true
```

  반환값
  * Boolean

####.draggable(Boolean): 마우스 드래그와 모바일 터치를 이용한 지도 이동 가능 여부를 설정한다

```{.javascript}
map.draggable(false);
//마우스 드래그 및 모바일 터치로 이동 불가
```

  매개변수
  * Boolean


### 9. zoomable

####.zoomable(): 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 반환한다.

```{.javascript}
map.zoomable();
//true
```

  반환값
  * Boolean

####.zoomable(Boolean): 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 설정한다.

```{.javascript}
map.zoomable(false);
//마우스 휠 및 모바일 터치로 확대, 축소 불가
```

  매개변수
  * Boolean


### 10. relayout

####.relayout(): 지도를 표시하는 HTML elemente의 크기를 변경한 후에는 반드시 이 함수를 호출해야 한다.

```{.javascript}
map.relayout();
```


### 11. addOverlayMapTypeId

####.addOverlayMapTypeId(타일 종류): 지도에 로드뷰, 교통정보 등의 오버레이 타입의 타일 이미지를 올린다.

```{.javascript}
map.addOverlayMapTypeId("TRAFFIC");
//교통정보 타일 이미지를 올린다

map.addOverlayMapTypeId("TERRAIN");
//지형도 타일 이미지를 올린다
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)
  * 타일 종류 (String): TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT, OVERLAY


### 12. removeOverlayMapTypeId

####.removeOverlayMapTypeId(타일 종류): 지도에 로드뷰, 교통정보 등의 오버레이 타입의 타일 이미지를 삭제한다.

```{.javascript}
map.removeOverlayMapTypeId("TRAFFIC");
//교통정보 타일 이미지를 없앤다

map.removeOverlayMapTypeId("TERRAIN");
//지형도 타일 이미지를 없앤다
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)
  * 타일 종류 (String): TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT, OVERLAY


### 13. keyboardShortcuts

####.keyboardShortcuts(): 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 반환한다.

```{.javascript}
map.keyboardShortcuts();
//true
```

  반환값
  * Boolean

####.keyboardShortcuts(Boolean): 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 설정한다.

```{.javascript}
map.keyboardShortcuts(false);
//키보드로 조절 불가
```

  매개변수
  * Boolean


### 14. on

####.on(이벤트 이름,콜백함수): 지도에 이벤트를 등록한다

```{.javascript}
map.on('center_changed',function(){
  console.log("중심 좌표가 변경됩니다");
});
//중심 좌표가 변경되었을 때 콘솔에 로그를 띄우는 이벤트를 등록합니다

map.on("click",function(e){
  var latlng = e.latLng;
  alert('click! ' + latlng.toString());
});
//지도를 클릭했을 때 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```

  매개변수 [지도 기본 이벤트](http://apis.map.daum.net/web/documentation/#Map_Events)
  * 이벤트 이름 (String)
  * 콜백함수 (Function)