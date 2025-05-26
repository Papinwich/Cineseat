import React from 'react';

const InputField = ({
  label,
  type = 'text',
  register,
  name,
  placeholder,
  options,
  elementType = 'input',
  disabled = false,
  selectPlaceholder = null,
  noOptionsMessage = null,
  error,
}) => {
  // สร้าง className สำหรับ select หรือ input
  const baseClasses =
    'mt-1 block w-full px-3 py-2 bg-gray-100 border border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary';
  const disabledClasses = disabled ? 'text-zinc-400 border-zinc-200' : '';
  const textareaClasses = elementType === 'textarea' ? 'h-20' : '';
  const className =
    `${baseClasses} ${textareaClasses} ${disabledClasses}`.trim();

  return (
    <div>
      <label className="block text-md font-bold">{label}</label>
      {elementType === 'select' ? (
        <select
          className={className}
          {...register(name)}
          disabled={disabled}
          defaultValue={selectPlaceholder ? '' : undefined}
        >
          {selectPlaceholder && (
            <option value="" disabled hidden>
              {selectPlaceholder}
            </option>
          )}
          {options?.length > 0
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : noOptionsMessage && (
                <option value="" disabled>
                  {noOptionsMessage}
                </option>
              )}
        </select>
      ) : elementType === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          className={className}
          {...register(name)}
          disabled={disabled}
        />
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          className={className}
          {...register(name)}
          disabled={disabled}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
