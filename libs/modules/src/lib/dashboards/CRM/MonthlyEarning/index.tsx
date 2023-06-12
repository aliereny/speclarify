import React from 'react';
import EarningGraph from './EarningGraph';
import Categories from './Categories';
import AppCard from '@crema/components/AppCard';
import { List } from 'antd';
import { useIntl } from 'react-intl';
import { StyledEarningGraph, StyledEarningListView } from './index.styled';
import type { EarningGraphDataType } from '@crema/models/dashboards/CRM';

type MonthlyEarningProps = {
  earningGraphData: EarningGraphDataType[];
};

export const MonthlyEarning: React.FC<MonthlyEarningProps> = ({
  earningGraphData,
}) => {
  const { messages } = useIntl();
  return (
    <AppCard heightFull title={messages['dashboard.earningInMonth'] as string}>
      <StyledEarningGraph>
        <EarningGraph earningGraphData={earningGraphData} />
      </StyledEarningGraph>

      <StyledEarningListView>
        <List>
          {earningGraphData.map((category) => {
            if (category.name !== '') {
              return <Categories category={category} key={category.name} />;
            }
            return null;
          })}
        </List>
      </StyledEarningListView>
    </AppCard>
  );
};

export default MonthlyEarning;
