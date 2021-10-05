import React from 'react';

export interface PopoverProps {
  content: React.ReactNode;
  position: 'bottomleft' | 'bottomright';
  popoverBodyClassName?: string;
  controlShow?: boolean;
  onClick?(): void;
}

export interface PopoverChildPosition {
  top: number;
  left: number;
  bottom: number;
  right: number;
}