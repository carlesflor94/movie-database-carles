export function ratingScale(rating: number): string {
  if (rating <= 3) return "#E90000";
  if (rating <= 3) return "#E97E00";
  if (rating <= 3) return "#E9D100";
  return "#66E900";
}
