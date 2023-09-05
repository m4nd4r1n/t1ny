interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const SampleButton: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary
    ? 'text-white bg-[#1ea7fd]'
    : 'text-[#333] bg-transparent shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset]';

  return (
    <button
      type='button'
      className={[
        'inline-block cursor-pointer rounded-[3em] border-0 font-sans font-bold',
        getSize(size),
        mode,
      ].join(' ')}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};

const getSize = (size: string) => {
  switch (size) {
    case 'small': {
      return 'text-xs px-4 py-2.5';
    }
    case 'large': {
      return 'text-base px-6 py-3';
    }
    default: {
      return 'text-sm px-5 py-2.5';
    }
  }
};

export default SampleButton;
