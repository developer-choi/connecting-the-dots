import {forwardRef, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode, useId, useCallback, useRef} from 'react';
import Modal from './Modal.tsx';
import styles from './Dialog.module.scss';

interface DialogContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onBackdropClick?: (event: MouseEvent) => void;
}

const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>(function DialogContainer(props, ref) {
  const {children, className, onBackdropClick, ...other} = props;
  const backdropClickRef = useRef(false);

  const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    backdropClickRef.current = event.target === event.currentTarget;
  }, []);

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!backdropClickRef.current) {
      return;
    }
    backdropClickRef.current = false;

    if (event.target === event.currentTarget && onBackdropClick) {
      onBackdropClick(event);
    }
  }, [onBackdropClick]);

  return (
    <div
      ref={ref}
      role="presentation"
      tabIndex={-1}
      className={`${styles.container} ${className || ''}`.trim()}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      {...other}
    >
      {children}
    </div>
  );
});

interface DialogPaperProps extends HTMLAttributes<HTMLDivElement> {
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

function DialogPaper(props: DialogPaperProps) {
  const {children, className, ...other} = props;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`${styles.paper} ${className || ''}`.trim()}
      {...other}
    >
      {children}
    </div>
  );
}

export interface DialogProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  children: ReactNode;
  className?: string;
  disableEscapeKeyDown?: boolean;
  disableBackdropClick?: boolean;
  onClose?: (
    event: KeyboardEvent | MouseEvent,
    reason: 'escapeKeyDown' | 'backdropClick'
  ) => void;
  open: boolean;
}

export default function Dialog(inProps: DialogProps) {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    children,
    className,
    disableEscapeKeyDown = false,
    disableBackdropClick = false,
    onClose,
    open,
    ...other
  } = inProps;

  const generatedId = useId();
  const ariaLabelledby = ariaLabelledbyProp || generatedId;

  const handleBackdropClick = useCallback((event: MouseEvent) => {
    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  }, [disableBackdropClick, onClose]);

  return (
    <Modal
      className={className}
      disableEscapeKeyDown={disableEscapeKeyDown}
      disableBackdropClick={true}
      onClose={onClose}
      open={open}
      {...other}
    >
      <DialogContainer onBackdropClick={handleBackdropClick}>
        <DialogPaper
          aria-describedby={ariaDescribedby}
          aria-labelledby={ariaLabelledby}
        >
          {children}
        </DialogPaper>
      </DialogContainer>
    </Modal>
  );
}
