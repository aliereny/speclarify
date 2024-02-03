import React from 'react';
import { useIntl } from 'react-intl';
import { Checkbox, Form, Input } from 'antd';

import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
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
import { SignInProps } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/navigation';

const SignInJwtAuth = () => {
  const router = useRouter();
  const { signInUser } = useAuthMethod();

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
            email: 'crema.demo@gmail.com',
            password: 'Pass@1!@all',
          }}
          onFinish={(values) => signInUser(values as SignInProps)}
          onFinishFailed={onFinishFailed}
          layout={'vertical'}
        >
          <Form.Item<SignInProps>
            name="email"
            className="form-field"
            label={messages['common.email'] as string}
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input placeholder={messages['common.email'] as string} />
          </Form.Item>

          <Form.Item<SignInProps>
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

export default SignInJwtAuth;
