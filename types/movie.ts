export type Movie = {
  id: string;
  title: string;
  releaseDate: string;
  poster?: string;
  genresIds: number[];
  description: string;
  rating: number;
  userRating?: number;
};
