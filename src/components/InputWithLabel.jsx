export const InputWithLabel = ({ label, placeholder, type, required }) => {
  return (
    <>
      <label htmlFor="" className="mb-2">
        {label}
      </label>
      <input
        type={type || "text"}
        className="w-full border p-2 rounded-lg"
        placeholder={placeholder || label}
        required={required || true}
      />
    </>
  );
};
