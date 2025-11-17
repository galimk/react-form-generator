import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useTemplateContext } from '../../context/TemplateContext';
import type { TemplateField } from '../../models/templates';
import TemplatePanel from './TemplatePanel';
import styles from './templateColumn.module.css';

interface SortableTemplatePanelProps {
  field: TemplateField;
}

const SortableTemplatePanel = ({ field }: SortableTemplatePanelProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

  const style = {
    transform: isDragging ? undefined : CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} className={clsx(styles.panel, isDragging && styles.dragging)} style={style}>
      <TemplatePanel
        field={field}
        dragHandleProps={{ ...(attributes ?? {}), ...(listeners ?? {}) }}
        isDragging={isDragging}
      />
    </div>
  );
};

const TemplateColumn = () => {
  const { templates, addTemplate, reorderTemplates } = useTemplateContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeField = templates.find((template) => template.id === activeId);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        return;
      }
      const sourceIndex = templates.findIndex((template) => template.id === active.id);
      const destinationIndex = templates.findIndex((template) => template.id === over.id);
      if (sourceIndex === -1 || destinationIndex === -1) {
        return;
      }
      reorderTemplates(sourceIndex, destinationIndex);
    },
    [reorderTemplates, templates],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Builder</p>
          <h2 className={styles.title}>Custom fields</h2>
          <p className={styles.helper}>Drag, reorder, and edit the fields that power your form.</p>
        </div>
        <button type="button" className="secondary" onClick={addTemplate}>
          + Add field
        </button>
      </div>
      <DndContext
        onDragStart={({ active }) => setActiveId(String(active.id))}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={templates.map((template) => template.id)} strategy={verticalListSortingStrategy}>
          <div className={styles.list}>
            {templates.map((template) => (
              <SortableTemplatePanel field={template} key={template.id} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeField ? <TemplatePanel field={activeField} isDragging dragHandleProps={undefined} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TemplateColumn;
