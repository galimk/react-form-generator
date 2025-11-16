import { type ReactNode } from 'react';
import styles from './previewRowWrapper.module.css';

interface Props {
  title: string;
  children: ReactNode;
}

const PreviewRowWrapper = ({ title, children }: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.ribbon}>{title}</div>
    {children}
  </div>
);

export default PreviewRowWrapper;
