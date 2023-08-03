export interface Province {
  _id: string;
  name: string;
  like: string[];
  popularAttractions: string[];
}

export interface ProvinceSearch {
  _id: string;
  name: string;
  sumTour: number;
}
