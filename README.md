daum 지도 api easy
=======================

다음 지도를 사용하기 쉽게 만든 js입니다.



#포함하기

own.js를 다운받아서 daum map api 스크립트 소스 아래에 포함합니다.

    <script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
    <script src="/own.js"></script>
    
#예제

지도에 마커 올리기

*방법 (1) 마커객체 생성 후 map 메소드 사용

    <div id="map" style="width:500px;height:400px;"></div>
    <script>
      svar container=document.getElementById("map");
      var options = {
      	lat: 33.450701,
      	lng: 126.570667,
      	level: 3
      };
       
      var map=daumMap(container,options); //지도 초기화
       
      var mark={
      	lat: 33.450701,
      	lng: 126.570667,
      }
      //마커 옵션
      
      var marker1=marker(mark); //마커객체 생성
      marker1.map(map); //마커를 지도에 표시
      marker1.remove(); //마커 지우기
    </script>


*방법 (2) 마커객체 생성 옵션에 map 넣기

    <div id="map" style="width:500px;height:400px;"></div>
    <script>
      svar container=document.getElementById("map");
      var options = {
      	lat: 33.450701,
      	lng: 126.570667,
      	level: 3
      };
       
      var map=daumMap(container,options); //지도 초기화
       
      var mark={
      	lat: 33.450701,
      	lng: 126.570667,
      	map: map
      }
      //마커 옵션
      
      var marker1=marker(mark1); //마커객체 생성
      marker1.map(map); //마커를 지도에 표시
      marker1.remove(); //마커 지우기
    </script>
    
    
*방법 (3) 마커객체를 배열에 넣어 markerMap 메소드 사용(여러개의 마커 사용시 편리)

    <div id="map" style="width:500px;height:400px;"></div>
    <script>
      svar container=document.getElementById("map");
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
    
    
다중 마커 사용

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


인포윈도우 생성

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
        map: map,
        lat: 33.450701,
        lng: 126.570667
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


마커 위에 인포위도우 생성

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
    
    
마커 클릭 이벤트에 인포윈도우 연결

*방법 (1) 마커의 on 메소드 사용

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
    

*방법 (2) 마커 배열의 markerClick 메소드 사용(여러개의 마커와 인포윈도우 사용시 편리)

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
#1. daumMap 객체


##1.1 생성자

    var container=document.getElementById("map");
    //지도를 표시할 DOM
     
    var options = {
    	lat: 33.450701,  //필수, 지도 중심좌표의 위도
    	lng: 126.570667, //필수, 경도
    	level: 3, //선택, 지도의 확대, 축소 정도. 기본값: 3
    	mapTypeId: 'ROADMAP', //선택, 지도 종류 'HYBRID' 'ROADMAP' 'SKYVIEW' 중 하나. 기본값: 'ROADMAP'
    	draggable: true, //선택, 드래그 가능 설정 기본값: true
    	scrollwheel: true, //선택, 마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
        disableDoubleClick: true, //선택, 더블클릭 이벤트 및 더블클릭 확대 가능 여부
        disableDoubleClickZoom: true, //선택, 더블클릭 확대 가능 여부
        tileAnimation: true, //선택, 지도 타일 애니메이션 설정 여부
        keyboardShortcuts: false //선택, 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부
    };
    //지도 생성 옵션
     
    var map=daumMap(container,options);
    //daumMap 객체 반환 및 지도 초기화
    
##1.2 daumMap 메소드


###1.2.1 center

중심좌표 이동 및 현재 중심좌표 반환 (setCenter, getCenter)
http://apis.map.daum.net/web/documentation/#Map_setCenter

    //현재 중심좌표를 정수배열로 반환
    map.center();
    //[33.450701,126.570667]
     
    //위도와 경도를 전달해 중심좌표를 이동
    map.center(34.450701,127.570667);
    //34.450701,127.570667 로 이동
    

###1.2.2 level

지도의 확대 수준 설정 및 반환 (setLevel, getLevel)  
맵 타입에 따라 확대 가능 수준이 다름 자세한 사항은 doc 참고  
http://apis.map.daum.net/web/documentation/#Map_setLevel

    //현재 지도 확대 수준 정수로 반환
    map.level();
    //3
     
    //정수를 전달해 확대 수준 변경
    map.level(10);
    //확대수준을 10으로 변경


###1.2.3 mapTypeId

지도 종류 변경 및 현재 종류 반환 (setMapTypeId, getMapTypeId)  
지도의 종류에 관한 사항 doc 참고  
http://apis.map.daum.net/web/documentation/#Map_setMapTypeId

    //지도의 종류를 문자열로 반환
    map.mapTypeId();
    //'SKYVIEW'
     
    //'ROADMAP' 'SKYVIEW' 'HYBRID' 세가지 종류를 문자열로 전달
    map.mapTypeId('ROADMAP');
    //지도종류 변경


###1.2.4 bound

레벨과 좌표를 변경해 Bound 영역을 지도 안에 나타내거나 현재 영역 반환 (setBounds, getBounds)

    map.bound();
    //정수 배열 [33.443431839028484, 126.564911080311, 33.457930846656026, 126.5863513426475]
     
    map.bound(33.443431839028484, 126.564911080311, 33.457930846656026, 126.5863513426475);
    //위도,경도 위도,경도 순으로 전달
    //두 좌표가 다 나오도록 지도 설정
     
    map.bound(marker1,marker2);
    //마커 객체를 전달해서 두 마커가 다 나오도록 설정 가능


##1.2.5 pan
부드럽게 이동 (panBy, panTo)