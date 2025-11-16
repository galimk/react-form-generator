export type InputType =
  | 'text'
  | 'textarea'
  | 'dropdown'
  | 'checkbox'
  | 'checkboxList';

export interface TemplateField {
  id: string;
  name: string;
  type: InputType;
  placeholder?: string;
  required: boolean;
  options: string[];
  minLength?: number;
  maxLength?: number;
}

export interface TemplateErrorMap {
  name?: string;
  type?: string;
  options?: string;
  minLength?: string;
  maxLength?: string;
  placeholder?: string;
}

export const INPUT_TYPE_METADATA: Record<
  InputType,
  {
    label: string;
    supportsPlaceholder: boolean;
    supportsOptions: boolean;
    supportsRange: boolean;
    defaultValue: unknown;
  }
> = {
  text: {
    label: 'Text Input',
    supportsPlaceholder: true,
    supportsOptions: false,
    supportsRange: true,
    defaultValue: '',
  },
  textarea: {
    label: 'Paragraph',
    supportsPlaceholder: true,
    supportsOptions: false,
    supportsRange: true,
    defaultValue: '',
  },
  dropdown: {
    label: 'Dropdown',
    supportsPlaceholder: true,
    supportsOptions: true,
    supportsRange: false,
    defaultValue: '',
  },
  checkbox: {
    label: 'Checkbox',
    supportsPlaceholder: false,
    supportsOptions: false,
    supportsRange: false,
    defaultValue: false,
  },
  checkboxList: {
    label: 'Checkbox List',
    supportsPlaceholder: false,
    supportsOptions: true,
    supportsRange: false,
    defaultValue: [],
  },
};

let templateCounter = 0;

export const createTemplateField = (overrides: Partial<TemplateField> = {}): TemplateField => {
  templateCounter += 1;
  return {
    id: overrides.id ?? `field-${templateCounter}`,
    name: overrides.name ?? 'Untitled field',
    type: overrides.type ?? 'text',
    placeholder: overrides.placeholder ?? '',
    required: overrides.required ?? false,
    options: overrides.options ?? [],
    minLength: overrides.minLength,
    maxLength: overrides.maxLength,
  };
};

export const getDefaultValue = (field: TemplateField): unknown => {
  const metadata = INPUT_TYPE_METADATA[field.type];
  if (field.type === 'dropdown') {
    return field.options[0] ?? '';
  }
  if (field.type === 'checkboxList') {
    return [];
  }
  return metadata.defaultValue;
};
