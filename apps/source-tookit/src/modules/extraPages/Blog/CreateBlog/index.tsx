import React, { useEffect, useId, useState } from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import BlogSidebar from './Sidebar';
import BlogContent from './Content';
import { useAppDispatch } from '../../../../toolkit/hooks';
import { onAddBlog, onEditBlog } from '../../../../toolkit/actions';
import { CreateNewBlog } from './NewBlogTemplete';
import { useRouter } from 'next/router';
import { StyledTitle } from './index.styled';
import { Form } from 'antd';
import {
  BlogContentType,
  BlogDetailContentType,
  FileType,
  MetaType,
  RecentPostType,
  TagType,
} from '@crema/models/extrapages/Blog';
type Props = {
  selectedBlog?: BlogContentType;
};

export const CreateBlog = ({ selectedBlog }: Props) => {
  const id = useId();
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (selectedBlog) {
      setSelectedTags(selectedBlog?.blogDetailContent?.tag);
      setUploadedFiles([
        { preview: selectedBlog?.blogDetailContent?.cardMedia },
      ]);
    }
  }, [selectedBlog]);
  return (
    <>
      <StyledTitle>
        {selectedBlog ? 'Edit Blog' : 'Create a new blog'}
      </StyledTitle>

      <Form
        initialValues={{
          title: selectedBlog?.blogDetailContent?.title || '',
          description: selectedBlog?.blogDetailContent?.description || '',
          content: selectedBlog?.blogDetailContent?.content || '',
          tag: selectedBlog?.blogDetailContent?.tag || [],
          cardMedia: selectedBlog?.blogDetailContent?.cardMedia || '',
          metatitle: selectedBlog?.blogDetailContent?.meta?.metatitle || '',
          metadesc: selectedBlog?.blogDetailContent?.meta?.metadesc || '',
          keywords: selectedBlog?.blogDetailContent?.meta?.keywords || '',
        }}
        layout="vertical"
        onFinish={(data) => {
          if (selectedBlog) {
            const newBlog = {
              ...selectedBlog,
              blogDetailContent: {
                ...selectedBlog.blogDetailContent,
                title: data.title,
                description: data.description,
                content: data.content,
                tag: selectedTags,
                cardMedia:
                  uploadedFiles[0]?.preview ||
                  selectedBlog.blogDetailContent.cardMedia,
                meta: {
                  keywords: data.keywords,
                  metadesc: data.metadesc,
                  metatitle: data.metatitle,
                },
                post: {
                  user: '/assets/images/avatar/A12.jpg',
                  userName: 'John Deuo',
                  userPosition: 'Co-founder',
                  description: selectedBlog.blogDetailContent.post.description,
                },
              },
            };
            dispatch(onEditBlog(newBlog));
            router.push('/extra-pages/blog');
          } else {
            dispatch(
              onAddBlog(
                CreateNewBlog({
                  ...data,
                  id,
                  content: data.content,
                  srcImg: uploadedFiles[0]?.preview,
                  tag: selectedTags,
                } as BlogDetailContentType & MetaType & Partial<RecentPostType>)
              )
            );
            router.push('/extra-pages/blog');
          }
        }}
      >
        <AppRowContainer>
          <BlogContent
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
          <BlogSidebar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </AppRowContainer>
      </Form>
    </>
  );
};

export default CreateBlog;
