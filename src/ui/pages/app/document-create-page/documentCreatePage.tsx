"use client";
import { Alert, Button, Flex, Form, Typography } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { DocumentUpload } from "@/ui/atoms/document-upload/documentUpload";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { createDocumentRequest } from "@/redux/slices/documentSlice";
import { useParams } from "next/navigation";

type FormData = {
  file: RcFile;
};

export const DocumentCreatePage = () => {
  const { loading } = useAppSelector((state) => state.documents);
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const onFinish = (data: FormData) => {
    dispatch(
      createDocumentRequest({
        orgPath,
        projectPath,
        file: data.file,
      }),
    );
  };

  return (
    <Flex vertical>
      <Typography.Title level={1}>Create Document</Typography.Title>
      <Alert
        type={"info"}
        message={
          "Available file types: Microsoft Word, Microsoft Excel, PDF, Plain Text"
        }
      />
      <Alert
        type={"info"}
        message={
          "For the Excel files, there should be 3 columns: Identifier, Description, and Classification (optional). " +
          "Available classifications are: Functional, Availability, Legal, Look and Feel, Maintainability, Operational, " +
          "Performance, Scalability, Security, Usability, Fault Tolerance, and Portability"
        }
      />
      <Form<FormData>
        layout={"vertical"}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item<FormData>
          name={"file"}
          label={"File"}
          rules={[
            {
              required: true,
              message: "File is required",
            },
          ]}
        >
          <DocumentUpload />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
