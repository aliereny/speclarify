import AppLoader from '@crema/components/AppLoader';
import { BlogDetail } from '@crema/modules/extraPages/Blog';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getBlogDetail } from '../../../toolkit/actions';

const BlogDetailPage = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector(({ blogs }) => blogs.selectedBlog);
  const { loading } = useAppSelector(({ common }) => common);

  useEffect(() => {
    if (query?.all?.[0]) dispatch(getBlogDetail(query?.all?.[0]));
  }, [dispatch, query.all]);

  return loading ? (
    <AppLoader />
  ) : !isEmptyObject(selectedBlog?.blogDetail) ? (
    <BlogDetail
      blogSidebar={selectedBlog!.blogSidebar}
      blogDetail={selectedBlog!.blogDetail}
    />
  ) : null;
};
export default BlogDetailPage;
