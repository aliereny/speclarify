"use client";
import React, { useEffect, useState } from "react";
import { RcFile } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import {
  StyledUpload,
  StyledUploadButton,
  StyledUploadWrapper,
} from "@/ui/atoms/image-upload/imagedUpload.styled";
import { UploadFile } from "antd";
import Image from "next/image";

interface ImageUploadProps {
  value?: UploadFile;
  onChange?: (files: UploadFile) => void;
  disabled?: boolean;
  existing?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
  existing,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value ? [value] : []);

  const handleFileChange = (file: UploadFile) => {
    file.url = URL.createObjectURL(file as RcFile);
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
      {fileList.length === 0 && existing && (
        <div>
          <img
            src={existing}
            alt="image"
            style={{
              height: 100,
              width: 100,
              objectFit: "contain",
              border: "1px solid #e0e0e0",
              borderRadius: 4,
            }}
          />
        </div>
      )}
      <StyledUpload
        listType="picture-card"
        fileList={fileList}
        multiple={true}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        beforeUpload={handleFileChange}
        disabled={disabled}
        onRemove={() => setFileList([])}
      >
        {fileList.length === 0 && (
          <StyledUploadButton type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{existing ? "Change" : "Upload"}</div>
          </StyledUploadButton>
        )}
      </StyledUpload>
    </StyledUploadWrapper>
  );
};
