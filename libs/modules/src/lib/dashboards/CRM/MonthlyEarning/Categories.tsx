import React from 'react';
import {List} from 'antd';
import {
  StyledEarningAction,
  StyledEarningDot,
  StyledEarningText,
} from './index.styled';

type CategoriesProps = {
  category: any;
}

const Categories: React.FC<CategoriesProps> = ({category}) => {
  return (
    <List.Item>
      <StyledEarningDot style={{backgroundColor: category.colorName}} />
      <StyledEarningText>{category.name}</StyledEarningText>
      <StyledEarningAction>${category.value}</StyledEarningAction>
    </List.Item>
  );
};

export default Categories;
