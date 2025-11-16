import { ChangeEvent, useMemo } from 'react';
import { useTemplateContext } from '../../context/TemplateContext';
import { INPUT_TYPE_METADATA, TemplateField } from '../../models/templates';
import { validateTemplateField } from '../../models/validation';
import OptionsEditor from './options/OptionsEditor';
import RangeEditor from './options/RangeEditor';
import styles from './templateForm.module.css';

interface Props {
  field: TemplateField;
}

const TemplateForm = ({ field }: Props) => {
  const { updateTemplate } = useTemplateContext();
  const errors = useMemo(() => validateTemplateField(field), [field]);
  const metadata = INPUT_TYPE_METADATA[field.type];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;
    const key = name as keyof TemplateField;
    updateTemplate(field.id, { [key]: nextValue });
  };

  return (
    <form className={styles.form}>
      <label className={styles.field}>
        <span>Label</span>
        <input
          type="text"
          name="name"
          value={field.name}
          onChange={handleChange}
          className={errors.name ? styles.invalid : undefined}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>

      <label className={styles.field}>
        <span>Input type</span>
        <select name="type" value={field.type} onChange={handleChange}>
          {Object.entries(INPUT_TYPE_METADATA).map(([value, meta]) => (
            <option value={value} key={value}>
              {meta.label}
            </option>
          ))}
        </select>
      </label>

      {metadata.supportsPlaceholder && (
        <label className={styles.field}>
          <span>Placeholder</span>
          <input
            type="text"
            name="placeholder"
            value={field.placeholder}
            onChange={handleChange}
          />
        </label>
      )}

      <label className={styles.checkboxField}>
        <input
          type="checkbox"
          name="required"
          checked={field.required}
          onChange={handleChange}
        />
        Required field
      </label>

      {metadata.supportsOptions && <OptionsEditor field={field} error={errors.options} />}

      {metadata.supportsRange && (
        <RangeEditor
          field={field}
          minError={errors.minLength}
          maxError={errors.maxLength}
        />
      )}
    </form>
  );
};

export default TemplateForm;
