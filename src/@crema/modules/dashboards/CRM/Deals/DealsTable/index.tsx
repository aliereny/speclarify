import React from "react";
import { Avatar } from "antd";
import {
  StyledDealsUserInfo,
  StyledDetailUserInfoContent,
  StyledDealsTable,
} from "../index.styled";
import type { DealsTableDataType } from "@crema/types/models/dashboards/CRM";

const columns = [
  {
    title: "No.",
    dataIndex: `id`,
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: DealsTableDataType["name"]) => (
      <StyledDealsUserInfo>
        <Avatar src={name.logo} />
        <StyledDetailUserInfoContent>
          <h3>{name.name}</h3>
        </StyledDetailUserInfoContent>
      </StyledDealsUserInfo>
    ),
  },
  {
    title: "Progress",
    dataIndex: "progress",
    key: "progress",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
];

type DealsTableProps = {
  dealsTableData: DealsTableDataType[];
};

const DealsTable: React.FC<DealsTableProps> = ({ dealsTableData }) => {
  return (
    <StyledDealsTable
      hoverColor
      data={dealsTableData}
      columns={columns}
      pagination={false}
    />
  );
};

export default DealsTable;
