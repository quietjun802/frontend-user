import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/search/HotelListCards.scss";

const HotelListCards = ({ hotels = [] }) => {
  const navigate = useNavigate();

  if (!hotels || hotels.length === 0) {
    return (
      <div className="hotel-list-cards empty">호텔을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="hotel-list-cards">
      {hotels.map((hotel, i) => {
        const price = hotel.basePrice ?? hotel.price ?? 0;

        return (
          <div
            key={i}
            className="hotel-card"
            onClick={() => navigate(`/hotels/${hotel.id}`)}
          >
            {/* ========= 이미지 영역 ========= */}
            <div className="hotel-image">
              <img src={hotel.image} alt={hotel.name} />
              <div className="image-count">{hotel.imageCount} images</div>
            </div>

            {/* ========= 오른쪽 전체 콘텐츠 ========= */}
            <div className="hotel-content">

              {/* ====== 상단 정보 영역 ====== */}
              <div className="hotel-info">
                <h3 className="hotel-name">{hotel.name}</h3>
                <div className="hotel-location">{hotel.location}</div>

                <div className="hotel-meta">
                  <div className="hotel-stars">
                    {"⭐".repeat(hotel.stars)} {hotel.stars} Star Hotel
                  </div>
                  <div className="hotel-amenities">
                    🏨 {hotel.amenities}+ Amenities
                  </div>
                </div>

                <div className="hotel-rating">
                  <span className="rating-score">{hotel.rating}</span>
                  <span className="rating-label">{hotel.ratingLabel}</span>
                  <span className="rating-reviews">
                    {hotel.reviews} reviews
                  </span>
                </div>
              </div>

              {/* ====== 하단 버튼/가격 ====== */}
              <div className="hotel-bottom">
                <div className="hotel-price">
                  <div className="price-label">starting from</div>
                  <div className="price-amount">
                    ₩{Number(price).toLocaleString()}/night
                  </div>
                  <div className="price-note">excl. tax</div>
                </div>

                <div className="hotel-buttons">
                  <button className="wishlist-button">❤️</button>
                  <button className="view-button">View Place</button>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelListCards;
