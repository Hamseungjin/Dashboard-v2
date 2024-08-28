import { useEffect, useState } from "react";
import KaKaoMap from "../components/KaKaoMap";
import axios from "axios";
import Loader from "../components/Loader";
import SearchLocationResult from "../components/SearchLocationResult";

declare global {
  interface Window {
    kakao: any;
  }
}

export type LocationInfoType = {
  location?: string;
  lon?: number;
  lat?: number;
};

const SearchStation = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchLocation, setSearchLocation] = useState<LocationInfoType>();
  const [showResults, setShowResults] = useState<boolean>(false);

  const fetchDdarungiData = async () => {
    setIsLoading(true);
    try {
      const data1 = await axios.get(
        "http://openapi.seoul.go.kr:8088/5a565a784f6a6968313235666f786272/json/bikeList/1/500/"
      );
      const data2 = await axios.get(
        "http://openapi.seoul.go.kr:8088/5a565a784f6a6968313235666f786272/json/bikeList/501/1000/"
      );

      const stationsData = [...data1.data.rentBikeStatus.row, ...data2.data.rentBikeStatus.row];
      return stationsData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput) {
      e.preventDefault();
      let geocoder = new window.kakao.maps.services.Geocoder();
      const response = async (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const formData = {
            location: result[0].address_name,
            lon: Number(result[0].x),
            lat: Number(result[0].y),
          };
          setSearchLocation(formData);
          setShowResults(true);
        }
      };
      geocoder.addressSearch(searchInput, response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!searchLocation) return;

      const stationsData = await fetchDdarungiData();
      const nearByStations = stationsData.filter((station: any) => {
        const stationLat = parseFloat(station.stationLatitude);
        const stationLon = parseFloat(station.stationLongitude);

        return (
          stationLat >= searchLocation.lat! - 0.009 &&
          stationLat <= searchLocation.lat! + 0.009 &&
          stationLon >= searchLocation.lon! - 0.009 &&
          stationLon <= searchLocation.lon! + 0.009
        );
      });

      const formattedStations = nearByStations.map((station: any) => {
        return {
          RENT_NO: station.stationId,
          bikes: station.parkingBikeTotCnt,
          location: station.stationName.split(". ")[1] || station.stationName,
          lat: station.stationLatitude,
          lon: station.stationLongitude,
        };
      });

      setSearchResult(formattedStations);
    };
    fetchData();
  }, [searchLocation]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-grow relative">
        {/* Full screen map */}
        <div className="absolute inset-0">
          <KaKaoMap searchLocation={searchLocation} searchResult={searchResult} />
        </div>

        {/* Search input */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/2 z-10">
          <input
            type="text"
            className="w-full p-2 rounded-lg border-2 border-blue-500 focus:outline-none focus:border-blue-700"
            placeholder="주소를 입력하면 주소지 근처 대여소를 찾습니다."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Toggle button for results */}
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg z-10"
          onClick={() => setShowResults(!showResults)}
        >
          {showResults ? "결과 숨기기" : "결과 보기"}
        </button>

        {/* Search results overlay */}
        {showResults && (
          <div className="absolute top-16 right-4 bg-white w-100 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-lg shadow-lg z-20 p-4">
            <h2 className="text-xl font-semibold mb-4">대여소 검색 결과</h2>
            {isLoading ? (
              <div className="flex items-center gap-2 justify-center">
                <Loader />
                <span className="font-semibold">근처 대여소를 찾는 중입니다...</span>
              </div>
            ) : (
              <div>
                {!searchResult || searchResult.length === 0 ? (
                  <div>근처에 대여소가 없습니다. 다른 검색어를 입력해 주세요.</div>
                ) : (
                  <div>
                    <p className="text-slate-500 text-sm mb-4">
                      입력하신 '{searchLocation!.location}' 근처에 위치한 {searchResult.length}개의 정류소를 찾았습니다.
                    </p>
                    {searchResult.map((station: any) => (
                      <SearchLocationResult
                        key={station.RENT_NO}
                        bikes={station.bikes}
                        location={station.location}
                        address=""  // Pass an empty string or remove this prop if address is not needed
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchStation;
