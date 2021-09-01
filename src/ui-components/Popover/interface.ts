import React from 'react';

export interface PopoverProps {
  content: React.ReactNode;
  position: 'bottomleft' | 'bottomright';
  popoverBodyClassName?: string;
}

export interface PopoverChildPosition {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface PopoverState {
  show: boolean;
  childPosition: PopoverChildPosition;
  contentWidth: number;
}