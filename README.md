daum 지도 api easy
=======================

다음 지도를 사용하기 쉽게 만든 js입니다.

![Alt text](/image/mi.png)  
빨간색: 인포윈도우  
파란색: 마커

#포함하기

own.min.js를 daum map api 스크립트 소스 아래에 포함합니다.

    <script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
    <script src="/own.min.js"></script>
    
#예제

##1. 지도에 마커 올리기

###* 방법 (1) 마커객체 생성 후 map 메소드 사용

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


###* 방법 (2) 마커객체 생성 옵션에 map 넣기

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
    
    
###* 방법 (3) 마커객체를 배열에 넣어 markerMap 메소드 사용(여러개의 마커 사용시 편리)

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
      [marker1].markerMap(map); //마커 올리기
    </script>
    
    
##2. 다중 마커 사용

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
       
      markers.markerMap(map); //모든 마커를 map이라는 지도에 표시
      markers.markerRemove(); //모든 마커 지우기
    </script>


##3. 인포윈도우 생성

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


##4. 마커 위에 인포윈도우 생성

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
      
      var marker1=marker(mark1);
      var marker2=marker(mark2);
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
    
    
##5. 마커 클릭 이벤트에 인포윈도우 연결

###* 방법 (1) 마커의 on 메소드 사용

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
      
      var marker1=marker(mark1);
      var marker2=marker(mark2);
      marker1.map(map);
      marker2.map(map);
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
    

###* 방법 (2) 마커 배열의 markerClick 메소드 사용(여러개의 마커와 인포윈도우 사용시 편리)

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
      markers.push(marker(mark1));
      markers.push(marker(mark2));
      markers.markerMap(map);
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
      
      markers.markerClick(infows);
      //각 배열의 N번째 마커와 인포윈도우 클릭으로 연결
      
    </script>
    
    
# daumMap 객체
지도 객체

##생성자 함수: daumMap(container,options)

지도를 생성한다.

    var container = document.getElementById('map'),
      options = {
          lat: 33.450701,
      	  lng: 126.570667,
          level: 3
      };
      
    var map = daumMap(container, options);
    
매개변수
* options
  * center : 삭제
  * lat (Float): 중심좌표 위도 (필수)
  * lng (Float): 중심좌표 경도 (필수)
  * mapTypeId (String: ROADMAP , SKYVIEW , HYBRID 중 하나): 지도 종류
  * 나머지 [다음 지도](http://apis.map.daum.net/web/documentation/#Map)와 같음


##메소드

###center

매개변수가 없을 때: 중심좌표 실수 배열 반환
매개변수 존재: 위도,경도 값으로 중심좌표 변경

    map.center();
    //[33.450701,126.570667]
  
  반환값
  * latlng (Array): [위도 (Float), 경도 (Float)]


    map.center(33.450701,126.570667);
    //중심좌표 위도 33.450701 경도 126.570667 로 변경
    
  매개변수 
  * 위도 (Float)
  * 경도 (Float)