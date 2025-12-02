import { mockHotels } from "./mockHotels";
import { mockHotelDetail } from "./mockHotelDetail";
import { mockHotelRooms } from "./mockHotelRooms";

export async function getHotels() {
  return mockHotels;
}

export async function getHotelDetail(id) {
  return { hotel: mockHotelDetail };
}

export async function getHotelRooms(id) {
  return mockHotelRooms;
}
