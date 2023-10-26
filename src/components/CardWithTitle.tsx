import Card from './Card';

interface CardWithTitleProps extends React.PropsWithChildren {
  className?: string;
  title: string;
}

const CardWithTitle: React.FC<CardWithTitleProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <Card className={className}>
      <h2 className='mb-6 text-xl font-bold'>{title}</h2>
      {children}
    </Card>
  );
};

export default CardWithTitle;
