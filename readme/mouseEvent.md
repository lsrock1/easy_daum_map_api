# mouseEvent 객체
마우스 이벤트 객체  
특별한 이벤트들(click, dbclick, rightclick, mousemove)의 경우 콜백함수로 mouseEvent 객체를 전달합니다.  
이 객체를 활용해 해당 이벤트가 일어난 위도, 경도 또는 지도 안 포인트를 알 수 있습니다.  
  
##메소드

### .position() : 지도 좌표 반환
  
```javascript
map.on('click',function(mouseEvent){
  alert(mouseEvent.position());
});
//지도를 클릭했을 때 지도 위 경도를 알림창으로 띄우는 이벤트를 등록합니다

map.on("click",function(mouseEvent){
  alert(mouseEvent.point());
});
//지도를 클릭했을 때 지도 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```
  반환값
  * Array [좌표의 위도(Float),좌표의 경도(Float)]


### .point() : 화면 좌표 반환
  
```javascript
map.on("click",function(mouseEvent){
  alert(mouseEvent.point());
});
//지도를 클릭했을 때 화면 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```
  반환값
  * Array [좌표의 X(Number),좌표의 Y(Number)]