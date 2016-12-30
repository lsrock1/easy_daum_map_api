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


###* 방법 (2) 마커 배열의 markerClick 메소드 사용(여러개의 마커와 인포윈도우 사용시 편리)

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
  * lat (Float): 중심좌표 위도 (필수)
  * lng (Float): 중심좌표 경도 (필수)
  * mapTypeId (String: ROADMAP , SKYVIEW , HYBRID 중 하나): 지도 종류
  * 나머지 [다음 지도](http://apis.map.daum.net/web/documentation/#Map)와 같음


##메소드

### 1. center

####매개변수가 없을 때: 중심좌표 실수 배열 반환  

```{.javascript}
 map.center();
//[33.450701,126.570667]
```
  반환값
  * [Float, Float]


####매개변수 존재: 위도,경도 값으로 중심좌표 변경

```{.javascript}
map.center(33.450701,126.570667);
//중심좌표 위도 33.450701 경도 126.570667 로 변경
```

  매개변수 
  * 위도 (Float)
  * 경도 (Float)


### 2. level

####매개변수가 없을 때: 현재 확대 축소 수준 반환  

```{.javascript}
 map.level();
//3
```
  반환값
  * Integer


####매개변수 존재: 확대 축소 수준을 매개변수로 설정, options 객체로 다양한 효과 가능

```{.javascript}
map.level(3,options);
//확대 축소 수준 3으로 변경
```

  매개변수
  * level (Integer)
  * options (Object) [참조](http://apis.map.daum.net/web/documentation/#Map_setLevel)


### 3. mapTypeId

####매개변수가 없을 때: 현재 지도 종류 반환

```{.javascript}
 map.mapTypeId();
//"ROADMAP"
```
  반환값
  * String


####매개변수 존재: 지도 종류 변경

```{.javascript}
map.mapTypeId("SKYVIEW");
//지도 종류 스카이뷰로 변경
```

  매개변수 
  * 지도 종류 (String) [참조](http://apis.map.daum.net/web/documentation/#MapTypeId)


### 4. bound

####매개변수가 없을 때: 현재 지도 영역을 반환한다

```{.javascript}
 map.bound();
//[33.4488882499644, 126.56798133906949, 33.45251321509635, 126.5733411966229]
```
  반환값
  * [첫째 좌표의 위도(Float),첫째 좌표의 경도(Float),둘째 좌표의 위도(Float),둘째 좌표의 경도(Float)]
  * 반환되는 좌표 규칙 [참조](http://apis.map.daum.net/web/documentation/#LatLngBounds)


####매개변수가 존재: 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다

####위도,경도,위도,경도 순으로 두개의 좌표를 전달했을 때

```{.javascript}
map.bound(33.4488882499644, 126.56798133906949, 33.45251321509635, 126.5733411966229);
//두 좌표가 보이도록 지도 확대 축소
```

  매개변수 
  * 보여야 할 첫째 좌표의 위도 값 (Float)
  * 보여야 할 첫째 좌표의 경도 값 (Float)
  * 보여야 할 둘째 좌표의 위도 값 (Float)
  * 보여야 할 둘째 좌표의 경도 값 (Float)

####두개의 marker 객체를 전달했을 때

```{.javascript}
map.bound(marker1,marker2);
//두 마커가 보이도록 지도 확대 축소
```

  매개변수 
  * 마커 객체 (Object)
  * 마커 객체 (Object)