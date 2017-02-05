# DaumRoadView 객체


##생성자 함수: own.DaumRoadView(container, options)

객체를 생성한다.
```javascript
var container = document.getElementById('map'),
   roadView = new own.DaumRoadView(container);
```

  매개변수
  * container Node : 로드뷰를 생성할 엘리먼트
  * options (Object)
    * panoId (Number): 로드뷰 시작 지역의 고유 아이디 값.
    * panoX (Number): panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수평 좌표값.
    * panoY (Number): panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수직 좌표값.
    * pan (Number): 로드뷰 처음 실행시에 바라봐야 할 수평 각. 0이 정북방향. (0_360)
    * tilt (Number): 로드뷰 처음 실행시에 바라봐야 할 수직 각.(-90_90)
    * zoom (Number): 로드뷰 줌 초기값.(-3_3)


##메소드

### 1. panoId

####.panoId(): 파노라마 ID를 반환한다

```javascript
roadView.panoId();
```
  반환값
  * Number


####.panoId(options): 파노라마 ID를 지정한다

```javascript
var options = {
    panoId: 1023434522,
    position: [33.450701, 126.560667]
};

roadView.panoId(options);
```
  매개변수
  * options (Object)
    * panoId (Number): 파노라마 ID
    * position (Array)
        * (Number): 위도
        * (Number): 경도


### 2. [viewPoint](http://apis.map.daum.net/web/documentation/#Roadview_setViewpoint)

####.viewPoint(): 로드뷰 시점을 반환한다

```javascript
roadView.viewPoint();
```
  반환값
  * Viewpoint
    * pan (Number)
    * tilt (Number)
    * zoom (Number)
    * panoId (Number)

####.viewPoint(options): 로드뷰 시점을 지정한다

```javascript
roadView.viewPoint({
    pan: 10,
    tilt: 0,
    zoom: 0
});
```
  매개 변수
    * [viewpoint](http://apis.map.daum.net/web/documentation/#Viewpoint)


### 3. position

####.position(): 로드뷰가 보여주는 지점의 지도 좌표를 반환한다

```javascript
roadView.position();
```
  반환값
  * Array
    * (Number): 좌표의 위도값
    * (Number): 좌표의 경도값


####.position(options): 전달된 좌표에서 반경 내 가장 가까운 로드뷰 파노라마로 좌표를 변경한다

```javascript
var options = {
    position: [33.4488882499644, 126.56798133906949],
    radius: 30
};

roadView.position(options);
```
  매개변수
  * options (Object)
    * Array
        * (Number): 위도
        * (Number): 경도
    * radius (Number): 반경(미터 단위)


### 4. relayout

####.relayout(): 로드뷰 엘리먼트의 크기를 변경한 후에는 반드시 이 함수를 호출해야 한다.
플래시 로드뷰는 자동으로 영역을 잡는 경우가 있으나 모바일 로드뷰는 꼭 호출하도록 하자.
단, window의 resize 이벤트에 대해서는 자동으로 호출된다.

```javascript
roadView.relayout();
```


### 5. on
  
####.on(이벤트 이름,콜백함수): 로드뷰에 이벤트를 등록한다
  
```javascript
roadView.on('viewpoint_changed',function(){
  console.log("뷰포인트 변경!");
});
```

  매개변수
  * 이벤트 이름 (String)
  * 콜백함수 (Function)


### 6. off

####.off(이벤트 이름, 제거할 함수): 로드뷰의 이벤트를 제거한다
  
```javascript
var event= function(){
  console.log("뷰포인트 변경!");
};
roadView.on('viewpoint_changed', event);

roadView.off('viewpoint_changed', event);
```

  매개변수
  * 이벤트 이름 (String)
  * 제거할 함수 (Function)


### 7. trigger
  
####.trigger(이벤트 이름,데이터): 지도에 이벤트를 발생시킨다
  
```javascript
roadView.on("own_event",function(data){
  console.log(data);
});

roadView.trigger("own_event",'사용자 이벤트');
```

  매개변수 [로드뷰가 기본으로 일으키는 이벤트](http://apis.map.daum.net/web/documentation/#Roadview_Events)
  * 이벤트 이름 (String)
  * 데이터 (*) : 이벤트를 처리하는 함수에 넘길 변수