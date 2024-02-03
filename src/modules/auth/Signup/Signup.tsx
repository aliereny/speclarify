import React from 'react';
import { Checkbox, Form, Input } from 'antd';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import {
  StyledSignLinkTag,
  StyledSignUp,
  StyledSignUpBtn,
  StyledSignupCheckBox,
  StyledSignUpContent,
  StyledSignUpForm,
  StyledSignupLink,
  StyledSignUpTestGrey,
} from './index.styled';
import { useAppDispatch } from '@/redux/appStore';
import { signUpRequest, SignUpRequestPayload } from '@/redux/slices/userSlice';

const Signup = () => {
  const { messages } = useIntl();
  const dispatch = useAppDispatch();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <StyledSignUp>
      <StyledSignUpContent>
        <StyledSignUpForm
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            const password = form.getFieldValue('password');
            const confirmPassword = form.getFieldValue('confirmPassword');
            if (password !== confirmPassword) {
              form.setFields([
                {
                  name: 'confirmPassword',
                  errors: ['Password and Confirm Password are not same'],
                },
              ]);
              return;
            }
            dispatch(signUpRequest(values as SignUpRequestPayload));
          }}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            name="name"
            className="form-field"
            rules={[{ required: true, message: 'Please input your Name!' }, {
              max: 80,
              message: 'Name must be less than 80 characters',
            }]}
          >
            <Input placeholder={messages['common.name'] as string} />
          </Form.Item>

          <Form.Item
            name="email"
            className="form-field"
            rules={[{ required: true, message: 'Please input your Email!' }, {
              type: 'email',
              message: 'Please enter valid email!',
            }, {
              max: 80,
              message: 'Email must be less than 80 characters',
            }]}
          >
            <Input placeholder={messages['common.email'] as string} />
          </Form.Item>

          <Form.Item
            name="password"
            className="form-field"
            rules={[{ required: true, message: 'Please input your Password!' }, {
              max: 80,
              message: 'Password must be less than 80 characters',
            }]}
          >
            <Input.Password placeholder={messages['common.password'] as string} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            className="form-field"
            rules={[
              {
                required: true,
                message: 'Please input your Retype Password!',
              },
            ]}
          >
            <Input.Password placeholder={messages['common.retypePassword'] as string} />
          </Form.Item>

          <StyledSignupCheckBox
            className="form-field"
            name="iAgreeTo"
            valuePropName="checked"
          >
            <Checkbox>
              <IntlMessages id="common.iAgreeTo" />
            </Checkbox>
            <StyledSignupLink>
              <IntlMessages id="common.termConditions" />
            </StyledSignupLink>
          </StyledSignupCheckBox>

          <div className="form-btn-field">
            <StyledSignUpBtn type="primary" htmlType="submit">
              <IntlMessages id="common.signup" />
            </StyledSignUpBtn>
          </div>

          <div className="form-field-action">
            <StyledSignUpTestGrey>
              <IntlMessages id="common.alreadyHaveAccount" />
            </StyledSignUpTestGrey>
            <StyledSignLinkTag href="/signIn">
              <IntlMessages id="common.signIn" />
            </StyledSignLinkTag>
          </div>
        </StyledSignUpForm>
      </StyledSignUpContent>
    </StyledSignUp>
  );
};

export default Signup;
