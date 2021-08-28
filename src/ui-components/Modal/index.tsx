import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './interface';
import './style.css';

class Modal extends React.Component<ModalProps> {
  root: HTMLDivElement;
  el: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);

    this.root = document.querySelector('#root') as HTMLDivElement;
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  removeOnClickPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  }

  render() {
    const { show = true, modalBodyClassName, children } = this.props;

    return show ? ReactDOM.createPortal(
      <div onClick={this.removeOnClickPropagation} className="modal-container">
        <div className="modal-overlay" />
        <div className={`modal-body ${modalBodyClassName || ''}`}>
          {children}
        </div>
      </div>,
      this.el,
    ) : null;
  }
}

export default Modal;