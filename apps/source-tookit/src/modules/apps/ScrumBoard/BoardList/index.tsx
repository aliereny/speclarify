import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppInfoView from '@crema/components/AppInfoView';
import { Col } from 'antd';
import {
  StyledScrumBoardContainer,
  StyledScrumBoardHeader,
  StyledScrumBoardWrap,
} from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import {
  onAddNewBoard,
  onEditBoardDetail,
  onGetBoardList,
} from '../../../../toolkit/actions';
import {
  AddBoardButton,
  AddNewBoard,
  BoardItem,
} from '@crema/modules/apps/ScrumBoard';
import type { BoardObjType } from '@crema/models/apps/ScrumbBoard';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const boardList = useAppSelector(
    ({ scrumboardApp }) => scrumboardApp.boardList
  );

  useEffect(() => {
    dispatch(onGetBoardList());
  }, [dispatch]);

  const [selectedBoard, setSelectedBoard] = useState<BoardObjType | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onEditButtonClick = (board: BoardObjType) => {
    setSelectedBoard(board);
    setIsModalVisible(true);
  };

  const onAddBoard = (name: string) => {
    if (selectedBoard) {
      const board = { ...selectedBoard, name };
      dispatch(onEditBoardDetail(board));
    } else {
      dispatch(onAddNewBoard({ name } as BoardObjType));
    }
  };

  const onViewBoardDetail = (board: BoardObjType) => {
    router.push(`/apps/scrum-board/${board.id}`);
  };

  const showModal = () => {
    setSelectedBoard(null);
    setIsModalVisible(true);
  };

  return (
    <>
      <StyledScrumBoardWrap>
        <StyledScrumBoardHeader>
          <h2>
            <IntlMessages id="scrumboard.scrumboardApp" />
          </h2>
        </StyledScrumBoardHeader>
        <StyledScrumBoardContainer>
          {boardList && boardList.length > 0
            ? boardList.map((board: BoardObjType) => {
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
                    <BoardItem
                      board={board}
                      onEditButtonClick={onEditButtonClick}
                      onViewBoardDetail={onViewBoardDetail}
                    />
                  </Col>
                );
              })
            : null}
          <Col xs={24} sm={12} md={8} lg={6}>
            <AddBoardButton onAddButtonClick={showModal} />
          </Col>
        </StyledScrumBoardContainer>
      </StyledScrumBoardWrap>

      {isModalVisible ? (
        <AddNewBoard
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          onAddBoard={onAddBoard}
          handleOk={handleOk}
          selectedBoard={selectedBoard}
        />
      ) : null}
      <AppInfoView />
    </>
  );
};

export default BoardList;
