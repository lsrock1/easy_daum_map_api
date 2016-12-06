daum 지도 api easy wrap
=======================

다음 지도를 사용하기 쉽게 만든 js입니다.

사용법
---------------

#포함하기

own.js를 다운받아서 daum map api 스크립트 소스 다음에 포함합니다.

    <script src="//apis.daum.net/maps/maps3.js?apikey=본인 api 키"></script>
    <script src="/own.js"></script>
    
#지도 초기화

지도를 표시할 DOM과 옵션을 생성합니다.
LatLng 객체를 생성해서 center를 잡는 대신 원하는 위도 경도를 lat: lng: 로 넣습니다.
지도 종류도 객체를 생성해서 넣는 대신 원하는 지도의 문자열을 입력합니다.
나머지는 다음 지도와 옵션 설정이 똑같습니다.

    var container=document.getElementById("map");
    var options = { //지도를 생성할 때 필요한 기본 옵션
    	lat: 33.450701,  //필수, 지도 중심좌표의 위도
    	lng: 126.570667, //필수, 경도
    	level: 3, //지도의 확대, 축소 정도. 기본값: 3
    	mapTypeId: 'ROADMAP',//지도 종류 'HYBRID' 'ROADMAP' 'SKYVIEW' 중 하나. 기본값: 'ROADMAP'
    };
    var map=daumMap(container,options);
    //daumMap 객체 반환 및 지도 초기화
    
#daumMap 메소드

