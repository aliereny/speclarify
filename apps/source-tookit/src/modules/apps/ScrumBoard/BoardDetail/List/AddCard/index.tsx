import React, { useState } from 'react';
import AppConfirmationModal from '@crema/components/AppConfirmationModal';
import IntlMessages from '@crema/helpers/IntlMessages';
import AddCardForm from './AddCardForm';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { StyledScrumBoardAppCardDrawer } from './index.styled';
import { CardHeader } from '@crema/modules/apps/ScrumBoard';
import {
  AttachmentObjType,
  BoardObjType,
  CardListObjType,
  CardObjType,
} from '@crema/models/apps/ScrumbBoard';
import { useAppDispatch } from '../../../../../../toolkit/hooks';
import { onDeleteSelectedCard } from '../../../../../../toolkit/actions';

type AddCardProps = {
  isModalVisible: boolean;
  handleCancel: () => void;
  board: BoardObjType;
  list: CardListObjType | null;
  selectedCard: CardObjType | null;
  setSelectedCard: (data: CardObjType) => void;
};

const AddCard: React.FC<AddCardProps> = ({
  isModalVisible,
  handleCancel,
  board,
  list,
  selectedCard,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAuthUser();

  const [checkedList, setCheckedList] = useState(() =>
    selectedCard ? selectedCard.checkedList : []
  );

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedMembers, setMembersList] = useState(() =>
    selectedCard ? selectedCard.members : []
  );

  const [selectedLabels, setSelectedLabels] = useState(() =>
    selectedCard ? selectedCard.label : []
  );

  const [comments, setComments] = useState(() =>
    selectedCard ? selectedCard.comments : []
  );

  const [attachments, setAttachments] = useState(() =>
    selectedCard ? selectedCard.attachments : []
  );

  const onAddAttachments = (files: AttachmentObjType[]) => {
    setAttachments([...attachments, ...files]);
  };

  const onDeleteCard = () => {
    const boardId = board.id;
    const listId = list!.id;
    const cardId = selectedCard!.id;
    if (boardId && listId && cardId)
      dispatch(onDeleteSelectedCard(boardId, listId, cardId));

    setDeleteDialogOpen(false);
    handleCancel();
  };

  const onClickDeleteIcon = () => {
    if (selectedCard) {
      setDeleteDialogOpen(true);
    } else {
      handleCancel();
    }
  };
  return (
    <StyledScrumBoardAppCardDrawer
      open={isModalVisible}
      width="80%"
      title={
        <CardHeader
          onAddAttachments={onAddAttachments}
          onClickDeleteIcon={onClickDeleteIcon}
          handleCancel={handleCancel}
          board={board}
          list={list}
        />
      }
      onClose={handleCancel}
    >
      <AddCardForm
        board={board}
        list={list}
        checkedList={checkedList}
        handleCancel={handleCancel}
        setCheckedList={setCheckedList}
        comments={comments}
        setComments={setComments}
        authUser={user}
        attachments={attachments}
        setAttachments={setAttachments}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
        selectedMembers={selectedMembers}
        setMembersList={setMembersList}
        selectedCard={selectedCard}
        onCloseAddCard={handleCancel}
      />

      {isDeleteDialogOpen ? (
        <AppConfirmationModal
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteCard}
          modalTitle={<IntlMessages id="scrumboard.deleteCard" />}
          paragraph={<IntlMessages id="common.deleteItem" />}
        />
      ) : null}
    </StyledScrumBoardAppCardDrawer>
  );
};

export default AddCard;
