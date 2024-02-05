'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Button, Col, Divider, Form, Input, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { CreateOrganizationRequestPayload, Organization } from '@/redux/slices/organizationSlice';
import { ImageUpload } from '@crema/components/ImageUpload/ImageUpload';
import { StyledFormWrapper } from '@/modules/organizations/Organization.styled';

type Props = {
  selectedOrganization?: Organization;
  onSave: (data: CreateOrganizationRequestPayload) => void;
};
export const OrganizationForm = ({ selectedOrganization, onSave }: Props) => {
  const { messages } = useIntl();

  return (
    <AppCard
      title={selectedOrganization ? 'Edit Organization' : 'Add Organization'}
      style={{ width: '70%', margin: 'auto' }}
    >
      <Form
        initialValues={
          selectedOrganization
            ? {
              ...selectedOrganization,
              photo: undefined,
            }
            : {
              name: '',
              email: '',
              phoneNumber: '',
              address: '',
              website: '',
            }
        }
        layout="vertical"
        onFinish={onSave}
      >
        <StyledFormWrapper>
          <Form.Item
            name="name"
            label="Organization Name"
            rules={[
              {
                required: true,
                message: messages['validation.nameRequired'] as string,
              },
              {
                max: 40,
                message: messages['validation.nameTooLong'] as string,
              },
            ]}
          >
            <Input placeholder="Organization Name" />
          </Form.Item>

          <Typography.Title level={4} style={{ marginTop: 16 }}>
            Contact Details
          </Typography.Title>
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <AppRowContainer>
            <Col xs={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: messages['validation.emailRequired'] as string,
                  },
                  {
                    type: 'email',
                    message: messages['validation.emailFormat'] as string,
                  },
                  {
                    max: 80,
                    message: messages['validation.emailTooLong'] as string,
                  },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: messages['validation.phoneRequired'] as string,
                  },
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.resolve();
                      }
                      if (!/^[0-9]{10}$/.test(value)) {
                        return Promise.reject('Enter a valid phone number!');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: messages['validation.addressRequired'] as string,
                  }, {
                    max: 255,
                    message: messages['validation.addressTooLong'] as string,
                  },
                ]}
              >
                <Input.TextArea placeholder="Address" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="website"
                label="Website"
                rules={[
                  {
                    required: true,
                    message: messages['validation.websiteRequired'] as string,
                  }, {
                    max: 255,
                    message: messages['validation.websiteTooLong'] as string,
                  },
                ]}
              >
                <Input placeholder="Website" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="photo"
                label="Photo"
              >
                <ImageUpload existing={selectedOrganization?.photo}/>
              </Form.Item>
            </Col>
          </AppRowContainer>
        </StyledFormWrapper>
        <Button
          style={{ display: 'block', marginLeft: 'auto', marginTop: 24 }}
          htmlType="submit"
          type="primary"
        >
          {selectedOrganization ? 'Edit' : 'Add'} Organization
        </Button>
      </Form>
    </AppCard>
  );
};

