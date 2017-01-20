daum 지도 api easy
=======================
#목적
다음 지도를 사용하기 쉽게 만든 js입니다  
쉬운 인터페이스를 구현하는 것을 목표로 합니다  
다음에서 제공하는 객체들을 가능한 직접 사용하지 않습니다  
제이쿼리스러운 메소드를 추구합니다(메소드 체인 가능)  
물론 own.js 없이 다음 api를 사용하는게 자유도는 더 높습니다  
  
#포함하기

own.min.js를 daum map api 스크립트 소스 아래에 포함합니다.

```javascript

<script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
<script src="/own.min.js"></script>

```

#예제

##1. 지도에 마커 올리기
![Alt text](/image/marker.png)
###* 방법 (1) 마커객체 생성 후 map 메소드 사용

```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701, //지도의 중심 위도
  	lng: 126.570667,//지도의 중심 경도
  	level: 3 //확대 축소 정도
  };
   
  var map= new daumMap(container,options); //지도 초기화
   
  var mark={
  	lat: 33.450701, //마커의 위도
  	lng: 126.570667,//마커의 경도
  }
  //마커 옵션
  
  var marker1= new marker(mark); //마커객체 생성
  marker1.map(map); //마커를 지도에 표시
  marker1.remove(); //마커 지우기
</script>
```

###* 방법 (2) 마커객체 생성 옵션에 map 넣기

```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map= new daumMap(container,options); //지도 초기화
   
  var mark={
  	lat: 33.450701,
  	lng: 126.570667,
  	map: map //마커를 생성할 지도
  }
  //마커 옵션
  
  var marker1=new marker(mark1); //마커객체 생성
  marker1.remove(); //마커 지우기
</script>
```  
    
###* 방법 (3) easyMap의 markerMap 매소드 사용(여러개의 마커 사용시 편리)

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
   
  var mark={
  	lat: 33.450701,
  	lng: 126.570667
  }
  //마커 옵션
  
  var marker1=new marker(mark1); //마커객체 생성
  var easyMap=new easyMap(); //easyMap 생성
  easyMap.markerMap([marker1],map) //마커 올리기
</script>
```    
    
##2. 다중 마커 사용
![Alt text](/image/markers.png)
```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=new daumMap(container,options); //지도 초기화
  
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
  markers.push(new marker(mark1)); //첫 번째 마커객체 생성 markers 배열에 삽입
  markers.push(new marker(mark2)); //두 번째 마커객체 생성 markers 배열에 삽입
  var easyMap=new easyMap(); //easyMap 생성
  easyMap.markerMap(markers,map); //모든 마커를 map이라는 지도에 표시
  easyMap.markerRemove(markers); //모든 마커 지우기
</script>
```

##3. 인포윈도우 생성
![Alt text](/image/info.png)
```javascript
<div id="map" style="width:500px;height:400px;"></div>
<script>
  var container=document.getElementById("map");
  var options = {
  	lat: 33.450701,
  	lng: 126.570667,
  	level: 3
  };
   
  var map=new daumMap(container,options); //지도 초기화
   
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
  
  var infow1=new infoWindow(info1);
  var infow2=new infoWindow(info2);
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
   
  var map=new daumMap(container,options); //지도 초기화
  
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
  markers.push(new marker(mark1));
  markers.push(new marker(mark2));
  var easyMap=new easyMap(); //easyMap 생성
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
  
  var infow1=new infoWindow(info1);
  var infow2=new infoWindow(info2);
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
   
  var map=new daumMap(container,options); //지도 초기화
  
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
  markers.push(new marker(mark1));
  markers.push(new marker(mark2));
  var easyMap=new easyMap(); //easyMap 생성
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
  
  var infow1=new infoWindow(info1);
  var infow2=new infoWindow(info2);
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
  
  var map=new daumMap(container,options); //지도 초기화
  
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
  markers.push(new marker(mark1));
  markers.push(new marker(mark2));
  var easyMap=new easyMap(); //easyMap 생성
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
  infows.push(new infoWindow(info1));
  infows.push(new infoWindow(info2));
  //인포윈도우 생성
  
  easyMap.markerClick(markers,infows);
  //각 배열의 N번째 마커와 인포윈도우 클릭으로 연결
  
</script>
```
  
##6. 닫기 가능한 다중 커스텀 오버레이 띄우기
![Alt text](/image/coverlay.png)  
오버레이의 css는 [다음 공식 api 예제](http://apis.map.daum.net/web/sample/categoryFromBounds/)를 참고했습니다.
괜찮은 커스텀 오버레이 css는 다음 공식 예제 [여기](http://apis.map.daum.net/web/sample/removableCustomOverlay/)에서 참고하시면 됩니다  


```javascript
<style type="text/css">
  .placeinfo_wrap {position:absolute;bottom:28px;left:-90px;width:180px;}
  .placeinfo {position:relative;width:100%;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;padding-bottom: 10px;background: #fff;}
  .placeinfo:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
  .placeinfo_wrap .after {content:'';position:relative;margin-left:-12px;left:50%;width:22px;height:10px;background:url('http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
  .placeinfo a, .placeinfo a:hover, .placeinfo a:active{color:#fff;text-decoration: none;}
  .placeinfo a, .placeinfo span {display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
  .placeinfo span {margin:5px 5px 0 5px;cursor: default;font-size:13px;}
  .placeinfo .title {font-weight: bold; font-size:14px;border-radius: 6px 6px 0 0;margin: -1px -1px 0 -1px;padding:10px; color: #fff;background: #002D56;background: #002D56 url(http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
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
   
  var map=new daumMap(container,options); //지도 초기화
  
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
    markers.push(new marker(option));
  });
  //마커 객체 생성
  
  var cOptions=[
    {
      content:'<div class="placeinfo_wrap"><div class="placeinfo"><a class="title" >일번</a><span>'+
              '<span style="text-align: right;" class="close">&times;</span>'+
              '</span></div><div class="after"></div></div>',
      clickable: true,
    },
    {
      content:'<div class="placeinfo_wrap"><div class="placeinfo"><a class="title" >이번</a><span>'+
              '<span style="text-align: right;" class="close">&times;</span>'+
              '</span></div><div class="after"></div></div>',
      clickable: true,
    }
  ]
  //커스텀 오버레이 옵션
  
  var overlays=[];
  //오버레이들을 저장할 배열
  
  cOptions.forEach(function(option){
    overlays.push(new customOverlay(option));
  });
  //오버레이 객체 생성
  var easyMap=new easyMap(); //easyMap 생성
  
  easyMap.customOverlayOnClose(overlays,'overlays');
  //clickable 옵션과 비슷한 역할을 합니다
  //오버레이 요소 중 close 클래스를 가진 요소에 close 이벤트를 등록합니다
  //첫 번째 인자로 오버레이들이 담긴 배열을 두 번째 인자로 배일의 이름을 전달합니다
  //함수가 실행된 후 close 클래스를 가진 button을 클릭하면 개별 오버레이가 닫히게 됩니다
  
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

#[daumMap 객체](/readme/daumMap.md#daummap-객체)
#[mouseEvent 객체](/readme/mouseEvent.md#mouseEvent-객체)
#[marker 객체](/readme/marker.md#marker-객체)
#[infoWindow 객체]()
#[customOverlay 객체]()