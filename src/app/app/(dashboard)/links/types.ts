export type Link = {
  id: string;
  target_url: string;
  created_at: string;
};

export type Links = Link[];

export type LinkLimits = {
  day_limit: number;
  total_limit: number;
};
