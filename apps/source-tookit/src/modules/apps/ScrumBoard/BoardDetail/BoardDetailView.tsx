import React, { useEffect, useState } from 'react';
import AddCard from './List/AddCard';
import AppsContent from '@crema/components/AppsContent';
// import './react-trello';
import Board from 'react-trello';
import { useAppDispatch } from '../../../../toolkit/hooks';
import {
  onAddNewList,
  onDeleteSelectedList,
  onEditBoardList,
  onUpdateCardCategory,
} from '../../../../toolkit/actions';
import { useThemeContext } from '@crema/context/ThemeContextProvider';
import {
  AddCardButton,
  AddNewList,
  BoardCard,
  ListHeader,
  NewListButton,
} from '@crema/modules/apps/ScrumBoard';

import type {
  BoardObjType,
  CardListObjType,
  CardObjType,
} from '@crema/models/apps/ScrumbBoard';

type BoardDetailViewProps = {
  boardDetail: BoardObjType;
};

const BoardDetailView: React.FC<BoardDetailViewProps> = ({ boardDetail }) => {
  const dispatch = useAppDispatch();
  const [list, setList] = useState<CardListObjType | null>(null);
  const { theme } = useThemeContext();
  const [isAddCardOpen, setAddCardOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState<CardObjType | null>(null);

  const getBoardData = () => {
    return {
      ...boardDetail,
      lanes: boardDetail.list,
    };
  };

  const [boardData, setBoardData] = useState(getBoardData());

  useEffect(() => {
    setBoardData(getBoardData());
  }, [boardDetail]);

  const shouldReceiveNewData = (nextData: any) => {
    setBoardData(nextData);
  };

  const onCloseAddCard = () => {
    setAddCardOpen(false);
  };

  const onClickAddCard = (listId: number) => {
    setList(boardData!.lanes!.find((item) => item.id === listId)!);
    setSelectedCard(null);
    setAddCardOpen(true);
  };

  const onAddList = (name: string) => {
    dispatch(onAddNewList(boardDetail.id!, { name } as CardListObjType));
  };

  const getCardById = (lane: CardListObjType, cardId: number) =>
    lane.cards.find((item) => item.id === cardId);

  const onEditCardDetail = (cardId: number) => {
    const selectedList = boardData.lanes.find((item) => {
      const correctCard = item.cards.find((card) => card.id === cardId);
      if (correctCard) return item;
    });
    const selectedCard = getCardById(selectedList as CardListObjType, cardId);
    setSelectedCard(selectedCard as CardObjType);
    setList(selectedList as CardListObjType);
    setAddCardOpen(true);
  };

  const handleDragCard = (
    cardId: any,
    sourceLaneId: number,
    targetLaneId: number,
    position: number,
    cardDetails: CardObjType
  ) => {
    if (sourceLaneId !== targetLaneId) {
      const boardId = boardDetail?.id;
      dispatch(
        onUpdateCardCategory(
          cardDetails.id,
          sourceLaneId,
          targetLaneId,
          position,
          boardId
        )
      );
    }
  };

  return (
    <AppsContent fullView>
      <Board
        laneStyle={{
          backgroundColor: theme.palette.background.default,
        }}
        editable
        canAddLanes
        data={boardData}
        onDataChange={shouldReceiveNewData}
        handleDragEnd={handleDragCard}
        onCardAdd={(_: CardObjType, laneId: number) => {
          onClickAddCard(laneId);
        }}
        onCardClick={(cardId: number, _: any) => {
          onEditCardDetail(cardId);
        }}
        onLaneAdd={(name: string) => onAddList(name)}
        onLaneUpdate={(laneId: number, data: CardObjType) => {
          const lane = boardData.lanes.find((item) => item.id === laneId);
          dispatch(
            onEditBoardList(boardDetail.id!, {
              ...lane,
              name: data.title,
            } as CardListObjType)
          );
        }}
        onLaneDelete={(laneId: number) =>
          dispatch(onDeleteSelectedList(boardDetail.id!, laneId))
        }
        t={(listId: number) => onClickAddCard(listId)}
        components={{
          Card: BoardCard,
          LaneHeader: ListHeader,
          AddCardLink: AddCardButton,
          NewCardForm: AddCard,
          NewLaneForm: AddNewList,
          NewLaneSection: NewListButton,
        }}
      />
      {isAddCardOpen ? (
        <AddCard
          isModalVisible={isAddCardOpen}
          handleCancel={onCloseAddCard}
          list={list}
          board={boardDetail}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ) : null}
    </AppsContent>
  );
};

export default BoardDetailView;
