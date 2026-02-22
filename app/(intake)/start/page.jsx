import ProjectInquiryForm from "@/components/ProjectInquiryForm/ProjectInquiryForm";

import styles from './page.module.css';

export default function IntakePage() {
  return (
    <main className={`${styles['wrapper-container']}`}>
      <ProjectInquiryForm />
    </main>
  )
}