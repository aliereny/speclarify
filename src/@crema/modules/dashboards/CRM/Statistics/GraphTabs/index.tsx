import React, { useState } from "react";
import StatGraphs from "./StatGraphs";
import AppSelect from "@crema/components/AppSelect";
import { Tabs } from "antd";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledStatisticsContent,
  StyledStatisticsHeader,
  StyledStatisticsHeaderAction,
  StyledStatisticTab,
} from "../index.styled";
import type { StatisticDataType } from "@crema/types/models/dashboards/CRM";

type StatisticsProps = {
  projectData: StatisticDataType[];
  clientsData: StatisticDataType[];
  incomeData: StatisticDataType[];
};

const GraphTabs: React.FC<StatisticsProps> = ({
  clientsData,
  incomeData,
  projectData,
}) => {
  const [value, setValue] = useState(0);

  const [projectGraphData, setProjectGraphData] = useState(projectData);
  const [clientsGraphData, setClientsGraphData] = useState(clientsData);
  const [incomeGraphData, setIncomeGraphData] = useState(incomeData);
  const { TabPane } = Tabs;

  const onSetGraphValue = (data: any) => {
    switch (value) {
      case 0: {
        setProjectGraphData(data);
        break;
      }
      case 1: {
        setClientsGraphData(data);
        break;
      }
      case 2: {
        setIncomeGraphData(data);
        break;
      }
      default:
        return null;
    }
  };

  const handleChange = (newValue: string) => {
    setValue(+newValue);
  };

  const handleYearChange = (value: number) => {
    switch (value) {
      case 2017:
        onSetGraphValue(incomeData);
        break;
      case 2018:
        onSetGraphValue(clientsData);
        break;
      case 2021:
        onSetGraphValue(projectData);
        break;
      default:
        onSetGraphValue(projectData);
    }
  };

  const handleMonthChange = (value: string) => {
    switch (value) {
      case "June":
        onSetGraphValue(incomeData);
        break;
      case "July":
        onSetGraphValue(clientsData);
        break;
      case "August":
        onSetGraphValue(projectData);
        break;
      default:
        onSetGraphValue(projectData);
    }
  };

  return (
    <StyledStatisticsContent>
      <StyledStatisticsHeader>
        <h3>
          <IntlMessages id="dashboard.statistics" />
        </h3>

        <StyledStatisticsHeaderAction>
          <AppSelect
            menus={[2021, 2018, 2017]}
            defaultValue={2021}
            onChange={handleYearChange}
          />
          <AppSelect
            menus={["June", "July", "August"]}
            defaultValue="June"
            onChange={handleMonthChange}
          />
        </StyledStatisticsHeaderAction>
      </StyledStatisticsHeader>
      <StyledStatisticTab defaultActiveKey="1" onChange={handleChange}>
        <TabPane tab={<IntlMessages id="dashboard.project" />} key="1">
          <StatGraphs data={projectGraphData} />
        </TabPane>
        <TabPane tab={<IntlMessages id="dashboard.newClients" />} key="2">
          <StatGraphs data={clientsGraphData} />
        </TabPane>
        <TabPane tab={<IntlMessages id="dashboard.income" />} key="3">
          <StatGraphs data={incomeGraphData} />
        </TabPane>
      </StyledStatisticTab>
    </StyledStatisticsContent>
  );
};

export default GraphTabs;
