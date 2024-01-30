export const InputWithLabel = ({
  label,
  placeholder,
  type,
  required,
  name,
  value,
  id,
  readOnly,
  onChange,
  disabled,
}) => {
  if (type === "textarea")
    return (
      <>
        <label className="mb-3 block" htmlFor={id}>
          {label}
        </label>
        <textarea
          className="w-full border p-2 rounded-lg mb-2"
          placeholder={placeholder || label}
          required={required || true}
          name={name}
          id={id}
          rows={1}
          value={value || ""}
        ></textarea>
      </>
    );

  return (
    <>
      <label className="mb-3 block" htmlFor={id}>
        {label}
      </label>
      <input
        type={type || "number"}
        readOnly={readOnly}
        className="w-full border p-2 rounded-lg mb-2"
        placeholder={value || placeholder || label}
        required={required || true}
        name={name}
        id={id}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};
