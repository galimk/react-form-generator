import { ChangeEvent } from 'react';
import clsx from 'clsx';
import { TemplateField } from '../../models/templates';
import styles from './previewField.module.css';

interface Props {
  field: TemplateField;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
}

const PreviewField = ({ field, value, error, onChange }: Props) => {
  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    onChange(event.target.value);
  };

  if (field.type === 'checkbox') {
    return (
      <label className={clsx(styles.field, styles.checkbox)}>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>
          {field.name}
          {field.required && <span className={styles.required}>*</span>}
        </span>
      </label>
    );
  }

  if (field.type === 'checkboxList') {
    const selectedValues = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className={styles.field}>
        <span className={styles.label}>
          {field.name}
          {field.required && <span className={styles.required}>*</span>}
        </span>
        <div className={styles.checkboxList}>
          {field.options.map((option) => {
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
  }

  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {field.name}
        {field.required && <span className={styles.required}>*</span>}
      </span>
      {field.type === 'textarea' ? (
        <textarea
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={handleTextChange}
          className={clsx(error && styles.invalid)}
        />
      ) : field.type === 'dropdown' ? (
        <select
          value={String(value ?? '')}
          onChange={handleTextChange}
          className={clsx(error && styles.invalid)}
        >
          <option value="" disabled>
            {field.placeholder || 'Select an option'}
          </option>
          {field.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={handleTextChange}
          className={clsx(error && styles.invalid)}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
};

export default PreviewField;
