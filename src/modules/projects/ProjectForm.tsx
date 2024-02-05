'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Button, Col, Divider, Form, Input, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { CreateProjectRequestPayload, Project } from '@/redux/slices/projectSlice';
import { ImageUpload } from '@crema/components/ImageUpload/ImageUpload';
import { StyledFormWrapper } from '@/modules/projects/Project.styled';

type Props = {
  selectedProject?: Project;
  onSave: (data: CreateProjectRequestPayload) => void;
};
export const ProjectForm = ({ selectedProject, onSave }: Props) => {
  const { messages } = useIntl();

  return (
    <AppCard
      title={selectedProject ? 'Edit Project' : 'Add Project'}
      style={{ width: '70%', margin: 'auto' }}
    >
      <Form
        initialValues={
          selectedProject
            ? {
              ...selectedProject,
              photo: undefined,
            }
            : {
              name: '',
              description: '',
            }
        }
        layout="vertical"
        onFinish={onSave}
      >
        <StyledFormWrapper>
          <Form.Item
            name="name"
            label="Project Name"
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
            <Input placeholder="Project Name" />
          </Form.Item>

          <Typography.Title level={4} style={{ marginTop: 16 }}>
            Contact Details
          </Typography.Title>
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <AppRowContainer>
            <Col xs={24}>
              <Form.Item
                name="description"
                label="Description"
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
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="photo"
                label="Photo"
              >
                <ImageUpload existing={selectedProject?.photo}/>
              </Form.Item>
            </Col>
          </AppRowContainer>
        </StyledFormWrapper>
        <Button
          style={{ display: 'block', marginLeft: 'auto', marginTop: 24 }}
          htmlType="submit"
          type="primary"
        >
          {selectedProject ? 'Edit' : 'Add'} Project
        </Button>
      </Form>
    </AppCard>
  );
};

