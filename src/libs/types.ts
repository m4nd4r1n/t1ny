type DataAttributes = {
  [dataAttr: `data-${string}`]: string;
};

export type Props<T = HTMLElement> = React.DOMAttributes<T> &
  React.AriaAttributes &
  DataAttributes;

export type PropsWithoutChildren<T = HTMLElement> = Omit<Props<T>, 'children'>;

export type Link = {
  id: string;
  target_url: string;
  created_at: string | Date;
  target_favicon: string;
  target_title?: string | null;
};

export type Links = Link[];

export type LinkLimits = {
  day_limit: number;
  total_limit: number;
};

export type Clicks = {
  'Link clicks': number;
  date: string;
}[];

export type Trending = (BarListItem & {
  href: string;
  icon: string;
})[];

export type BarListItem = {
  name: string;
  value: number;
};

export type BarList = BarListItem[];
