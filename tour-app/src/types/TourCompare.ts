export interface TourCompare {
  _id: string;
  name: string;
  imgs: string[];
  url: string;
  originalPrice: number;
  presentPrice: number;
  time: string;
  vehicle: string;
  schedules: string[];
  highlightDestinations: string;
  departurePoint: string;
}

export interface TourSearch {
  _id: string;
  name: string;
  url: string;
  presentPrice: number;
  imgs: string[];
}

export interface Tour {
  _id: string;
  name: string;
  imgs: string[];
  url: string;
  originalPrice: number;
  presentPrice: number;
  time: string;
  vehicle: string;
  highlightDestinations: string;
  schedules: string[];
  departurePoint: string;
  newOriginalPrice: string;
  newPresentPrice: string;
}

export interface TourCollection {
  _id: string;
  name: string;
  imgs: string[];
  url: string;
  originalPrice: number;
  presentPrice: number;
  time: string;
  vehicle: string;
  schedules: string[];
  highlightDestinations: string;
}
