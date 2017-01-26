# marker 객체
마커 객체

##생성자 함수: marker(options)

객체를 생성한다.
```javascript
var options = {
      position: [33.450701,126.570667],
      map: map
  };

var mark = new marker(options);
```

  매개변수
  * options (Object)
    * map (daumMap Object): 마커가 올라갈 지도
    * position (Array): [마커의 좌표 위도 (Number), 마커의 좌표 경도 (Number)]
    * image (MarkerImage) : 마커의 이미지
    * title (String) : 마커 엘리먼트의 타이틀 속성 값 (툴팁)
    * draggable (Boolean) : 드래그 가능한 마커, 로드뷰에 올릴 경우에는 유효하지 않다
    * clickable (Boolean) : 클릭 가능한 마커
    * zIndex (Number) : 마커 엘리먼트의 z-index 속성 값
    * opacity (Number) : 마커 투명도 (0-1)
    * altitude (Number) : 로드뷰에 올라있는 마커의 높이 값(m 단위)
    * range (Number) : 로드뷰 상에서 마커의 가시반경(m 단위), 두 지점 사이의 거리가 지정한 값보다 멀어지면 마커는 로드뷰에서 보이지 않게 된다


##메소드

### 1. map

####.map(): 마커가 올라가있는 daumMap 객체를 반환한다 

```javascript
mark.map();
```
  반환값
  * daumMap Object


####.map(map): 지도에 마커를 올린다

```javascript
mark.map(map);
```

  매개변수 
  * map (daumMap Object)


### 2. remove

####.remove(): 지도에서 마커를 제거한다 

```javascript
mark.remove();
```


### 3. image

####.image(): 마커의 이미지를 반환한다

```javascript
mark.image();
```
  반환값
  * 마커이미지 (MarkerImage)


####.image(지도 종류): 마커에 새 이미지를 지정한다

```javascript
mark.image(image);
```

  매개변수 
  * image (MarkerImage)


### 4. position

####.position(): 마커의 좌표를 반환한다

```javascript
 mark.position();
//[33.450701, 126.570667]
```
  반환값
  * Array
    * (Number): 첫째 좌표의 위도
    * (Number): 첫째 좌표의 경도
    * (Number): 둘째 좌표의 위도
    * (Number): 둘째 좌표의 경도


####.position(options): 마커의 좌표를 지정한다

####마커 위치 지정

```javascript
var options={
  lat : 33.4488882499644,
  lng : 126.56798133906949
}
mark.position(options);
```

  매개변수
  * options (Object)
    * lat (Number): 좌표의 위도 값
    * lng (Number): 좌표의 경도 값


####로드뷰 위치 지정

```javascript
var options={
  pan : 30,
  tilt : -10,
  zoom : 0,
  panoId : 1033283653
}
marker.position(options);
```

  매개변수 [참조](http://apis.map.daum.net/web/documentation/#Viewpoint)
  * options (Object)
    * pan (Number): 가로 각도, 0부터 360 사이의 값으로 북쪽부터 시계방향으로 대응한다
    * tilt (Number): 세로 각도, -90부터 90 사이의 값으로 위쪽부터 아래쪽으로 대응한다
    * zoom (Number): 확대 수준, -3부터 3 사이의 정수이다
    * panoId (Number): 특정 위치의 로드뷰 고유의 아이디 값


### 5. zIndex

####.zIndex(): 마커의 z-Index를 반환한다

```javascript
marker.zIndex();
```
  반환값
  * Number


####.zIndex(zIndex): 마커의 z-index를 설정한다

```javascript
marker.zIndex(3);
```
  매개변수
  * zIndex (Number)

