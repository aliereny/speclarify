'use client';
import React, { useEffect, useState } from 'react';
import { RcFile } from 'antd/lib/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import {
  StyledUpload,
  StyledUploadButton,
  StyledUploadWrapper,
} from '@crema/components/ImageUpload/ImagedUpload.styled';
import { UploadFile } from 'antd';

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
      {
        fileList.length === 0 && existing && (
          <img src={existing} alt="image" width={100} height={100} />
        )
      }
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
            <div style={{ marginTop: 8 }}>{existing ? 'Change' : 'Upload'}</div>
          </StyledUploadButton>
        )}
      </StyledUpload>
    </StyledUploadWrapper>
  );
};
