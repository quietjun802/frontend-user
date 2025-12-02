import React, { useEffect } from "react";
import "../../styles/components/hotelpage/HotelGalleryModal.scss";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HotelGalleryModal = ({
  images = [],
  currentIndex = 0,
  setCurrentIndex,
  onClose,
}) => {
  // ESC로 닫기
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-modal">
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-content">
        {/* 닫기 버튼 */}
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* 이전 버튼 */}
        <button className="nav-btn left" onClick={prev}>
          <FaChevronLeft />
        </button>

        {/* 이미지 */}
        <img
          src={images[currentIndex]}
          alt="modal"
          className="modal-image"
        />

        {/* 다음 버튼 */}
        <button className="nav-btn right" onClick={next}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HotelGalleryModal;
