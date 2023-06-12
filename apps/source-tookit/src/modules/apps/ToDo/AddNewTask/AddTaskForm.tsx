import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import { Col, Form, Input, Select } from 'antd';
import AppRowContainer from '@crema/components/AppRowContainer';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  StyledAddTaskFormDate,
  StyledSelectRow,
  StyledTodoAddTaskForm,
  StyledTodoInput,
  StyledTodoModalFooter,
  StyledTodoModelBtn,
  StyledTodoModelContent,
  StyledTodoSelectAvatar,
  StyledTodoSelectName,
} from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onCreateTask } from '../../../../toolkit/actions';
import dayjs from 'dayjs';
import {
  LabelObjType,
  PriorityObjType,
  StaffObjType,
} from '@crema/models/apps/Todo';
import {
  generateRandomUniqueNumber,
  getDateObject,
  getFormattedDate,
} from '@crema/helpers';

type AddTaskFormProps = {
  onCloseAddTask: () => void;
  selectedDate?: string;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onCloseAddTask,
  selectedDate,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAuthUser();
  const labelList = useAppSelector(({ todoApp }) => todoApp.labelList);

  const priorityList = useAppSelector(({ todoApp }) => todoApp.priorityList);

  const staffList = useAppSelector(({ todoApp }) => todoApp.staffList);

  const onFinish = (values: any) => {
    const staff = staffList.find(
      (staff: StaffObjType) => staff.id === +values.staffList
    );
    const priority = priorityList.find(
      (label: PriorityObjType) => +values.priorityList === label.id
    );
    const label = labelList.filter(
      (label: LabelObjType) => +values.labelList === label.id
    );

    const newTask = {
      ...values,
      id: generateRandomUniqueNumber(),
      isStarred: false,
      hasAttachments: false,
      sentAt: '10.30am',
      isRead: true,
      folderValue: 120,
      createdBy: {
        name: user.displayName ? user.displayName : 'user',
        image: user.photoURL ? user.photoURL : '/assets/images/dummy2.jpg',
      },
      startDate: getFormattedDate(values.scheduleDate),
      assignedTo: staff,
      createdOn: dayjs().format('MMM DD'),
      status: 1,
      comments: [],
      label: label,
      priority: priority,
    };
    console.log(newTask);
    dispatch(onCreateTask(newTask));
    onCloseAddTask();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    onCloseAddTask();
  };

  const { messages } = useIntl();

  const { Option } = Select;

  return (
    <StyledTodoAddTaskForm
      name="basic"
      initialValues={{
        startDate: selectedDate ? getDateObject(selectedDate) : getDateObject(),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <StyledTodoModelContent>
        <Form.Item
          className="form-field"
          name="title"
          rules={[{ required: true, message: 'Please input your Task Title!' }]}
        >
          <StyledTodoInput placeholder={messages['todo.taskTitle'] as string} />
        </Form.Item>

        <AppRowContainer>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="staffList" className="form-field">
              <Select placeholder={messages['common.staff'] as string}>
                {staffList.map((staff: StaffObjType) => {
                  return (
                    <Option value={staff.id} key={staff.id}>
                      <StyledSelectRow>
                        {staff.image ? (
                          <StyledTodoSelectAvatar src={staff.image} />
                        ) : (
                          <StyledTodoSelectAvatar>
                            {staff.name.toUpperCase()}
                          </StyledTodoSelectAvatar>
                        )}
                        <StyledTodoSelectName className="text-truncate">
                          {staff.name}
                        </StyledTodoSelectName>
                      </StyledSelectRow>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item className="form-field" name="startDate">
              <StyledAddTaskFormDate />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item className="form-field" name="priorityList">
              <Select placeholder={messages['common.priority'] as string}>
                {priorityList.map((priority: PriorityObjType) => {
                  return (
                    <Option value={priority.id} key={priority.id}>
                      {priority.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item className="form-field" name="labelList">
              <Select
                placeholder={messages['common.label'] as string}
                mode="multiple"
                maxTagCount={2}
              >
                {labelList.map((label: LabelObjType) => {
                  return (
                    <Option value={label.id} key={label.id}>
                      {label.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </AppRowContainer>

        <Form.Item className="form-field" name="content">
          <Input.TextArea
            placeholder={messages['common.description'] as string}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
      </StyledTodoModelContent>

      <StyledTodoModalFooter>
        <StyledTodoModelBtn type="primary" htmlType="submit">
          <IntlMessages id="common.save" />
        </StyledTodoModelBtn>
      </StyledTodoModalFooter>
    </StyledTodoAddTaskForm>
  );
};

export default AddTaskForm;
