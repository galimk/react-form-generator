import clsx from 'clsx';
import { TemplateField } from '../../models/templates';
import styles from '../Preview/previewField.module.css';

interface Props {
  field: TemplateField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const TextareaField = ({ field, value, onChange, error }: Props) => (
  <label className={styles.field}>
    <span className={styles.label}>
      {field.name}
      {field.required && <span className={styles.required}>*</span>}
    </span>
    <textarea
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={clsx(error && styles.invalid)}
    />
    {error && <p className={styles.error}>{error}</p>}
  </label>
);

export default TextareaField;
