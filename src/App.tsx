import { TemplateProvider } from './context/TemplateContext';
import CustomFieldsWizard from './components/CustomFieldsWizard/CustomFieldsWizard';
import { initialTemplates } from './models/sampleData';

function App() {
  return (
    <TemplateProvider initialTemplates={initialTemplates}>
      <CustomFieldsWizard />
    </TemplateProvider>
  );
}

export default App;
