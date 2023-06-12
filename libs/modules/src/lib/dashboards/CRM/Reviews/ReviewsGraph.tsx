import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import type { ReviewGraphDataType } from '@crema/models/dashboards/CRM';

type ReviewsGraphProps = {
  reviewGraphData: ReviewGraphDataType[];
};

const ReviewsGraph: React.FC<ReviewsGraphProps> = ({ reviewGraphData }) => {
  return (
    <ResponsiveContainer height={160} width="100%">
      <LineChart data={reviewGraphData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#C6F6D5"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReviewsGraph;
