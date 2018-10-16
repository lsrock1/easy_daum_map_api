# CustomOverlay 객체
커스텀 오버레이 객체

## 생성자 함수: own.CustomOverlay(options)

객체를 생성한다.
```javascript
var options = {
      content: '<div class="placeinfo_wrap"><div class="placeinfo"><a class="title" >일번</a><span>'+
              '<span style="text-align: right;" class="close">&times;</span>'+
              '</span></div><div class="after"></div></div>',
      clickable: true,
  };

var customOverlay = new own.CustomOverlay(options);
```

  매개변수
  * options (Object)
    * map (DaumMap Object): 마커가 올라갈 지도
    * position (Array)
        * (Number): 위도
        * (Number): 경도
    * title (String): 마커 엘리먼트의 타이틀 속성 값 (툴팁)
    * clickable (Boolean): 클릭 가능한 마커
    * zIndex (Number): 마커 엘리먼트의 z-index 속성 값
    * content (Node | String): 엘리먼트 또는 HTML 문자열 형태의 내용
    * xAnchor (Number): 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
    * yAnchor (Number): 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5


## 메소드

### 1. open

#### .open(): 해당 마커 위치에 커스텀 오버레이를 띄운다 

```javascript
customOverlay.open(marker);
```
  매개변수
  * Marker


### 2. onClose

####.onClose(name): 커스텀 오버레이 안 close 클래스를 가진 요소를 클릭 이벤트에 오버레이를 닫는 작업을 연결합니다
인포윈도우의 removable과 비슷한 역할을 하지만  
이 메소드는 자동으로 x 버튼을 만들지 않고  
사용자가 close 클래스를 지정한 요소를 클릭하면 커스텀 오버레이가 사라지게 만듭니다
```javascript
customOverlay.onClose('customOverlay');
```
  매개변수
  * name (String): 커스텀 오버레이의 변수명


### 3. map

#### .map(): 커스텀 오버레이가 올라간 지도를 반환한다 

```javascript
customOverlay.map();
```
  반환값
  * DaumMap


#### .map(map): 지도 또는 로드뷰에 커스텀 오버레이를 올린다

```javascript
customOverlay.map(map);
```
  매개변수
  * map (DaumMap)


### 4. close

#### .close(): 커스텀 오버레이를 닫는다 

```javascript
customOverlay.close();
```


### 5. position

#### .position(): 커스텀 오버레이의 좌표를 반환한다

```javascript
customOverlay.position();
```
  반환값
  * Array
    * (Number): 좌표의 위도값
    * (Number): 좌표의 경도값


#### .position(position): 커스텀 오버레이의 좌표를 지정한다

```javascript
customOverlay.position([33.4488882499644, 126.56798133906949]);
```
  매개변수
  * position (Array)
    * (Number): 위도
    * (Number): 경도


### 6. content

#### .content(): 커스텀 오버레이의 내용을 지정했던 형태로 반환한다

```javascript
customOverlay.content();
```
  반환값
  * Node | String


#### .content(content): 커스텀 오버레이의 내용을 지정한다

```javascript
customOverlay.content('This is all for you');
```
  매개변수
  * content (Node | String)


### 7. visible

#### .visible(): 커스텀 오버레이의 표시 여부를 반환한다

```javascript
customOverlay.visible();
```
  반환값
  * Boolean


#### .visible(visible): 커스텀 오버레이의 표시 여부를 지정한다

```javascript
customOverlay.visible(false);
```
  매개변수
  * visible (Boolean)


### 8. zIndex

#### .zIndex(): 커스텀 오버레이의 z-Index를 반환한다

```javascript
customOverlay.zIndex();
```
  반환값
  * Number


#### .zIndex(zIndex): 커스텀 오버레이의 z-index를 설정한다

```javascript
customOverlay.zIndex(3);
```
  매개변수
  * zIndex (Number)


### 9. altitude

#### .altitude(): 커스텀 오버레이의 높이(위치)를 반환한다

```javascript
customOverlay.altitude();
```
  반환값
  * Number


#### .altitude(altitude): 로드뷰상에서 커스텀 오버레이의 높이(위치)를 지정한다
[참고](http://apis.map.daum.net/web/documentation/#CustomOverlay_setAltitude)
```javascript
customOverlay.altitude(10);
```
  매개변수
  * altitude (Number)


### 10. range

#### .range(): 커스텀 오버레이의 가시반경을 반환한다

```javascript
customOverlay.range();
```
  반환값
  * Number


#### .range(range): 커스텀 오버레이의 가시반경을 설정한다

```javascript
customOverlay.range(10);
```
  매개변수
  * range (Number)


### 11. on
  
#### .on(이벤트 이름,콜백함수): 커스텀 오버레이에 이벤트를 등록한다
  
```javascript
customOverlay.on('click',function(){
  console.log("클릭!");
});
```

  매개변수
  * 이벤트 이름 (String)
  * 콜백함수 (Function)


### 12. off

#### .off(이벤트 이름, 제거할 함수): 커스텀 오버레이의 이벤트를 제거한다
  
```javascript
var event= function(){
  console.log("커서가 올라왔습니다");
};
customOverlay.on('mouseover', event);

customOverlay.off('mouseover', event);
```

  매개변수
  * 이벤트 이름 (String)
  * 제거할 함수 (Function)
