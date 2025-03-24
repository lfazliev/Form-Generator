export interface FormFieldOption {
  value: string | number | boolean
  label: string
}

export type FormFieldType = 'input' | 'select' | 'checkbox' | 'textarea'

export type FormFieldValueType<T extends FormFieldType> = T extends 'checkbox'
  ? boolean
  : T extends 'input' | 'select' | 'textarea'
  ? string | number
  : never

export interface FormField {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  options?: FormFieldOption[]
  required?: boolean
  disabled?: boolean
  attributes?: Record<string, any>
}

export interface FormConfig {
  fields: FormField[]
  submitButtonText?: string
  cancelButtonText?: string
}

export interface FormValues {
  [key: string]: any
}
