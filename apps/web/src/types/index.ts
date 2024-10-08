/**
 * Types des champs de formulaire.
 */
export enum FormFieldsType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
  SELECT = "select",
}

export type userType = {
  id: string;
  username: string;
  email: string;
  instrument: string | null;
} | null | undefined
