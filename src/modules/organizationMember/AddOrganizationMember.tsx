'use client';
import { StyledTypographyWrapper } from '@/modules/organizations/Organization.styled';
import { Button, Form, Input, Select, Typography } from 'antd';
import { StyledAddOrganizationMemberWrapper } from '@/modules/organizationMember/OrganizationMember.styled';
import {
  createOrganizationMemberRequest,
  OrganizationRole,
} from '@/redux/slices/organizationMemberSlice';
import { useAppDispatch } from '@/redux/appStore';
import { useParams } from 'next/navigation';

type FormValues = {
  email: string;
  role: OrganizationRole;
};

export const AddOrganizationMember = () => {
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  const onFinish = (values: FormValues) => {
    dispatch(createOrganizationMemberRequest({ ...values, orgPath }));
  };

  return (
    <StyledAddOrganizationMemberWrapper>
      <StyledTypographyWrapper>
        <Typography.Title level={2}>Add Organization Member</Typography.Title>
      </StyledTypographyWrapper>
      <Form<FormValues> layout={'vertical'} onFinish={onFinish}>
        <Form.Item<FormValues>
          label={'E-mail'}
          name='email'
          rules={[
            {
              required: true,
              message: 'E-mail is required',
            },
            {
              type: 'email',
              message: 'Invalid e-mail',
            },
          ]}
        >
          <Input placeholder={'E-mail'} />
        </Form.Item>
        <Form.Item<FormValues>
          label={'Role'}
          name={'role'}
          rules={[
            {
              required: true,
              message: 'Role is required',
            },
          ]}
        >
          <Select
            placeholder={'Role'}
            options={[
              { label: 'Admin', value: OrganizationRole.Admin },
              { label: 'Editor', value: OrganizationRole.Editor },
              { label: 'Viewer', value: OrganizationRole.Viewer },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType={'submit'}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </StyledAddOrganizationMemberWrapper>
  );
};
