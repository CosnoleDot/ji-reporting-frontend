export const InputWithLabel = ({
  label,
  placeholder,
  type,
  required,
  name,
  value,
  id,
}) => {
  if (type === "textarea")
    return (
      <>
        <label className="mb-2 block" htmlFor={id}>
          {label}
        </label>
        <textarea
          className="w-full border p-2 rounded-lg mb-2"
          placeholder={placeholder || label}
          required={required || true}
          name={name}
          id={id}
          rows={2}
        ></textarea>
      </>
    );

  return (
    <>
      <label className="mb-2 block" htmlFor={id}>
        {label}
      </label>
      <input
        type={type || "number"}
        className="w-full border p-2 rounded-lg mb-2"
        placeholder={value || placeholder || label}
        required={required || true}
        name={name}
        id={id}
      />
    </>
  );
};
