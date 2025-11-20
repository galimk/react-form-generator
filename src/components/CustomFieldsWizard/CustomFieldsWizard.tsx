import clsx from 'clsx';
import TemplateColumn from './TemplateColumn';
import PreviewPanel from '../Preview/PreviewPanel';
import styles from './customFieldsWizard.module.css';

const CustomFieldsWizard = () => (
  <main className={clsx('container', styles.shell)}>
    <section className={clsx('contrast', styles.column)}>
      <TemplateColumn />
    </section>
    <section className={clsx('contrast', styles.column)}>
      <PreviewPanel />
    </section>
  </main>
);

export default CustomFieldsWizard;
