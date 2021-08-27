export interface PaginationProps {
  numberOfPages: number;
  onChange(selectedPage: number): void;
}

export interface PaginationState {
  selectedPage: number;
}