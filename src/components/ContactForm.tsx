import { useForm, ValidationError } from '@formspree/react';

import styles from './ContactForm.module.less';

export interface ContactFormLabels {
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  helper: string;
}

interface Props {
  formId: string;
  labels: ContactFormLabels;
}

export default function ContactForm({ formId, labels }: Props) {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <p role="status" className={styles.success}>
        {labels.success}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="contact-name">{labels.name}</label>
      <input
        id="contact-name"
        name="name"
        type="text"
        autoComplete="name"
        required
      />

      <label htmlFor="contact-email">{labels.email}</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <ValidationError
        className={styles.error}
        field="email"
        errors={state.errors}
      />

      <label htmlFor="contact-message">{labels.message}</label>
      <textarea id="contact-message" name="message" rows={5} required />
      <ValidationError
        className={styles.error}
        field="message"
        errors={state.errors}
      />

      {state.errors && (
        <p role="alert" className={styles.error}>
          {labels.error}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" disabled={state.submitting}>
          {state.submitting ? labels.sending : labels.submit}
        </button>
        <p className={styles.helper}>{labels.helper}</p>
      </div>
    </form>
  );
}
