# InfoWindow 객체
인포윈도우 객체

##생성자 함수: own.InfoWindow(options)

객체를 생성한다.
```javascript
var options = {
      position: [33.450701,126.570667],
      map: map
  };

var infoWindow = new own.InfoWindow(options);
```

  매개변수
  * options (Object)
    * map (DaumMap | DaumRoadview): 인포윈도우가 올라갈 지도 또는 로드뷰
    * position (Array): [인포윈도우의 좌표 위도 (Number), 인포윈도우의 좌표 경도 (Number)]
    * content (Node | String): 엘리먼트 또는 HTML 문자열 형태의 내용
    * disableAutoPan (Boolean): 인포윈도우를 열 때 지도가 자동으로 패닝하지 않을지의 여부 (기본값: false)
    * removable (Boolean): 삭제 가능한 인포윈도우
    * zIndex (Number): 인포윈도우 엘리먼트의 z-index 속성 값
    * altitude (Number): 로드뷰에 올라있는 인포윈도우의 높이 값(m 단위)
    * range (Number): 로드뷰 상에서 인포윈도우의 가시반경(m 단위), 두 지점 사이의 거리가 지정한 값보다 멀어지면 인포윈도우는 보이지 않게 된다


##메소드

### 1. open

####.open(): 해당 마커 위에 인포윈도우를 띄운다 

```javascript
infoWindow.open(marker);
```
  매개변수
  * Marker

### 2. close

####.close(): 인포윈도우를 닫는다 

```javascript
infoWindow.close();
```


### 3. map

####.map(): 인포윈도우가 올라간 지도를 반환한다 

```javascript
infoWindow.map();
```
  반환값
  * DaumMap
 

### 4. position

####.position(): 인포윈도우의 좌표를 반환한다

```javascript
infoWindow.position();
```
  반환값
  * Array
    * (Number): 좌표의 위도값
    * (Number): 좌표의 경도값


####.position(position): 인포윈도우의 좌표를 지정한다

```javascript
infoWindow.position([33.4488882499644, 126.56798133906949]);
```
  매개변수
  * position (Array)
    * (Number): 위도
    * (Number): 경도


### 5. content

####.content(): 인포윈도우의 내용을 지정했던 형태로 반환한다

```javascript
infoWindow.content();
```
  반환값
  * Node | String


####.content(content): 인포윈도우의 내용을 지정한다

```javascript
infoWindow.content('This is all for you');
```
  매개변수
  * content (Node | String)


### 6. zIndex

####.zIndex(): 인포윈도우의 z-Index를 반환한다

```javascript
infoWindow.zIndex();
```
  반환값
  * Number


####.zIndex(zIndex): 인포윈도우의 z-index를 설정한다

```javascript
infoWindow.zIndex(3);
```
  매개변수
  * zIndex (Number)


### 7. altitude

####.altitude(): 인포윈도우의 높이(위치)를 반환한다

```javascript
infoWindow.altitude();
```
  반환값
  * Number


####.altitude(altitude): 로드뷰상에서 인포윈도우의 높이(위치)를 지정한다
[참고](http://apis.map.daum.net/web/documentation/#InfoWindow_setAltitude)
```javascript
infoWindow.altitude(10);
```
  매개변수
  * altitude (Number)


### 8. range

####.range(): 인포윈도우의 가시반경을 반환한다

```javascript
infoWindow.range();
```
  반환값
  * Number


####.range(range): 인포윈도우의 가시반경을 설정한다

```javascript
infoWindow.range(10);
```
  매개변수
  * range (Number)