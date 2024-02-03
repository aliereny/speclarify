'use client';
import React, { useEffect, useState } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import ReactCodeInput from 'react-code-input';
import { useIntl } from 'react-intl';
import {
  StyledAuthReconContent,
  StyledConfirmBtn,
  StyledConfirmCodeInput,
  StyledConfirmContent,
} from '../AuthWrapper.styled';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/appStore';
import { verifyEmailRequest } from '@/redux/slices/userSlice';

const ConfirmSignup = (props: any) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const searchParams = useSearchParams()
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      router.push('/signup');
    }
  }, [email]);

  const [pin, setPin] = useState('');

  const { messages }: any = useIntl();

  const handleSubmit = () => {
    if (email && pin.length === 6) {
      dispatch(verifyEmailRequest({ code: pin, email }));
    } else if (!email) {
      router.push('/signup');
      infoViewActionsContext.fetchError(
        messages['validation.tryAgain'] as string,
      );
    } else {
      infoViewActionsContext.fetchError(
        messages['validation.pinLength'] as string,
      );
    }
  };

  return (
    <StyledAuthReconContent>
      <StyledConfirmContent>
        <p>
          <IntlMessages id="common.verificationMessage" />
        </p>
      </StyledConfirmContent>

      <StyledConfirmCodeInput>
        <ReactCodeInput
          name="password"
          type="password"
          value={pin}
          fields={6}
          onChange={(value) => setPin(value)}
          inputMode="numeric"
        />
      </StyledConfirmCodeInput>

      <StyledConfirmBtn type="primary" onClick={handleSubmit}>
        <IntlMessages id="common.submit" />
      </StyledConfirmBtn>
    </StyledAuthReconContent>
  );
};

export default ConfirmSignup;
