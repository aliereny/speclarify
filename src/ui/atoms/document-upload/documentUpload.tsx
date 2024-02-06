"use client";
import React, { useEffect, useState } from "react";
import { RcFile } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import {
  StyledUpload,
  StyledUploadButton,
  StyledUploadWrapper,
} from "@/ui/atoms/document-upload/documentUpload.styled";
import { UploadFile } from "antd";
import Image from "next/image";

interface ImageUploadProps {
  value?: UploadFile;
  onChange?: (files: UploadFile) => void;
  disabled?: boolean;
}

export const DocumentUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value ? [value] : []);

  const handleFileChange = (file: UploadFile) => {
    setFileList([file]);

    if (onChange) {
      onChange(file);
    }

    return false;
  };

  useEffect(() => {
    if (value) {
      setFileList([value]);
    } else {
      setFileList([]);
    }
  }, [value]);

  return (
    <StyledUploadWrapper>
      <StyledUpload
        listType="text"
        fileList={fileList}
        multiple={true}
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
        beforeUpload={handleFileChange}
        disabled={disabled}
        onRemove={() => setFileList([])}
      >
        {fileList.length === 0 && (
          <StyledUploadButton type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{"Upload"}</div>
          </StyledUploadButton>
        )}
      </StyledUpload>
    </StyledUploadWrapper>
  );
};
