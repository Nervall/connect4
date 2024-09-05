import React, { useEffect, useRef } from 'react';
import './dialog.css'

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

const Dialog = ({ children, isOpen , handleClose }: DialogProps) => {
  const dialogElement = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogElement.current?.showModal();
    } else {
      dialogElement.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  return (
    <dialog ref={dialogElement} className='dialog-wrapper' onClose={handleClose}>
      {children}
    </dialog>
  )
}

export default Dialog;
