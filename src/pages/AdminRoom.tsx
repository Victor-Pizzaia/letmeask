import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Question } from '../components/Question';
import { Header } from '../components/Header';
import { ShowModal } from '../components/ShowModal';

import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions, owner } = useRoom(roomId);
  const [modal, setModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState('');
  const { user } = useAuth();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  const handleConfirmModal = () => {
    handleDeleteQuestion(deleteQuestionId);
    setModal(false);
    toast.success('Pergunta excluida com sucesso');
  };

  return (
    <div id="page-room">
      {user?.id === owner ? (
        <>
          <Header roomId={roomId} handleEndRoom={handleEndRoom} />
          <ShowModal
            title="Excluir pergunta"
            message="Tem certeza que você deseja excluir esta pergunta?"
            isOpen={modal}
            setIsOpen={setModal}
            confirmModal={handleConfirmModal}
          />

          <main>
            <div className="room-title">
              <h1>Sala: {title}</h1>
              {questions.length > 0 && (
                <span>{questions.length} pergunta(s)</span>
              )}
            </div>

            <div className="question-list">
              {questions.map((question) => {
                return (
                  <Question
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighLighted={question.isHighLighted}
                  >
                    {!question.isAnswered && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleCheckQuestionAsAnswered(question.id)
                          }
                        >
                          <img
                            src={checkImg}
                            alt="Marcar pergunta como respondida"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleHighLightQuestion(question.id)}
                        >
                          <img src={answerImg} alt="Dar destaque à pergunta" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteQuestionId(question.id);
                        setModal(true);
                      }}
                    >
                      <img src={deleteImg} alt="Remover pergunta" />
                    </button>
                  </Question>
                );
              })}
            </div>
          </main>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h1>404 - Route does not find</h1>
        </div>
      )}
    </div>
  );
}
