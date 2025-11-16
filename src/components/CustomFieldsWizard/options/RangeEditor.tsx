import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { TemplateField } from '../../../models/templates';
import { useTemplateContext } from '../../../context/TemplateContext';
import styles from './rangeEditor.module.css';

interface Props {
  field: TemplateField;
  minError?: string;
  maxError?: string;
}

const RangeEditor = ({ field, minError, maxError }: Props) => {
  const { updateTemplate } = useTemplateContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = value === '' ? undefined : Number(value);
    const key = name as 'minLength' | 'maxLength';
    updateTemplate(field.id, { [key]: numericValue });
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.control}>
        <span>Minimum length</span>
        <input
          type="number"
          name="minLength"
          min={0}
          max={4000}
          value={field.minLength ?? ''}
          onChange={handleChange}
          className={clsx(styles.input, minError && styles.invalid)}
        />
        {minError && <p className={styles.error}>{minError}</p>}
      </label>
      <label className={styles.control}>
        <span>Maximum length</span>
        <input
          type="number"
          name="maxLength"
          min={1}
          max={4000}
          value={field.maxLength ?? ''}
          onChange={handleChange}
          className={clsx(styles.input, maxError && styles.invalid)}
        />
        {maxError && <p className={styles.error}>{maxError}</p>}
      </label>
    </div>
  );
};

export default RangeEditor;
