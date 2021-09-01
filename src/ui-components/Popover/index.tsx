import React from 'react';
import ReactDOM from 'react-dom';
import { PopoverProps, PopoverState } from './interface';
import './style.css';

class Popover extends React.Component<PopoverProps, PopoverState> {
  root: HTMLDivElement;
  el: HTMLDivElement;
  childRef: React.RefObject<HTMLElement>;
  popperRef: React.RefObject<HTMLDivElement>;

  constructor(props: PopoverProps) {
    super(props);

    this.root = document.querySelector('#root') as HTMLDivElement;
    this.el = document.createElement('div');
    this.childRef = React.createRef();
    this.popperRef = React.createRef();

    this.state = {
      show: false,
      childPosition: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      contentWidth: 0,
    };
  }

  componentDidMount() {
    this.root.appendChild(this.el);

    setTimeout(() => {
      const childElement = this.childRef.current
  
      if (childElement) {
        const { top, left, right, bottom } =  childElement.getBoundingClientRect();
        
        this.setState({
          childPosition: {
            top, left, right, bottom,
          }
        })
      }
    }, 500);
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  componentDidUpdate(prevProps: PopoverProps, prevState: PopoverState) {
    const { contentWidth } = this.state;
    const popperWidth = this.popperRef.current
      ? this.popperRef.current.getBoundingClientRect().width
      : 0;

    if ((contentWidth === 0 || popperWidth !== contentWidth) && this.getShowValue()) {
      this.setState({
        contentWidth: popperWidth,
      })
    }
  }

  getShowValue = () => {
    const { controlShow } = this.props;
    const { show } = this.state;

    return controlShow === undefined ? show : controlShow;
  }

  handleContentClick = () => {
    const { controlShow, onClick } = this.props;

    controlShow === undefined && this.setState({
      show: !this.state.show,
    });

    onClick && onClick();
  };

  private renderChildElement() {
    return React.cloneElement(this.props.children as React.ReactElement, {
      ref: this.childRef,
      onClick: this.handleContentClick,
    });
  }

  private renderPopover() {
    const { content, position, popoverBodyClassName } = this.props;
    const { childPosition, contentWidth } = this.state;
    let style: React.CSSProperties;

    switch (position) {
      case 'bottomleft':
        style = {
          top: childPosition.bottom,
          left: childPosition.right - contentWidth,
        };
        break;
      case 'bottomright':
        style = {
          top: childPosition.bottom,
          left: childPosition.left,
        };
        break;
    }

    return this.getShowValue() ? ReactDOM.createPortal(
      <div
        className="popover-content-container"
        ref={this.popperRef}
        style={style}
      >
        <div className={`popover-body ${popoverBodyClassName || ''}`}>
          {content}
        </div>
      </div>,
      this.el,
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChildElement()}
        {this.renderPopover()}
      </React.Fragment>
    );
  }
}

export default Popover;