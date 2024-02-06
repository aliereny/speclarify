import styled from "styled-components";
import {
  DeleteFilled,
  EditFilled,
  PlayCircleFilled,
  ProjectFilled,
  SmileFilled,
} from "@ant-design/icons";

export const StyledProjectDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledStatsCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 1rem;
  color: #000c17;
  cursor: pointer;
`;

export const StyledStatsCardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;
export const StyledPlayCircleFilled = styled(PlayCircleFilled)`
  font-size: 4rem;
  color: #2f54eb;
`;

export const StyledProjectFilled = styled(ProjectFilled)`
  font-size: 4rem;
  color: #fa8c16;
`;

export const StyledEditFilled = styled(EditFilled)`
  font-size: 4rem;
  color: #52c41a;
`;

export const StyledDeleteFilled = styled(DeleteFilled)`
  font-size: 4rem;
  color: #ff4d4f;
`;

export const StyledStatsCardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
export const StyledStatsCardValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
