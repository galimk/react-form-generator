import { TemplateField } from '../../models/templates';
import styles from '../Preview/previewField.module.css';

interface Props {
  field: TemplateField;
  selectedValues: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const CheckboxListField = ({ field, selectedValues, onChange, error }: Props) => (
  <div className={styles.field}>
    <span className={styles.label}>
      {field.name}
      {field.required && <span className={styles.required}>*</span>}
    </span>
    <div className={styles.checkboxList}>
      {field.options.map((option: string) => {
        const checked = selectedValues.includes(option);
        return (
          <label key={option}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(event) => {
                const isChecked = event.target.checked;
                if (isChecked) {
                  onChange([...selectedValues, option]);
                } else {
                  onChange(selectedValues.filter((item) => item !== option));
                }
              }}
            />
            {option}
          </label>
        );
      })}
    </div>
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

export default CheckboxListField;
