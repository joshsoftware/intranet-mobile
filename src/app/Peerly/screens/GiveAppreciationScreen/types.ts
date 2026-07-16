export type APIError = {
  message: string;
  status: number;
};

export type FormInput = {
  receiver: string;
  core_value_id: string;
  description: string;
};

export type KeyValueType = string | number;

export type DropDownKeyValue = {
  label: KeyValueType;
  value: KeyValueType;
};
