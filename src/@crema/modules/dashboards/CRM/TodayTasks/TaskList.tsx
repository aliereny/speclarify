import React, { useState } from "react";
// import {isBreakPointDown} from '../../../../@crema/utility/Utils';
import { List, Checkbox } from "antd";
import { StyledTaskListItem } from "./index.styled";

// const getData = (data) => {
//   if (isBreakPointDown('xl')) {
//     return data.slice(0, 5);
//   } else {
//     return data.slice(0, 6);
//   }
// };
import type { TodayTaskDataType } from "@crema/types/models/dashboards/CRM";

type TaskListProps = {
  todayTaskData: TodayTaskDataType[];
};

const TaskList: React.FC<TaskListProps> = ({ todayTaskData }) => {
  const [taskList, handleList] = useState(todayTaskData);

  const handleChange = (e: any, task: TodayTaskDataType) => {
    task.isChecked = e.target.checked;
    const list = todayTaskData.map((item) =>
      item.id === task.id ? task : item
    );
    handleList(list);
  };

  return (
    <List
      dataSource={taskList}
      renderItem={(task) => {
        return (
          <StyledTaskListItem key={task.id} className="item-hover">
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={task.isChecked}
                  onChange={(e) => handleChange(e, task)}
                />
              }
              title={task.task}
              description={task.date}
            />
          </StyledTaskListItem>
        );
      }}
    />
  );
};

export default TaskList;
