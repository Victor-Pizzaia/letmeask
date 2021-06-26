import Modal from 'react-modal';
import { Button } from '../../components/Button';
import deleteImg from '../../assets/images/delete.svg';

import './styles.scss';

type ShowModalProps = {
  title: string;
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmModal: () => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function ShowModal({
  title,
  message,
  isOpen,
  setIsOpen,
  confirmModal,
}: ShowModalProps) {
  const cancelModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="modal">
      <Modal
        isOpen={isOpen}
        contentLabel="Confirm Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="content">
          <img src={deleteImg} alt="Close room" />
          <h2>{title}</h2>
          <span>{message}</span>
          <footer>
            <Button isOutlined onClick={cancelModal}>
              Cancelar
            </Button>
            <Button onClick={confirmModal}>Confirmar</Button>
          </footer>
        </div>
      </Modal>
    </div>
  );
}
