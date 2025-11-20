import { FormEvent, useMemo, useState } from 'react';
import { TemplateField } from '../../../models/templates';
import { useTemplateContext } from '../../../context/TemplateContext';
import styles from './optionsEditor.module.css';

interface Props {
  field: TemplateField;
  error?: string;
}

const OptionsEditor = ({ field, error }: Props) => {
  const { updateTemplate } = useTemplateContext();
  const [draft, setDraft] = useState('');

  const isDraftValid = useMemo(() => draft.trim().length > 0 && draft.length <= 255, [draft]);

  const addOption = (event: FormEvent) => {
    event.preventDefault();
    if (!isDraftValid) {
      return;
    }
    if (field.options.includes(draft.trim())) {
      return;
    }
    updateTemplate(field.id, { options: [...field.options, draft.trim()] });
    setDraft('');
  };

  const removeOption = (index: number) => {
    const next = field.options.filter((_, optionIndex) => optionIndex !== index);
    updateTemplate(field.id, { options: next });
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Options</label>
      <form className={styles.form} onSubmit={addOption}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Enter option text"
        />
        <button type="submit" className="secondary" disabled={!isDraftValid}>
          Add
        </button>
      </form>
      {!isDraftValid && draft.length > 0 && (
        <p className={styles.helper}>Option text must be between 1 and 255 characters.</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.list}>
        {field.options.map((option, index) => (
          <li key={option}>
            <span>{option}</span>
            <button type="button" className="secondary outline" onClick={() => removeOption(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsEditor;
