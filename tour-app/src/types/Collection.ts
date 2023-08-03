export interface Collection {
  _id: string;
  price: string;
  priceMax: number;
  priceMin: number;
  name: string;
  imgs: string[];
  departurePoint: string;
  listTour: {
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
  }[];
}
