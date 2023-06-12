import React from 'react';
import { Form, Select } from 'antd';
import { useIntl } from 'react-intl';
import { StyledTodoChStaffAvatar } from '../index.styled';
import { StaffObjType } from '@crema/models/apps/Todo';
import { useAppSelector } from '../../../../../toolkit/hooks';

const { Option } = Select;

type Props = {
  selectedStaff: StaffObjType;
  handleStaffChange: (value: number) => void;
};

const ChangeStaff = ({ handleStaffChange, selectedStaff }: Props) => {
  const staffList = useAppSelector(({ calendarApp }) => calendarApp.staffList);

  const { messages } = useIntl();
  return (
    <Form.Item className="form-field">
      <Select
        defaultValue={selectedStaff?.id}
        placeholder={messages['common.staff'] as string}
        onSelect={handleStaffChange}
        style={{ minWidth: 150 }}
      >
        {staffList.map((staff) => {
          return (
            <Option value={staff.id} key={staff.id}>
              <div className="ant-row ant-row-middle">
                {staff.image ? (
                  <StyledTodoChStaffAvatar src={staff.image} />
                ) : (
                  <StyledTodoChStaffAvatar>
                    {staff.name.toUpperCase()}
                  </StyledTodoChStaffAvatar>
                )}
                <span>{staff.name}</span>
              </div>
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default ChangeStaff;
