import update from 'immutability-helper';
import React from 'react';
import { ProductFilters } from '../../store/reducers/shopReducer';
import Checkbox from '../../ui-components/Checkbox';
import { upperCaseFirstLetter } from '../../utils/helper';
import { ProductFiltersPropsProps } from './interface';
import './style.css';

const AllProductsSideBar: React.FC<ProductFiltersPropsProps> = (
  { productFilters, userFilters, onUpdateUserFilters }
) => {
  const handleFilterChange = (filterCategory: string, filterValue: string) => (value: boolean) => {
    let newUserFilters: ProductFilters;

    if (value) {
      newUserFilters = update(userFilters, { [filterCategory]: { $push: [filterValue] } });
    } else {
      newUserFilters = update(userFilters, {
        [filterCategory]: {
          $set: userFilters[filterCategory as keyof ProductFilters].filter((val) => {
            return val !== filterValue;
          })
        }
      });
    }

    onUpdateUserFilters(newUserFilters);
  };

  const renderFilters = () => {
    return Object.keys(productFilters).map((filterCategory) => {
      const filterValues = productFilters[filterCategory as keyof ProductFilters];

      return (
        <div key={filterCategory} className="product-filter">
          <p>{upperCaseFirstLetter(filterCategory)}</p>
          {filterValues.map((filterValue => {
            return (
              <div key={filterValue} className="filter-checkbox">
                <Checkbox onChange={handleFilterChange(filterCategory, filterValue)}>{filterValue}</Checkbox>
              </div>
            );
          }))}
        </div>
      );
    })
  };

  return (
    <div className="all-products-side-bar">
      {renderFilters()}
    </div>
  )
};

export default AllProductsSideBar;