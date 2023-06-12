import React from 'react';
import { Checkbox } from 'antd';
import { StyledContactHeaderCheckboxView } from '../index.styled';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppSelector } from '../../../../../toolkit/hooks';

type CheckBoxProps = {
  checkedContacts: number[];
  setCheckedContacts: (contactIds: number[]) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checkedContacts,
  setCheckedContacts,
}) => {
  const contactList = useAppSelector(
    ({ contactApp }) => contactApp.contactList
  );
  const onHandleMasterCheckbox = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      const contactIds = contactList?.map((contact) => contact.id);
      setCheckedContacts(contactIds);
    } else {
      setCheckedContacts([]);
    }
  };

  return (
    <StyledContactHeaderCheckboxView>
      <Checkbox
        indeterminate={
          checkedContacts.length > 0 &&
          checkedContacts.length < contactList?.length
        }
        checked={
          contactList?.length > 0 &&
          checkedContacts.length === contactList?.length
        }
        onChange={onHandleMasterCheckbox}
      />
    </StyledContactHeaderCheckboxView>
  );
};

export default CheckBox;
