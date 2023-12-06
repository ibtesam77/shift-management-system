import { Modal } from "flowbite-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
  children: React.ReactNode;
}

const SimpleModal = (props: ModalProps) => {
  const { isOpen, onClose, heading = "Modal", children } = props;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{heading}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>
    </Modal>
  );
};

export default SimpleModal;
