import { TemplateField } from '../../models/templates';
import CheckboxField from '../fields/CheckboxField';
import CheckboxListField from '../fields/CheckboxListField';
import DropdownField from '../fields/DropdownField';
import TextField from '../fields/TextField';
import TextareaField from '../fields/TextareaField';

interface Props {
  field: TemplateField;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
}

const PreviewField = ({ field, value, error, onChange }: Props) => {
  if (field.type === 'checkbox') {
    return (
      <CheckboxField
        field={field}
        checked={Boolean(value)}
        onChange={(checked) => onChange(checked)}
      />
    );
  }

  if (field.type === 'checkboxList') {
    const selectedValues = Array.isArray(value) ? (value as string[]) : [];
    return (
      <CheckboxListField
        field={field}
        selectedValues={selectedValues}
        onChange={(nextValues) => onChange(nextValues)}
        error={error}
      />
    );
  }

  if (field.type === 'textarea') {
    return (
      <TextareaField
        field={field}
        value={String(value ?? '')}
        onChange={(nextValue) => onChange(nextValue)}
        error={error}
      />
    );
  }

  if (field.type === 'dropdown') {
    return (
      <DropdownField
        field={field}
        value={String(value ?? '')}
        onChange={(nextValue) => onChange(nextValue)}
        error={error}
      />
    );
  }

  return (
    <TextField
      field={field}
      value={String(value ?? '')}
      onChange={(nextValue) => onChange(nextValue)}
      error={error}
    />
  );
};

export default PreviewField;
