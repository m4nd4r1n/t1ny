type DataAttributes = {
  [dataAttr: `data-${string}`]: string;
};

export type Props<T = HTMLElement> = React.DOMAttributes<T> &
  React.AriaAttributes &
  DataAttributes;

export type PropsWithoutChildren<T = HTMLElement> = Omit<Props<T>, 'children'>;
