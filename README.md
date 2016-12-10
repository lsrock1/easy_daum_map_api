daum 지도 api easy wrap
=======================

다음 지도를 사용하기 쉽게 만든 js입니다.



#포함하기

own.js를 다운받아서 daum map api 스크립트 소스 다음에 포함합니다.

    <script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
    <script src="/own.js"></script>
    
#지도 초기화

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
    
#daumMap 메소드

중심좌표 옮기기 및 현재중심좌표 반환

    map.center();
    //[33.450701,126.570667]
     
    map.center(34.450701,127.570667);
    //map의 중심좌표를 34.450701,127.570667 로 이동
    

지도의 확대 수준 설정 및 반환
맵 타입에 따라 확대 가능 수준이 다른데 자세한 사항은 doc 참고
[링크]
http://apis.map.daum.net/web/documentation/#Map_setLevel

    map.level();
    //3
     
    map.level(10);
    //map의 확대수준을 10으로 변경
