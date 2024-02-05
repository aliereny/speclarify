import { Button, Form, Input } from 'antd';
import { StyledPersonalInfoWrapper } from '@/modules/my-profile/MyProfile.styled';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import AppLoader from '@crema/components/AppLoader';
import { useRouter } from 'next/navigation';
import { StyledTypographyWrapper } from '@/modules/organizations/Organization.styled';
import {
  changePasswordRequest,
  ChangePasswordRequestPayload,
} from '@/redux/slices/userSlice';

export const ChangePassword = () => {
  const { currentUser, loading } = useAppSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<ChangePasswordRequestPayload>();

  const handleFinish = (values: ChangePasswordRequestPayload) => {
    dispatch(changePasswordRequest(values));
  };

  if (loading) {
    return <AppLoader />;
  }

  if (!currentUser) {
    router.push('/signin');
    return null;
  }

  return (
    <StyledPersonalInfoWrapper>
      <StyledTypographyWrapper>
        <h2>Change Password</h2>
      </StyledTypographyWrapper>
      <Form<ChangePasswordRequestPayload>
        layout={'vertical'}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item<ChangePasswordRequestPayload>
          label={'Current Password'}
          required
          name={'currentPassword'}
          rules={[
            {
              required: true,
              message: 'Please input your current password!',
            },
          ]}
        >
          <Input.Password placeholder='Current Password' />
        </Form.Item>
        <Form.Item<ChangePasswordRequestPayload>
          label={'New Password'}
          required
          name={'newPassword'}
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input.Password placeholder='New Password' />
        </Form.Item>
        <Form.Item<ChangePasswordRequestPayload>
          label={'Confirm Password'}
          required
          name={'confirmPassword'}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!',
            },
            {
              validator: (rule, value, callback) => {
                if (value !== form.getFieldValue('newPassword')) {
                  callback('The two passwords that you entered do not match!');
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input.Password placeholder='Confirm password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </StyledPersonalInfoWrapper>
  );
};
