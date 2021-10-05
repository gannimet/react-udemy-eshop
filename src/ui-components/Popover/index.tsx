import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLayoutEffectOnUpdate } from '../../hooks/useLayoutEffectOnUpdate';
import { PopoverChildPosition, PopoverProps } from './interface';
import './style.css';

const Popover: React.FC<PopoverProps> = ({
  controlShow, content, position, popoverBodyClassName, onClick, children
}) => {
  const root = useRef(document.querySelector('#root') as HTMLDivElement);
  const el = useRef(document.createElement('div'));
  const childRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [childPosition, setChildPosition] = useState<PopoverChildPosition>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  const getShowValue = () => {
    return controlShow === undefined ? show : controlShow;
  }

  useEffect(() => {
    root.current.appendChild(el.current);

    setTimeout(() => {
      const childElement = childRef.current
  
      if (childElement) {
        const { top, left, right, bottom } = childElement.getBoundingClientRect();
        
        setChildPosition({ top, left, right, bottom });
      }
    }, 500);

    return function cleanup() {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      root.current.removeChild(el.current);
    };
  }, []);

  useLayoutEffectOnUpdate(() => {
    const popperWidth = popperRef.current
      ? popperRef.current.getBoundingClientRect().width
      : 0;

    if ((contentWidth === 0 || popperWidth !== contentWidth) && getShowValue()) {
      setContentWidth(popperWidth);
    }
  });

  const handleContentClick = () => {
    controlShow === undefined && setShow(!show);

    onClick && onClick();
  };

  const renderChildElement = () => {
    return React.cloneElement(children as React.ReactElement, {
      ref: childRef,
      onClick: handleContentClick,
    });
  }

  const renderPopover = () => {
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

    return getShowValue() ? ReactDOM.createPortal(
      <div
        className="popover-content-container"
        ref={popperRef}
        style={style}
      >
        <div className={`popover-body ${popoverBodyClassName || ''}`}>
          {content}
        </div>
      </div>,
      el.current,
    ) : null;
  }

  return (
    <React.Fragment>
      {renderChildElement()}
      {renderPopover()}
    </React.Fragment>
  );
}

export default Popover;