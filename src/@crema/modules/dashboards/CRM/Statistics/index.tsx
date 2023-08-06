import React from "react";
import GraphTabs from "./GraphTabs";
import AppCard from "@crema/components/AppCard";
import type { StatisticDataType } from "@crema/types/models/dashboards/CRM";

type StatisticsProps = {
  projectData: StatisticDataType[];
  clientsData: StatisticDataType[];
  incomeData: StatisticDataType[];
};

export const Statistics: React.FC<StatisticsProps> = ({
  clientsData,
  incomeData,
  projectData,
}) => {
  return (
    <AppCard heightFull>
      <GraphTabs
        clientsData={clientsData}
        incomeData={incomeData}
        projectData={projectData}
      />
    </AppCard>
  );
};

export default Statistics;
