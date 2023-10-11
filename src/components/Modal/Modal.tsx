import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';

import { modal } from './Modal.styles';

export interface ModalProps extends React.PropsWithChildren {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  size,
  isOpen = false,
  onClose,
}) => {
  const [open, setOpen] = useState(isOpen);
  const desktopModalRef = useRef(null);

  const slots = modal({ size });

  const onDismiss = () => {
    setOpen(false);
    onClose?.();
  };
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === desktopModalRef.current) onDismiss();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            ref={desktopModalRef}
            className={slots.wrapper()}
            initial='exit'
            animate='enter'
            exit='exit'
            variants={scaleInOut}
            onMouseDown={onMouseDown}
          >
            <section
              className={slots.content()}
              role='dialog'
              aria-modal='true'
            >
              <button
                type='button'
                className={slots.closeButton()}
                onClick={onDismiss}
                aria-label='Close'
              >
                <IoCloseOutline className='h-4 w-4' />
              </button>
              {children}
            </section>
          </motion.div>
          <motion.div
            className={slots.backdrop()}
            initial='exit'
            animate='enter'
            exit='exit'
            variants={opacityInOut}
            aria-hidden='true'
            onClick={onDismiss}
          />
        </>
      )}
    </AnimatePresence>
  );
};

const scaleInOut = {
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: {
        duration: 0.4,
        ease: [0.36, 0.66, 0.4, 1],
      },
      opacity: {
        duration: 0.4,
        ease: [0.36, 0.66, 0.4, 1],
      },
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
};

const opacityInOut = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
};

export default Modal;
