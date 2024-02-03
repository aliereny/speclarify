import React from 'react';
import { useIntl } from 'react-intl';
import { Checkbox, Form, Input } from 'antd';

import IntlMessages from '@crema/helpers/IntlMessages';
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignForm,
  StyledSignLink,
  StyledSignLinkTag,
  StyledSignTextGrey,
} from './index.styled';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/appStore';
import { signInRequest, SignInRequestPayload } from '@/redux/slices/userSlice';

const Signin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onGoToForgetPassword = () => {
    router.push('/forget-password');
  };

  function onRememberMe(e: CheckboxChangeEvent) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { messages } = useIntl();

  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => dispatch(signInRequest(values as SignInRequestPayload))}
          onFinishFailed={onFinishFailed}
          layout={'vertical'}
        >
          <Form.Item<SignInRequestPayload>
            name="email"
            className="form-field"
            label={messages['common.email'] as string}
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input placeholder={messages['common.email'] as string} />
          </Form.Item>

          <Form.Item<SignInRequestPayload>
            name="password"
            className="form-field"
            label={messages['common.password'] as string}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder={messages['common.password'] as string} />
          </Form.Item>

          <StyledRememberMe>
            <Checkbox onChange={onRememberMe}>
              <IntlMessages id="common.rememberMe" />
            </Checkbox>

            <StyledSignLink onClick={onGoToForgetPassword}>
              <IntlMessages id="common.forgetPassword" />
            </StyledSignLink>
          </StyledRememberMe>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit">
              <IntlMessages id="common.login" />
            </SignInButton>
          </div>

          <div className="form-field-action">
            <StyledSignTextGrey>
              <IntlMessages id="common.dontHaveAccount" />
            </StyledSignTextGrey>
            <StyledSignLinkTag href="/signup">
              <IntlMessages id="common.signup" />
            </StyledSignLinkTag>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default Signin;
