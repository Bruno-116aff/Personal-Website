export type ContactSubmission = {
  email: string;
  message: string;
  name: string;
  website: string;
};

export type ContactValidationErrors = Partial<Record<keyof ContactSubmission, string>>;

function normalize(value: string) {
  return value.trim();
}

export function getContactApiUrl(configuredValue: string | undefined) {
  const value = configuredValue?.trim();
  return value || null;
}

export function toContactSubmission(formData: FormData): ContactSubmission {
  return {
    name: normalize(String(formData.get('name') ?? '')),
    email: normalize(String(formData.get('email') ?? '')).toLowerCase(),
    message: normalize(String(formData.get('message') ?? '')),
    website: normalize(String(formData.get('website') ?? '')),
  };
}

export function validateContactSubmission(values: ContactSubmission): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  if (!values.name || values.name.length > 100) {
    errors.name = 'Enter a name of up to 100 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.message || values.message.length > 5_000) {
    errors.message = 'Enter a message of up to 5,000 characters.';
  }

  return errors;
}
