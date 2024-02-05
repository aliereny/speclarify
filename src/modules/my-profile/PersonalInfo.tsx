import { Button, Form, Input } from 'antd';
import { ImageUpload } from '@crema/components/ImageUpload/ImageUpload';
import { StyledPersonalInfoWrapper } from '@/modules/my-profile/MyProfile.styled';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import AppLoader from '@crema/components/AppLoader';
import { useRouter } from 'next/navigation';
import { StyledTypographyWrapper } from '@/modules/organizations/Organization.styled';
import { updateProfileRequest } from '@/redux/slices/userSlice';
import { RcFile } from 'antd/lib/upload/interface';

type FormData = {
  name: string;
  email: string;
  photo?: RcFile;
};

export const PersonalInfo = () => {
  const { currentUser, loading } = useAppSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFinish = (values: FormData) => {
    dispatch(updateProfileRequest(values));
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
        <h2>Personal Information</h2>
      </StyledTypographyWrapper>
      <Form<FormData>
        layout={'vertical'}
        onFinish={handleFinish}
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
        }}
      >
        <Form.Item<FormData>
          label={'Full Name'}
          required
          name={'name'}
          rules={[
            {
              required: true,
              message: 'Please input your Full Name!',
            },
          ]}
        >
          <Input placeholder='Full Name' />
        </Form.Item>
        <Form.Item<FormData>
          label={'E-Mail'}
          required
          name={'email'}
          rules={[
            {
              required: true,
              message: 'Please input your e-mail address!',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input placeholder='E-mail' />
        </Form.Item>
        <Form.Item<FormData> label={'Profile photo'} name={'photo'}>
          <ImageUpload existing={currentUser.photo} />
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
