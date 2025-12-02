import { mockReviews } from "./mockReviews";

let reviews = [...mockReviews];

export async function getReviews(hotelId) {
  return reviews;
}

export async function createReview(hotelId, review) {
  const newReview = {
    id: Date.now(),
    ...review,
    date: new Date().toISOString().slice(0, 10),
  };
  reviews.push(newReview);
  return newReview;
}

export async function updateReview(id, updated) {
  reviews = reviews.map((r) => (r.id === id ? { ...r, ...updated } : r));
  return reviews.find((r) => r.id === id);
}

export async function deleteReview(id) {
  reviews = reviews.filter((r) => r.id !== id);
  return true;
}
