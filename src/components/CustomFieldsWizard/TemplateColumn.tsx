import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useTemplateContext } from '../../context/TemplateContext';
import type { TemplateField } from '../../models/templates';
import TemplatePanel from './TemplatePanel';
import styles from './templateColumn.module.css';

interface SortableTemplatePanelProps {
  field: TemplateField;
}

const SortableTemplatePanel = ({ field }: SortableTemplatePanelProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const combinedRef = useCallback(
    (element: HTMLDivElement | null) => {
      setNodeRef(element);
      setNode(element);
    },
    [setNodeRef],
  );

  useLayoutEffect(() => {
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: isDragging && dimensions.width ? `${dimensions.width}px` : undefined,
    height: isDragging && dimensions.height ? `${dimensions.height}px` : undefined,
  };

  return (
    <div ref={combinedRef} className={clsx(styles.panel, isDragging && styles.dragging)} style={style}>
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
        </div>
        <button type="button" className={styles.addButton} onClick={addTemplate}>
          + Add field
        </button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={templates.map((template) => template.id)} strategy={verticalListSortingStrategy}>
          <div className={styles.list}>
            {templates.map((template) => (
              <SortableTemplatePanel field={template} key={template.id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TemplateColumn;
