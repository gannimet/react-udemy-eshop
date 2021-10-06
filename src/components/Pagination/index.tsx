import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Button from '../../ui-components/Button';
import { PaginationProps } from './interface';
import './style.css';

const Pagination: React.FC<PaginationProps> = ({ overrideSelectedPage, onChange, numberOfPages }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const theme = useContext(ThemeContext);
  const currentlySelectedPage = overrideSelectedPage || selectedPage;

  const handleLeftCaretClick = () => {
    const newPage = currentlySelectedPage === 1
      ? currentlySelectedPage
      : currentlySelectedPage - 1;

    setSelectedPage(newPage);
    onChange(newPage);
  }
  
  const handleRightCaretClick = () => {
    const newPage = currentlySelectedPage === numberOfPages
      ? currentlySelectedPage
      : currentlySelectedPage + 1;

    setSelectedPage(newPage);
    onChange(newPage);
  }

  const pageClick = (page: number) => () => {
    if (selectedPage !== page) {
      setSelectedPage(page);
      onChange(page);
    }
  }
  
  const renderPageButtons = () => {
    return [...new Array(numberOfPages)].map((_, index) => {
      const page = index + 1;

      return (
        <Button
          key={page}
          selected={currentlySelectedPage === page}
          onClick={pageClick(page)}
          className="page-button"
        >{page}</Button>
      );
    });
  }

  return (
    <div className={`pagination-container ${theme}`}>
      <i
        className="fa fa-caret-left page-caret"
        aria-hidden="true"
        onClick={handleLeftCaretClick} />
      <div className="pages-container">
        {renderPageButtons()}
      </div>
      <i
        className="fa fa-caret-right page-caret"
        aria-hidden="true"
        onClick={handleRightCaretClick} />
    </div>
  )
}

export default Pagination;