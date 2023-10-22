import { tv } from 'tailwind-variants';

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

const card = tv({
  base: 'rounded-lg border border-default-200 bg-white p-6 shadow-sm',
});

const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={card({ className })}>{children}</div>;
};

export default Card;
