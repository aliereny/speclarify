"use client";

import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  deleteRequirementRequest,
  exportRequirementsRequest,
  fetchRequirementsRequest,
} from "@/redux/slices/requirementSlice";
import { Button, Flex, Skeleton, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export const ExportPage = () => {
  const { requirements, loading, exportUrl } = useAppSelector(
    (state) => state.requirements,
  );

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      exportRequirementsRequest({
        orgPath,
        projectPath,
      }),
    );
  }, []);

  return (
    <Flex vertical>
      <Typography.Title level={1}>Export Requirements</Typography.Title>
      {exportUrl ? (
        <Button type={"primary"} href={exportUrl} icon={<DownloadOutlined />}>
          Download
        </Button>
      ) : (
        <Skeleton active />
      )}
    </Flex>
  );
};
