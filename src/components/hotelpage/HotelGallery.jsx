import React, { useState } from "react";
import "../../styles/components/hotelpage/HotelGallery.scss";
import HotelGalleryModal from "./HotelGalleryModal";

const HotelGallery = ({ images = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="hotel-gallery">
      {/* 이미지 그리드 */}
      <div className="gallery-grid">
        {/* 메인 이미지 */}
        <div className="main-image" onClick={() => openModal(0)}>
          <img src={images[0]} alt="main" />
        </div>

        {/* 서브 이미지 4개 */}
        <div className="sub-images">
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="sub-image"
              onClick={() => openModal(i + 1)}
            >
              <img src={img} alt={`sub-${i}`} />

              {/* 네 번째 이미지에 "View all photos" 표시 */}
              {i === 3 && images.length > 5 && (
                <div className="view-all-overlay">View all photos</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {isOpen && (
        <HotelGalleryModal
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default HotelGallery;
