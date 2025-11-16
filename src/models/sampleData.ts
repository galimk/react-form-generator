import { TemplateField } from './templates';

export const initialTemplates: TemplateField[] = [
  {
    id: 'name',
    name: 'Full Name',
    type: 'text',
    placeholder: 'Jane Doe',
    required: true,
    options: [],
    minLength: 2,
    maxLength: 120,
  },
  {
    id: 'bio',
    name: 'Short Bio',
    type: 'textarea',
    placeholder: 'Tell us more...',
    required: false,
    options: [],
    minLength: 0,
    maxLength: 4000,
  },
  {
    id: 'role',
    name: 'Role',
    type: 'dropdown',
    placeholder: 'Select role',
    required: true,
    options: ['Designer', 'Engineer', 'Product'],
  },
  {
    id: 'newsletter',
    name: 'Join newsletter',
    type: 'checkbox',
    required: false,
    options: [],
  },
  {
    id: 'interests',
    name: 'Interests',
    type: 'checkboxList',
    required: true,
    options: ['Accessibility', 'UI Kits', 'Animations'],
  },
];
