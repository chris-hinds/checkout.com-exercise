import {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  MouseEventHandler,
} from "react";

export type NavItemProps = {
  label: string;
  path: string;
};

export type InputFieldType = {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: ErrorObjectType;
};

export type TextAreaType = {
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  error?: ErrorObjectType;
};

export type SelectFieldOption = {
  value: number;
  label: string;
};

export type SelectFieldType = {
  name: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  options: SelectFieldOption[];
};

export type FeedbackResponseType = {
  name: string;
  email: string;
  rating: number | string;
  comment: string;
};

export type ButtonType = {
  type?: "submit" | "reset" | "button";
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export type GetFeedbackResultsType = {
  ts: string;
  data: FeedbackResponseType;
  id: string;
};

export type RatingsSpreadType = {
  labels: string[];
  data: number[];
};

export type ErrorObjectType = {
  [key: string]: string;
  field: string;
  message: string;
};
