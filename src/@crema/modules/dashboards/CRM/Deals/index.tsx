import React, { useState } from "react";
import DealsTable from "./DealsTable";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useIntl } from "react-intl";
import AppCard from "@crema/components/AppCard";
import AppSelect from "@crema/components/AppSelect";
import { StyledDealsTitle } from "./index.styled";
import type { DealsTableDataType } from "@crema/types/models/dashboards/CRM";

type DealsProps = {
  dealsTableData: DealsTableDataType[];
};

const Deals: React.FC<DealsProps> = ({ dealsTableData }) => {
  const [tableData, setTableData] = useState(dealsTableData);

  const handleChange = (value: string) => {
    if (value === messages["dashboard.allDeals"]) {
      setTableData(dealsTableData);
    } else if (value === messages["todo.completed"]) {
      setTableData(
        dealsTableData.filter((data) => data.progress === "Approved")
      );
    } else {
      setTableData(
        dealsTableData.filter((data) => data.progress === "Pending")
      );
    }
  };

  const { messages } = useIntl();

  return (
    <AppCard
      className="no-card-space-ltr-rtl"
      title={
        <div className="ant-row ant-row-middle">
          <StyledDealsTitle>
            <IntlMessages id="dashboard.deals" />
          </StyledDealsTitle>
          <AppSelect
            menus={[
              messages["dashboard.allDeals"],
              messages["todo.completed"],
              messages["common.pending"],
            ]}
            defaultValue={messages["dashboard.allDeals"]}
            onChange={handleChange}
          />
        </div>
      }
      extra={<a href="#">{messages["common.viewAll"] as string}</a>}
      heightFull
    >
      <DealsTable dealsTableData={tableData} />
    </AppCard>
  );
};

export default Deals;
