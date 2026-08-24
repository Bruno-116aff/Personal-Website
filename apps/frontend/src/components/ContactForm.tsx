import { useEffect, useRef, useState, type FormEventHandler } from 'react';

import {
  createContactSubmissionLock,
  ContactRequestError,
  getContactApiUrl,
  submitContactRequest,
  toContactSubmission,
  validateContactSubmission,
  type ContactValidationErrors,
} from '../lib/contact-form';
import { Button } from './primitives';

export type ContactFormStatus =
  'idle' | 'invalid' | 'submitting' | 'success' | 'error' | 'rate-limited';

const statusMessages: Record<ContactFormStatus, string> = {
  idle: 'Send a short note about the role, system or problem you want to discuss.',
  invalid: 'Please correct the highlighted fields and try again.',
  submitting: 'Sending your message…',
  success: 'Message sent. I’ll get back to you as soon as I can.',
  error: 'The message could not be sent. Please try again or contact me by email.',
  'rate-limited': 'Too many attempts. Please wait a moment, then try again or email Ivan directly.',
};

export default function ContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const submissionLock = useRef(createContactSubmissionLock());
  const focusInvalidField = useRef(false);
  const apiUrl = getContactApiUrl(import.meta.env?.VITE_CONTACT_API_URL);
  const isSubmitting = status === 'submitting';
  const isFormUnavailable = !apiUrl;
  const statusMessage =
    status === 'idle' && isFormUnavailable
      ? 'The contact form is unavailable in this environment. Please email Ivan directly.'
      : statusMessages[status];

  useEffect(() => {
    if (status !== 'invalid' || !focusInvalidField.current) return;

    const firstInvalidField = (['name', 'email', 'message'] as const).find(
      (field) => errors[field],
    );
    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
    }
    focusInvalidField.current = false;
  }, [errors, status]);

  const clearFieldError: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const fieldName = event.currentTarget.name as keyof ContactValidationErrors;

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (isSubmitting || isFormUnavailable) return;

    const form = event.currentTarget;
    const payload = toContactSubmission(new FormData(form));
    const validationErrors = validateContactSubmission(payload);

    if (Object.keys(validationErrors).length > 0) {
      focusInvalidField.current = true;
      setErrors(validationErrors);
      setStatus('invalid');
      return;
    }

    if (!apiUrl) {
      setStatus('error');
      return;
    }

    if (!submissionLock.current.acquire()) return;

    setErrors({});
    setStatus('submitting');

    try {
      await submitContactRequest(apiUrl, payload);
      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus(
        error instanceof ContactRequestError && error.code === 'rate-limited'
          ? 'rate-limited'
          : 'error',
      );
    } finally {
      submissionLock.current.release();
    }
  };

  const describedBy = (field: keyof ContactValidationErrors) =>
    errors[field] ? `contact-${field}-error` : undefined;

  return (
    <form
      className="contact-form"
      data-status={status}
      onSubmit={handleSubmit}
      aria-describedby={
        isFormUnavailable ? 'contact-form-status contact-form-config-note' : 'contact-form-status'
      }
      aria-busy={isSubmitting}
      noValidate
    >
      <div className="form-fields">
        <div className={`form-field${errors.name ? ' form-field--invalid' : ''}`}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            onInput={clearFieldError}
          />
          {errors.name && (
            <p id="contact-name-error" className="form-field__error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`form-field${errors.email ? ' form-field--invalid' : ''}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            onInput={clearFieldError}
          />
          {errors.email && (
            <p id="contact-email-error" className="form-field__error">
              {errors.email}
            </p>
          )}
        </div>

        <div className={`form-field${errors.message ? ' form-field--invalid' : ''}`}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            maxLength={5_000}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            onInput={clearFieldError}
          />
          {errors.message && (
            <p id="contact-message-error" className="form-field__error">
              {errors.message}
            </p>
          )}
        </div>

        <div className="contact-form__honeypot" aria-hidden="true" inert="">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {isFormUnavailable && (
        <p id="contact-form-config-note" className="contact-config-note">
          Use the email link beside this form while direct form delivery is unavailable.
        </p>
      )}

      <div
        id="contact-form-status"
        className={`contact-form__status contact-form__status--${status}`}
        role={
          status === 'error' || status === 'invalid' || status === 'rate-limited'
            ? 'alert'
            : 'status'
        }
        aria-live={
          status === 'error' || status === 'invalid' || status === 'rate-limited'
            ? 'assertive'
            : 'polite'
        }
        aria-atomic="true"
      >
        {statusMessage}
      </div>

      <Button type="submit" disabled={isSubmitting || isFormUnavailable}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
