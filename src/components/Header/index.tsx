import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { RoomCode } from '../RoomCode';
import { Button } from '../Button';
import { ShowModal } from '../ShowModal';

import logoImg from '../../assets/images/logo.svg';

import './styles.scss';
import { useState } from 'react';

type HeaderProps = {
  roomId: string;
  handleEndRoom?: () => void;
  userImg?: string;
};

export function Header({ roomId, handleEndRoom, userImg }: HeaderProps) {
  const { user } = useAuth();
  const [modal, setModal] = useState(false);

  const handleConfirmModal = () => {
    if (!handleEndRoom) return;
    handleEndRoom();
    setModal(false);
  };

  const isOwner = () => {
    const { owner } = useRoom(roomId);

    if (user) {
      if (user.id === owner) {
        return (
          <Button isOutlined onClick={() => setModal(true)}>
            Encerrar sala
          </Button>
        );
      } else
        return (
          <button className="exitBtn">
            <img src={userImg} alt="User photo" />
          </button>
        );
    }
  };

  return (
    <>
      <div id="header">
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId}></RoomCode>
            {isOwner()}
          </div>
        </div>
      </div>
      <ShowModal
        title="Encerrar Sala"
        message="Tem certeza que você deseja encerrar esta sala?"
        isOpen={modal}
        setIsOpen={setModal}
        confirmModal={handleConfirmModal}
      />
    </>
  );
}
