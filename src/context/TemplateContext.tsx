import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { TemplateField, createTemplateField } from '../models/templates';

type Action =
  | { type: 'initialize'; payload: TemplateField[] }
  | { type: 'add' }
  | { type: 'update'; payload: { id: string; patch: Partial<TemplateField> } }
  | { type: 'remove'; payload: { id: string } }
  | { type: 'reorder'; payload: { sourceIndex: number; destinationIndex: number } }
  | { type: 'setEditing'; payload: { id: string | null } };

interface TemplateState {
  templates: TemplateField[];
  editingId: string | null;
}

const initialState: TemplateState = {
  templates: [],
  editingId: null,
};

const templateReducer = (state: TemplateState, action: Action): TemplateState => {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        templates: action.payload,
        editingId: action.payload[0]?.id ?? null,
      };
    case 'add': {
      const next = [...state.templates, createTemplateField()];
      return {
        templates: next,
        editingId: next[next.length - 1]?.id ?? null,
      };
    }
    case 'update': {
      const templates = state.templates.map((field) =>
        field.id === action.payload.id ? { ...field, ...action.payload.patch } : field,
      );
      return { ...state, templates };
    }
    case 'remove': {
      const templates = state.templates.filter((field) => field.id !== action.payload.id);
      const editingId = state.editingId === action.payload.id ? templates[0]?.id ?? null : state.editingId;
      return { templates, editingId };
    }
    case 'reorder': {
      const { sourceIndex, destinationIndex } = action.payload;
      const templates = [...state.templates];
      const [moved] = templates.splice(sourceIndex, 1);
      templates.splice(destinationIndex, 0, moved);
      return { ...state, templates };
    }
    case 'setEditing':
      return { ...state, editingId: action.payload.id };
    default:
      return state;
  }
};

interface TemplateContextValue extends TemplateState {
  addTemplate: () => void;
  updateTemplate: (id: string, patch: Partial<TemplateField>) => void;
  removeTemplate: (id: string) => void;
  reorderTemplates: (sourceIndex: number, destinationIndex: number) => void;
  setEditing: (id: string | null) => void;
}

const TemplateContext = createContext<TemplateContextValue | undefined>(undefined);

interface TemplateProviderProps {
  initialTemplates: TemplateField[];
  children: ReactNode;
}

export const TemplateProvider = ({ initialTemplates, children }: TemplateProviderProps) => {
  const [state, dispatch] = useReducer(templateReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'initialize', payload: initialTemplates });
  }, [initialTemplates]);

  const value = useMemo<TemplateContextValue>(
    () => ({
      ...state,
      addTemplate: () => dispatch({ type: 'add' }),
      updateTemplate: (id, patch) => dispatch({ type: 'update', payload: { id, patch } }),
      removeTemplate: (id) => dispatch({ type: 'remove', payload: { id } }),
      reorderTemplates: (sourceIndex, destinationIndex) =>
        dispatch({ type: 'reorder', payload: { sourceIndex, destinationIndex } }),
      setEditing: (id) => dispatch({ type: 'setEditing', payload: { id } }),
    }),
    [state],
  );

  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
};

export const useTemplateContext = () => {
  const ctx = useContext(TemplateContext);
  if (!ctx) {
    throw new Error('useTemplateContext must be used within TemplateProvider');
  }
  return ctx;
};
