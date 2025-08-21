// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// SKU validation
export const isValidSKU = (sku: string): boolean => {
  // Alphanumeric with hyphens and underscores, 3-20 characters
  const skuRegex = /^[A-Za-z0-9_-]{3,20}$/;
  return skuRegex.test(sku);
};

// Price validation
export const isValidPrice = (price: number): boolean => {
  return price > 0 && Number.isFinite(price);
};

// Stock validation
export const isValidStock = (stock: number): boolean => {
  return Number.isInteger(stock) && stock >= 0;
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Minimum length validation
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

// Maximum length validation
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

// Number range validation
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// File type validation
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// File size validation (in bytes)
export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

// Image file validation
export const isValidImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return isValidFileType(file, allowedTypes) && isValidFileSize(file, maxSize);
};

// Form validation helper
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateField = (value: any, rules: ValidationRule): string | null => {
  if (rules.required && !isRequired(value)) {
    return rules.message || 'This field is required';
  }

  if (typeof value === 'string') {
    if (rules.minLength && !hasMinLength(value, rules.minLength)) {
      return rules.message || `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && !hasMaxLength(value, rules.maxLength)) {
      return rules.message || `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || 'Invalid format';
    }
  }

  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      return rules.message || `Minimum value is ${rules.min}`;
    }

    if (rules.max !== undefined && value > rules.max) {
      return rules.message || `Maximum value is ${rules.max}`;
    }
  }

  if (rules.custom && !rules.custom(value)) {
    return rules.message || 'Invalid value';
  }

  return null;
};

export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach(field => {
    const error = validateField(data[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters',
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]{10,}$/,
    message: 'Please enter a valid phone number',
  },
  price: {
    required: true,
    min: 0.01,
    message: 'Price must be greater than 0',
  },
  stock: {
    required: true,
    min: 0,
    message: 'Stock must be 0 or greater',
  },
  sku: {
    required: true,
    pattern: /^[A-Za-z0-9_-]{3,20}$/,
    message: 'SKU must be 3-20 characters (letters, numbers, hyphens, underscores)',
  },
};
