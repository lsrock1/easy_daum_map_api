daum 지도 api easy
=======================

다음 지도를 사용하기 쉽게 만든 js입니다.



#포함하기

own.js를 다운받아서 daum map api 스크립트 소스 아래에 포함합니다.

    <script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
    <script src="/own.js"></script>
    
#예제

###지도에 마커 올리기

####*방법 (1) 마커객체 생성 후 map 메소드 사용

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


####*방법 (2) 마커객체 생성 옵션에 map 넣기

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
    
    
####*방법 (3) 마커객체를 배열에 넣어 markerMap 메소드 사용(여러개의 마커 사용시 편리)

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
    
    
###다중 마커 사용

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


###인포윈도우 생성

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


###마커 위에 인포위도우 생성

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
    
    
###마커 클릭 이벤트에 인포윈도우 연결

####*방법 (1) 마커의 on 메소드 사용

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
    

####*방법 (2) 마커 배열의 markerClick 메소드 사용(여러개의 마커와 인포윈도우 사용시 편리)

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
    
##1.2 daumMap