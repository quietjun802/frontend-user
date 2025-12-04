import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Amenities from "../../components/hotelpage/Amenities";
import AvailableRooms from "../../components/hotelpage/AvailableRooms";
import HotelDetailHeader from "../../components/hotelpage/HotelDetailHeader";
import HotelGallery from "../../components/hotelpage/HotelGallery";
import HotelMap from "../../components/hotelpage/HotelMap";
import HotelOverview from "../../components/hotelpage/HotelOverview";
import HotelReviews from "../../components/hotelpage/HotelReviews";

import "../../styles/pages/hotelpage/HotelDetailPage.scss";

// 🔹 백엔드 API
import {
  getHotelDetail,
  getHotelRooms,
} from "../../api/hotelClient";

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../api/reviewClient";

const HotelDetailPage = () => {
  const { hotelId } = useParams(); 
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);

        const [hotelData, roomsData, reviewsData] = await Promise.all([
          getHotelDetail(hotelId),
          getHotelRooms(hotelId),
          getReviews(hotelId),
        ]);

        setHotel(hotelData.hotel);
        setRooms(roomsData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Failed to fetch hotel data:", err);
        setError(err.message || "호텔 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) fetchHotelData();
  }, [hotelId]);

  if (loading) {
    return <div className="hotel-detail-container inner loading">Loading...</div>;
  }

  if (error) {
    return <div className="hotel-detail-container inner error">Error: {error}</div>;
  }

  if (!hotel) {
    return (
      <div className="hotel-detail-container inner">
        호텔을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="hotel-detail-container inner">
      <HotelDetailHeader hotel={hotel} />
      <HotelGallery images={hotel.images} hotelName={hotel.name} />

      <HotelOverview
        description={hotel.description}
        rating={hotel.ratingAverage}
        reviewCount={hotel.ratingCount}
        tags={hotel.tags}
      />

      <Amenities amenities={hotel.amenities} />
      <AvailableRooms rooms={rooms} />
      <HotelMap address={hotel.address} location={hotel.location} />

      <HotelReviews
        hotelId={hotelId}
        rating={hotel.ratingAverage}
        reviewCount={hotel.ratingCount}
        reviews={reviews}
        createReview={createReview}
        updateReview={updateReview}
        deleteReview={deleteReview}
        getReviews={getReviews}
      />
    </div>
  );
};

export default HotelDetailPage;
