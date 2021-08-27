import React from 'react';
import Button from '../../ui-components/Button';
import { PaginationProps, PaginationState } from './interface';
import './style.css';

class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      selectedPage: 1,
    }
  }
  
  handleLeftCaretClick = () => {
    const { onChange } = this.props;
    const { selectedPage } = this.state;
    const newPage = selectedPage === 1 ? selectedPage : selectedPage - 1;

    this.setState({
      selectedPage: newPage,
    });
    onChange(newPage);
  }
  
  handleRightCaretClick = () => {
    const { numberOfPages, onChange } = this.props;
    const { selectedPage } = this.state;
    const newPage = selectedPage === numberOfPages ? selectedPage : selectedPage + 1;

    this.setState({
      selectedPage: newPage,
    });
    onChange(newPage);
  }

  pageClick = (page: number) => () => {
    const { selectedPage} = this.state;

    if (selectedPage !== page) {
      this.setState({
        selectedPage: page,
      });
      this.props.onChange(page);
    }
  }
  
  renderPageButtons = () => {
    const { numberOfPages } = this.props;
    const { selectedPage } = this.state;

    return [...new Array(numberOfPages)].map((_, index) => {
      const page = index + 1;

      return (
        <Button
          key={page}
          selected={selectedPage === page}
          onClick={this.pageClick(page)}
          className="page-button"
        >{page}</Button>
      );
    });
  }

  render() {
    return (
      <div className="pagination-container">
        <i
          className="fa fa-caret-left page-caret"
          aria-hidden="true"
          onClick={this.handleLeftCaretClick} />
        <div className="pages-container">
          {this.renderPageButtons()}
        </div>
        <i
          className="fa fa-caret-right page-caret"
          aria-hidden="true"
          onClick={this.handleRightCaretClick} />
      </div>
    )
  }
}

export default Pagination;