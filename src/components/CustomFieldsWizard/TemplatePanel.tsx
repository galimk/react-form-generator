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
    <article className={clsx('contrast', styles.container, isDragging && styles.dragging)}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <small className={styles.subtitle}>Field</small>
          <h3 className={styles.title}>{field.name || 'Untitled field'}</h3>
          <p className={styles.meta}>
            {field.type} {field.required ? '• required' : ''}
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={clsx('secondary outline', styles.iconButton, isEditing && styles.iconButtonActive)}
            onClick={() => setEditing(isEditing ? null : field.id)}
            aria-label={isEditing ? 'Close field editor' : 'Edit field settings'}
          >
            ✏️
          </button>
          <button
            type="button"
            className={clsx('secondary outline', styles.iconButton)}
            onClick={() => removeTemplate(field.id)}
            aria-label="Remove field"
          >
            🗑️
          </button>
          <span className={styles.dragHandle} {...dragHandleProps} aria-label="Drag to reorder">
            ⋮⋮
          </span>
        </div>
      </header>
      {isEditing && <TemplateForm field={field} />}
    </article>
  );
};

export default TemplatePanel;
