import React from "react";
import "../../styles/components/hotelpage/HotelMap.scss";

const HotelMap = ({ address }) => {
  const encodedAddress = encodeURIComponent(address || "서울");

  return (
    <div className="hotel-map">
      <div className="hotel-map-header">
        <h3>지도보기</h3>
        <a
          className="map-button"
          href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on google maps
        </a>
      </div>

      <div className="map-container">
        <iframe
          src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="map-address">
        📍 {address}
      </div>
    </div>
  );
};

export default HotelMap;
