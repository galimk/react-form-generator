import TemplateColumn from './TemplateColumn';
import PreviewPanel from '../Preview/PreviewPanel';
import styles from './customFieldsWizard.module.css';

const CustomFieldsWizard = () => (
  <div className={styles.shell}>
    <div className={styles.column}>
      <TemplateColumn />
    </div>
    <div className={styles.column}>
      <PreviewPanel />
    </div>
  </div>
);

export default CustomFieldsWizard;
