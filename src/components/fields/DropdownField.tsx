import clsx from 'clsx';
import { TemplateField } from '../../models/templates';
import styles from '../Preview/previewField.module.css';

interface Props {
  field: TemplateField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const DropdownField = ({ field, value, onChange, error }: Props) => (
  <label className={styles.field}>
    <span className={styles.label}>
      {field.name}
      {field.required && <span className={styles.required}>*</span>}
    </span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={clsx(error && styles.invalid)}
    >
      <option value="" disabled>
        {field.placeholder || 'Select an option'}
      </option>
      {field.options.map((option: string) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className={styles.error}>{error}</p>}
  </label>
);

export default DropdownField;
