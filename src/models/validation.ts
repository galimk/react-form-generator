import { TemplateErrorMap, TemplateField, getDefaultValue } from './templates';

export interface PreviewErrors {
  [inputId: string]: string | undefined;
}

export interface PreviewValues {
  [inputId: string]: unknown;
}

const MAX_FIELD_LENGTH = 4000;

export const validateTemplateField = (field: TemplateField): TemplateErrorMap => {
  const errors: TemplateErrorMap = {};

  if (!field.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (field.type === 'dropdown' || field.type === 'checkboxList') {
    if (field.options.length === 0) {
      errors.options = 'At least one option is required.';
    }
  }

  if (field.minLength !== undefined) {
    if (field.minLength < 0) {
      errors.minLength = 'Minimum value cannot be negative.';
    }
    if (field.minLength > MAX_FIELD_LENGTH) {
      errors.minLength = `Minimum cannot be above ${MAX_FIELD_LENGTH}.`;
    }
  }

  if (field.maxLength !== undefined) {
    if (field.maxLength > MAX_FIELD_LENGTH) {
      errors.maxLength = `Maximum cannot exceed ${MAX_FIELD_LENGTH}.`;
    }
    if (field.maxLength < 1) {
      errors.maxLength = 'Maximum value must be at least 1.';
    }
  }

  if (
    field.minLength !== undefined &&
    field.maxLength !== undefined &&
    field.minLength >= field.maxLength
  ) {
    errors.maxLength = 'Maximum must be greater than minimum.';
  }

  return errors;
};

export const getPreviewModelValues = (templates: TemplateField[]): PreviewValues => {
  const values: PreviewValues = {};
  templates.forEach((field) => {
    values[field.id] = getDefaultValue(field);
  });
  return values;
};

export const validatePreviewField = (
  field: TemplateField,
  value: unknown,
): string | undefined => {
  if (field.required) {
    if (field.type === 'checkbox') {
      if (!value) {
        return `${field.name} is required.`;
      }
    } else if (field.type === 'checkboxList') {
      if (!Array.isArray(value) || value.length === 0) {
        return `Select at least one option for ${field.name}.`;
      }
    } else if (value === undefined || value === null || value === '') {
      return `${field.name} is required.`;
    }
  }

  if (typeof value === 'string' && field.type !== 'checkbox') {
    if (field.minLength !== undefined && value.length < field.minLength) {
      return `${field.name} must be at least ${field.minLength} characters.`;
    }
    if (field.maxLength !== undefined && value.length > field.maxLength) {
      return `${field.name} must be fewer than ${field.maxLength} characters.`;
    }
  }

  return undefined;
};

export const validatePreviewValues = (
  templates: TemplateField[],
  values: PreviewValues,
): PreviewErrors => {
  const errors: PreviewErrors = {};
  templates.forEach((field) => {
    errors[field.id] = validatePreviewField(field, values[field.id]);
  });
  return errors;
};
