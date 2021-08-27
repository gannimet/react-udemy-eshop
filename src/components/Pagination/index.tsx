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

  currentlySelectedPage = () => {
    const { overrideSelectedPage } = this.props;
    const { selectedPage } = this.state;

    return overrideSelectedPage || selectedPage;
  }
  
  handleLeftCaretClick = () => {
    const { onChange } = this.props;

    const currentlySelectedPage = this.currentlySelectedPage();
    const newPage = currentlySelectedPage === 1
      ? currentlySelectedPage
      : currentlySelectedPage - 1;

    this.setState({
      selectedPage: newPage,
    });
    onChange(newPage);
  }
  
  handleRightCaretClick = () => {
    const { numberOfPages, onChange,  } = this.props;

    const currentlySelectedPage = this.currentlySelectedPage();
    const newPage = currentlySelectedPage === numberOfPages
      ? currentlySelectedPage
      : currentlySelectedPage + 1;

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
    const { numberOfPages,  } = this.props;

    const currentlySelectedPage = this.currentlySelectedPage();

    return [...new Array(numberOfPages)].map((_, index) => {
      const page = index + 1;

      return (
        <Button
          key={page}
          selected={currentlySelectedPage === page}
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