import { useEffect, useRef } from 'react'
import { LocationInfoType } from '../pages/SearchStation';

declare global {
  interface Window {
    kakao: any;
  }
}

type searchedLocationType = {
  RENT_NO: string;
  bikes: string;
  location: string;
  address: string;
  lat: string;
  lon: string;
}

type Props = {
  searchLocation?: LocationInfoType,
  searchResult?: searchedLocationType[],
}

const KaKaoMap = ({searchLocation, searchResult}: Props) => {
  const mapRef = useRef<any>(null);
  const latVal = searchLocation?.lat ? searchLocation?.lat : 37.5664056;
  const lonVal = searchLocation?.lon ? searchLocation?.lon : 126.9778222;
  
  // marker 좌표 (여러개)
  const markers: any[] = [
    new window.kakao.maps.LatLng(latVal, lonVal),
  ]

  const setMarkers = (map: any) => {
    markers.forEach((obj) => {
      new window.kakao.maps.Marker({
        map: map,
        position: obj,
        title:'테스트'
      })
    })
  }

  const init = (map: any) => {
    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: any){
        console.log(mouseEvent.latLng)
      }
    )
  }

  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(latVal, lonVal), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    mapRef.current = map;

    const mainMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latVal, lonVal)
    })

    if(searchResult){
      searchResult.forEach(location => {
        const marker = new window.kakao.maps.LatLng(location.lat, location.lon)
        markers.push(marker);
      })
    }

    init(map);
    mainMarker.setMap(map) // main marker (검색한 곳)
    setMarkers(map); // 주변 대여소 marker

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
  }, [searchLocation, searchResult])

  return (
    <div id='map' className='w-full h-full' />
  )
}

export default KaKaoMap