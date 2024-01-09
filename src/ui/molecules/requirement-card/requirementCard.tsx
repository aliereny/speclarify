import { Button, Flex, Input, Space, Typography } from "antd";
import { useState } from "react";

interface RequirementCardProps {
  disabled: boolean;
  onSave: () => void;
  onDelete: () => void;
  text?: string;
  title?: string;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({
  disabled,
  onSave,
  onDelete,
  text,
  title,
}) => {
  const [textValue, setTextValue] = useState<string>(text ?? "");
  const [titleValue, setTitleValue] = useState<string>(title ?? "");

  return (
    <Flex
      gap={8}
      vertical
      style={{
        border: "1px solid #d9d9d9",
        padding: 16,
        borderRadius: 4,
      }}
    >
      <Flex gap={32}>
        <Flex style={{ flex: 1 }} gap={8} align={"center"}>
          <Typography.Text strong>Title:</Typography.Text>
          <Input
            placeholder={"Title"}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            disabled={disabled}
            style={{ flex: 1 }}
          />
        </Flex>
        <Space>
          <Button
            type={"primary"}
            onClick={onSave}
            disabled={
              disabled ||
              ((textValue === text ?? "") && (titleValue === title ?? ""))
            }
          >
            Save
          </Button>
          <Button
            type={"primary"}
            danger
            onClick={onDelete}
            disabled={disabled}
          >
            Delete
          </Button>
        </Space>
      </Flex>
      <Typography.Text strong>Description:</Typography.Text>
      <Input.TextArea
        placeholder={"Description"}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        autoSize
        rows={3}
        style={{ flex: 1 }}
        disabled={disabled}
      />
    </Flex>
  );
};
