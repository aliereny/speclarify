import React from 'react';
import { Form, Select } from 'antd';
import { useIntl } from 'react-intl';
import { StyledTodoChStaffAvatar } from '../index.styled';
import { useAppSelector } from '../../../../../toolkit/hooks';
import { StaffObjType } from '@crema/models/apps/Todo';
const { Option } = Select;

type ChangeStaffProps = {
  inputLabel: any;
  labelWidth: number;
  selectedStaff: StaffObjType;
  handleStaffChange: (value: number) => void;
};

const ChangeStaff: React.FC<ChangeStaffProps> = ({
  selectedStaff,
  handleStaffChange,
}) => {
  const staffList = useAppSelector(({ todoApp }) => todoApp.staffList);

  const { messages } = useIntl();
  return (
    <Form.Item className="form-field">
      <Select
        defaultValue={selectedStaff?.id}
        placeholder={messages['common.staff'] as string}
        onSelect={handleStaffChange}
        style={{ minWidth: 150 }}
      >
        {staffList.map((staff: StaffObjType) => {
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
