export type Movie = {
  id: string;
  title: string;
  releaseDate: string;
  poster?: string;
  genres: string[];
  description: string;
  rating: number;
  voteCount: number;
};
