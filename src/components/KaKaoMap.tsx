import { useEffect, useRef } from 'react';
import { LocationInfoType } from '../pages/SearchStation';

declare global {
  interface Window {
    kakao: any;
  }
}

type SearchedLocationType = {
  RENT_NO: string;
  bikes: string;
  location: string;
  address: string;
  lat: string;
  lon: string;
};

type Props = {
  searchLocation?: LocationInfoType;
  searchResult?: SearchedLocationType[];
};

const KaKaoMap = ({ searchLocation, searchResult }: Props) => {
  const mapRef = useRef<any>(null);
  const latVal = searchLocation?.lat ? searchLocation?.lat : 37.5664056;
  const lonVal = searchLocation?.lon ? searchLocation?.lon : 126.9778222;

  const init = (map: any) => {
    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      console.log(mouseEvent.latLng);
    });
  };

  useEffect(() => {
    let container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(latVal, lonVal), // 지도의 중심좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    mapRef.current = map;

    // 검색된 위치에 메인 마커 표시
    const mainMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latVal, lonVal),
    });
    mainMarker.setMap(map);

    // 주변 대여소 마커 및 인포윈도우 설정
    if (searchResult) {
      searchResult.forEach(location => {
        const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lon);
        
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding:5px; text-align:center;">
              <strong>${location.location}</strong>
            </div>
          `,
        });

        // 마커에 마우스오버 이벤트 리스너를 등록하여 인포윈도우를 표시
        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });

        // 마커에 마우스아웃 이벤트 리스너를 등록하여 인포윈도우를 닫기
        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });

        marker.setMap(map); // 마커를 지도에 표시
      });
    }

    init(map);

    // 윈도우 리사이즈 이벤트 리스너 추가
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.relayout();
      }
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchLocation, searchResult]);

  return <div id="map" className="w-full h-full" />;
};

export default KaKaoMap;
