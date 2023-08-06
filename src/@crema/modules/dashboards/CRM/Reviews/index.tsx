import React from "react";
import ReviewsGraph from "./ReviewsGraph";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledReviewContent,
  StyledReviewGraph,
  StyledReviewsCard,
} from "./index.styled";

import type { ReviewGraphDataType } from "@crema/types/models/dashboards/CRM";

type ReviewsProps = {
  reviewGraphData: ReviewGraphDataType[];
};

const Reviews: React.FC<ReviewsProps> = ({ reviewGraphData }) => {
  return (
    <StyledReviewsCard>
      <StyledReviewContent>
        <h3>
          <IntlMessages id="common.reviews" />
        </h3>
        <h4>34,042</h4>
        <p>
          <IntlMessages id="dashboard.reviewText" />
        </p>
      </StyledReviewContent>
      <StyledReviewGraph>
        <ReviewsGraph reviewGraphData={reviewGraphData} />
      </StyledReviewGraph>
    </StyledReviewsCard>
  );
};

export default Reviews;
