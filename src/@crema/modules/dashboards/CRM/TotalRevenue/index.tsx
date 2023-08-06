import React from "react";
import RevenueGraph from "./RevenueGraph";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledRevenueContent,
  StyledRevenueContentBottom,
  StyledRevenueContentItem,
  StyledRevenueContentTop,
  StyledRevenueGraph,
  StyledRevenueRow,
  StyledTotalRevnueCard,
} from "./index.styled";
import type { RevenueDataType } from "@crema/types/models/dashboards/CRM";

type TotalRevenueProps = {
  revenueData: RevenueDataType;
};

const TotalRevenue: React.FC<TotalRevenueProps> = ({ revenueData }) => {
  return (
    <>
      <h2 className="card-outer-title text-uppercase">
        <IntlMessages id="dashboard.totalRevenue" />
      </h2>
      <StyledTotalRevnueCard>
        <StyledRevenueRow>
          <StyledRevenueContent>
            <StyledRevenueContentTop>
              <h3>{revenueData.ytdRevenue}</h3>
              <p>
                <IntlMessages id="dashboard.ytdRevenue" />
              </p>
            </StyledRevenueContentTop>
            <StyledRevenueContentBottom>
              <StyledRevenueContentItem>
                <h3 style={{ color: "#0A8FDC" }}>{revenueData.clients}</h3>
                <p>
                  <IntlMessages id="dashboard.clients" />
                </p>
              </StyledRevenueContentItem>

              <StyledRevenueContentItem>
                <h3 style={{ color: "#49BD65" }}>{revenueData.countries}</h3>
                <p>
                  <IntlMessages id="dashboard.countries" />
                </p>
              </StyledRevenueContentItem>
            </StyledRevenueContentBottom>
          </StyledRevenueContent>
          <StyledRevenueGraph>
            <RevenueGraph data={revenueData.revenueGraphData} />
          </StyledRevenueGraph>
        </StyledRevenueRow>
      </StyledTotalRevnueCard>
    </>
  );
};

export default TotalRevenue;
