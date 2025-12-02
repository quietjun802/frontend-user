import React from "react";
import { FaStar, FaMapMarkerAlt, FaHeart, FaShare } from "react-icons/fa";
import "../../styles/components/hotelpage/HotelDetailHeader.scss";

const HotelDetailHeader = ({ hotel }) => {
  if (!hotel) return <div className="hotel-detail-header loading">Loading...</div>;

  const {
    name = "호텔명 없음",
    ratingAverage = 0,
    ratingCount = 0,
    city = "",
    address = "주소 정보 없음",
    location = "",
    basePrice = 0,
  } = hotel;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < full ? "star-filled" : "star-empty"} />
    ));
  };

  return (
    <div className="hotel-detail-header">

      {/* 상단: Breadcrumb */}
      <div className="breadcrumb">
        <span>{city || "Location"}</span> &gt;
        <span>{location || "Area"}</span> &gt;
        <span>{name}</span>
      </div>

      {/* 메인 정보 (왼쪽 정보 + 오른쪽 액션/가격) */}
      <div className="info-row">

        {/* 왼쪽 정보 */}
        <div className="info-left">
          <h1 className="hotel-name">{name}</h1>

          <div className="rating-section">
            <div className="stars">{renderStars(ratingAverage)}</div>
            <span className="rating-text">{ratingAverage} Star Hotel</span>
          </div>

          <div className="location-section">
            <FaMapMarkerAlt className="location-icon" />
            <span className="address">{address}</span>
          </div>

          <div className="review-section">
            <span className="review-score">{ratingAverage}</span>
            <span className="review-text">Very Good</span>
            <span className="review-count">{ratingCount} reviews</span>
          </div>
        </div>

        {/* 오른쪽 가격 + 액션버튼 */}
        <div className="info-right">
          <div className="price-wrapper">
            <span className="price">₩{basePrice.toLocaleString()}</span>
            <span className="price-unit">/night</span>
          </div>

          <div className="top-actions">
            <button className="icon-btn"><FaHeart /></button>
            <button className="icon-btn"><FaShare /></button>
          </div>

          <button className="btn-book-now">Book now</button>
        </div>
      </div>

    </div>
  );
};

export default HotelDetailHeader;
