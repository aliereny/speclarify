import React, { useState } from 'react';
import AddContactForm from './AddContactForm';
import { StyledContactModal } from './index.styled';
import type { ContactObjType } from '@crema/models/apps/Contact';

type CreateContactProps = {
  isAddContact: boolean;
  handleAddContactClose: () => void;
  selectContact?: ContactObjType | null;
  onUpdateContact?: (newContact: ContactObjType) => void;
};

const CreateContact: React.FC<CreateContactProps> = ({
  isAddContact,
  handleAddContactClose,
  selectContact,
  onUpdateContact,
}) => {
  const [userImage, setUserImage] = useState(
    selectContact && selectContact.image
      ? selectContact.image
      : '/assets/images/placeholder.jpg'
  );

  return (
    <StyledContactModal
      open={isAddContact}
      // onOk={isAddContact}
      footer={false}
      onCancel={handleAddContactClose}
    >
      <AddContactForm
        selectContact={selectContact}
        setUserImage={setUserImage}
        userImage={userImage}
        onUpdateContact={onUpdateContact}
        handleAddContactClose={handleAddContactClose}
      />
    </StyledContactModal>
  );
};
export default CreateContact;
