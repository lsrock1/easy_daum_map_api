# mouseEvent 객체
마우스 이벤트 객체  
특별한 이벤트들(click, dbclick, rightclick, mousemove)의 경우 콜백함수로 mouseEvent 객체를 전달합니다.  
이 객체를 활용해 해당 이벤트가 일어난 위도, 경도 또는 지도 안 포인트를 알 수 있습니다.  
  
##생성자 함수 .returnMouse(mouseEvent)
이벤트가 발생해서 콜백함수로 전달된 mouseEvent 인자를  
다음에서 만든 mouseEvent가 맞을 경우 mouseEvent 객체로 바꿔서 반환합니다.
```javascript
map.on('click',function(mouseEvent){
  new returnMouseEvent(mouseEvent);
  //mouseEvent 객체 반환
});
```

##메소드

### .position() : 지도 좌표 반환
  
```javascript
map.on('click',function(mouseEvent){
  mouseEvent=new returnMouseEvent(mouseEvent);
  alert(mouseEvent.position());
});
//지도를 클릭했을 때 지도 위 경도를 알림창으로 띄우는 이벤트를 등록합니다

map.on("click",function(mouseEvent){
  mouseEvent=new returnMouseEvent(mouseEvent);
  alert(mouseEvent.point());
});
//지도를 클릭했을 때 지도 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```
  반환값
  * Array
    * (Number): 좌표의 위도
    * (Number): 좌표의 경도


### .point() : 화면 좌표 반환
  
```javascript
map.on("click",function(mouseEvent){
  alert(mouseEvent.point());
});
//지도를 클릭했을 때 화면 좌표를 알림창으로 띄우는 이벤트를 등록합니다
```
  반환값
  * Array 
    * (Number): 좌표의 X
    * (Number): 좌표의 Y