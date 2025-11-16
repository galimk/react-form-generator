import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { useCallback } from 'react';
import { useTemplateContext } from '../../context/TemplateContext';
import TemplatePanel from './TemplatePanel';
import styles from './templateColumn.module.css';

const TemplateColumn = () => {
  const { templates, addTemplate, reorderTemplates } = useTemplateContext();

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      if (result.destination.index === result.source.index) {
        return;
      }
      reorderTemplates(result.source.index, result.destination.index);
    },
    [reorderTemplates],
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="templates">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={styles.list}>
              {templates.map((template, index) => (
                <Draggable draggableId={template.id} index={index} key={template.id}>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={styles.panel}
                      style={dragProvided.draggableProps.style}
                    >
                      <TemplatePanel
                        field={template}
                        dragHandleProps={dragProvided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TemplateColumn;
