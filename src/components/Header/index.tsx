import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { RoomCode } from '../RoomCode';
import { Button } from '../Button';

import logoImg from '../../assets/images/logo.svg';

import './styles.scss';

type HeaderProps = {
  roomId: string;
  handleEndRoom?: () => void;
  userImg?: string;
};

export function Header({ roomId, handleEndRoom, userImg }: HeaderProps) {
  const { user } = useAuth();

  const isOwner = () => {
    const { owner } = useRoom(roomId);

    if (user?.id === owner) {
      return (
        <Button isOutlined onClick={handleEndRoom}>
          Encerrar sala
        </Button>
      );
    }

    if (user)
      return (
        <button className="exitBtn">
          <img src={userImg} alt="User photo" />
        </button>
      );
  };

  return (
    <div id="header">
      <div className="content">
        <img src={logoImg} alt="letmeask" />
        <div>
          <RoomCode code={roomId}></RoomCode>
          {isOwner()}
        </div>
      </div>
    </div>
  );
}
