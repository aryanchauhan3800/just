function InputField({
  label,
  required,
  placeholder,
  defaultValue,
  prefix,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  prefix?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Fixed-width label */}
      <label className="min-w-[160px] text-sm font-medium text-gray-700">
        {required && <span className="text-red-500">*</span>} {label}:
      </label>

      {/* Input wrapper */}
      <div className="flex-1 flex items-center border rounded px-3 py-2 bg-white">
        {prefix && <span className="text-sm text-gray-500 mr-2">{prefix}</span>}
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}

export default InputField