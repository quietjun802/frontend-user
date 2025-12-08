import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockHotelRooms } from "../../api/mockHotelRooms";
import { mockHotelDetail } from "../../api/mockHotelDetail";
import "../../styles/pages/booking/BookingStep.scss";

const extrasOptions = [
  { id: "breakfast", label: "조식 포함", price: 15000 },
  { id: "pickup", label: "공항 픽업", price: 30000 },
  { id: "lateCheckout", label: "레이트 체크아웃", price: 20000 },
];

const BookingStepExtras = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const location = useLocation();

  const qs = new URLSearchParams(location.search);
  const checkIn = qs.get("checkIn");
  const checkOut = qs.get("checkOut");
  const guests = qs.get("guests") || "2";
  const roomId = qs.get("roomId") || mockHotelRooms[0].id;
  const selectedExtras = qs.get("extras")?.split(",").filter(Boolean) || [];

  const [extras, setExtras] = useState(new Set(selectedExtras));

  const toggleExtra = (id) => {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const room = mockHotelRooms.find((r) => r.id === roomId) || mockHotelRooms[0];
  const hotel = mockHotelDetail;

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return Number.isNaN(diff) || diff <= 0 ? 1 : diff;
  }, [checkIn, checkOut]);

  const extrasTotal = useMemo(() => {
    return extrasOptions
      .filter((opt) => extras.has(opt.id))
      .reduce((sum, opt) => sum + opt.price, 0);
  }, [extras]);

  const roomTotal = room.price * nights;
  const total = roomTotal + extrasTotal;

  const handleNext = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    params.set("roomId", room.id);
    if (extras.size > 0) params.set("extras", Array.from(extras).join(","));
    navigate(`/booking/${hotelId}/payment?${params.toString()}`);
  };

  return (
    <div className="booking-page inner">
      <h2 className="booking-title">옵션 선택</h2>

      <div className="booking-grid">
        {/* LEFT: extras list */}
        <div className="booking-left">
          <div className="extras-list booking-panel">
            {extrasOptions.map((opt) => (
              <label key={opt.id} className="extra-item">
                <input
                  type="checkbox"
                  checked={extras.has(opt.id)}
                  onChange={() => toggleExtra(opt.id)}
                />
                <div className="extra-body">
                  <div className="extra-title">{opt.label}</div>
                  <div className="extra-price">
                    +₩{opt.price.toLocaleString()} / 1회
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="booking-buttons">
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              이전 단계
            </button>
            <button className="btn-primary" onClick={handleNext}>
              결제 단계
            </button>
          </div>
        </div>

        {/* RIGHT: summary */}
        <aside className="booking-right">
          <div className="hotel-summary">
            <div className="hotel-image">
              <img src={hotel.images[0]} alt={hotel.name} />
            </div>

            <div className="hotel-content">
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-location">
                {hotel.city} • {hotel.location}
              </p>
              <div className="hotel-rating">
                {hotel.ratingAverage} • {hotel.ratingCount} reviews
              </div>

              <div className="summary-box">
                <div>
                  <strong>객실</strong>
                  <p>{room.name}</p>
                </div>
                <div>
                  <strong>숙박일</strong>
                  <p>{nights}박</p>
                </div>
                <div>
                  <strong>옵션</strong>
                  <p>
                    {extras.size > 0
                      ? Array.from(extras)
                          .map((id) => extrasOptions.find((o) => o.id === id)?.label)
                          .join(", ")
                      : "선택 없음"}
                  </p>
                </div>
              </div>

              <div className="price-breakdown">
                <div>
                  <span>객실 ({nights}박)</span>
                  <strong>₩{roomTotal.toLocaleString()}</strong>
                </div>
                <div>
                  <span>옵션</span>
                  <strong>₩{extrasTotal.toLocaleString()}</strong>
                </div>
                <div className="total">
                  <span>예상 결제 금액</span>
                  <strong>₩{total.toLocaleString()}</strong>
                </div>
              </div>

              <button className="btn-primary" onClick={handleNext}>
                결제 단계로 이동
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingStepExtras;