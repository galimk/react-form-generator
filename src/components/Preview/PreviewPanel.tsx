import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTemplateContext } from '../../context/TemplateContext';
import { TemplateField, getDefaultValue } from '../../models/templates';
import {
  PreviewErrors,
  PreviewValues,
  getPreviewModelValues,
  validatePreviewField,
  validatePreviewValues,
} from '../../models/validation';
import PreviewField from './PreviewField';
import PreviewRowWrapper from './PreviewRowWrapper';
import styles from './previewPanel.module.css';

const PreviewPanel = () => {
  const { templates } = useTemplateContext();
  const [values, setValues] = useState<PreviewValues>(() => getPreviewModelValues(templates));
  const [errors, setErrors] = useState<PreviewErrors>({});
  const [layoutEditable, setLayoutEditable] = useState(false);

  useEffect(() => {
    setValues((previous) => {
      const next: PreviewValues = {};
      templates.forEach((template) => {
        if (previous[template.id] === undefined) {
          next[template.id] = getDefaultValue(template);
        } else {
          next[template.id] = previous[template.id];
        }
      });
      return next;
    });

    setErrors((prevErrors) => {
      const nextErrors: PreviewErrors = {};
      templates.forEach((template) => {
        nextErrors[template.id] = prevErrors[template.id];
      });
      return nextErrors;
    });
  }, [templates]);

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  const handleValueChange = (field: TemplateField, nextValue: unknown) => {
    setValues((prev) => ({ ...prev, [field.id]: nextValue }));
    setErrors((prev) => ({ ...prev, [field.id]: validatePreviewField(field, nextValue) }));
  };

  const handleValidate = () => {
    setErrors(validatePreviewValues(templates, values));
  };

  const handleClear = () => {
    setErrors({});
    setValues(getPreviewModelValues(templates));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Preview</p>
          <h2 className={styles.title}>Live form</h2>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={clsx(styles.iconButton, layoutEditable && styles.iconButtonActive)}
            onClick={() => setLayoutEditable((value) => !value)}
          >
            🧱 Layout
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleClear}>
            Clear
          </button>
          <button type="button" className={styles.primaryButton} onClick={handleValidate}>
            Validate
          </button>
        </div>
      </div>

      <form className={styles.previewForm}>
        {templates.map((field, index) => {
          const content = (
            <PreviewField
              key={field.id}
              field={field}
              value={values[field.id]}
              error={errors[field.id]}
              onChange={(nextValue) => handleValueChange(field, nextValue)}
            />
          );

          if (!layoutEditable) {
            return content;
          }

          return (
            <PreviewRowWrapper title={`Row ${index + 1}`} key={field.id}>
              {content}
            </PreviewRowWrapper>
          );
        })}
      </form>

      {hasErrors && <p className={styles.errorSummary}>Please resolve the highlighted errors above.</p>}
    </div>
  );
};

export default PreviewPanel;
