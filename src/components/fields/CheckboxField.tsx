import clsx from 'clsx';
import { TemplateField } from '../../models/templates';
import styles from '../Preview/previewField.module.css';

interface Props {
  field: TemplateField;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CheckboxField = ({ field, checked, onChange }: Props) => (
  <label className={clsx(styles.field, styles.checkbox)}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <span>
      {field.name}
      {field.required && <span className={styles.required}>*</span>}
    </span>
  </label>
);

export default CheckboxField;
