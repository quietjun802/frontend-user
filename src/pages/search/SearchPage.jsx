import React, { useState, useEffect } from "react";
import HotelTypesTabs from "../../components/search/HotelTypesTabs";
import HotelResultsHeader from "../../components/search/HotelResultsHeader";
import HotelListCards from "../../components/search/HotelListCards";
import "../../styles/components/search/SearchPage.scss";
// mock 데이터 사용
import { mockHotels } from "../../api/mockHotels"; 

const SearchPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHotels(mockHotels);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="search-page loading">Loading hotels...</div>;
  }

  return (
    <div className="search-page">

      {/* 호텔 타입 탭 */}
      <HotelTypesTabs />

      {/* 필터 제거 → hotel-results만 표시 */}
      <div className="search-content full-width">

        <div className="hotel-results">
          <HotelResultsHeader
            total={hotels.length}
            showing={hotels.length}
          />
          <HotelListCards hotels={hotels} />
        </div>

      </div>
    </div>
  );
};

export default SearchPage;
