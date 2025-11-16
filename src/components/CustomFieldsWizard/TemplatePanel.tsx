import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { TemplateField } from '../../models/templates';
import { useTemplateContext } from '../../context/TemplateContext';
import TemplateForm from './TemplateForm';
import styles from './templatePanel.module.css';

interface Props {
  field: TemplateField;
  dragHandleProps?: ComponentPropsWithoutRef<'span'>;
  isDragging: boolean;
}

const TemplatePanel = ({ field, dragHandleProps, isDragging }: Props) => {
  const { editingId, setEditing, removeTemplate } = useTemplateContext();
  const isEditing = editingId === field.id;

  return (
    <div className={clsx(styles.container, isDragging && styles.dragging)}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.subtitle}>Field</span>
          <h3 className={styles.title}>{field.name || 'Untitled field'}</h3>
          <p className={styles.meta}>
            {field.type} {field.required ? '• required' : ''}
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={clsx(styles.iconButton, isEditing && styles.iconButtonActive)}
            onClick={() => setEditing(isEditing ? null : field.id)}
          >
            ✏️
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => removeTemplate(field.id)}
          >
            🗑️
          </button>
          <span className={styles.dragHandle} {...dragHandleProps}>
            ⋮⋮
          </span>
        </div>
      </header>
      {isEditing && <TemplateForm field={field} />}
    </div>
  );
};

export default TemplatePanel;
