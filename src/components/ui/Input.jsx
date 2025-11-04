import "@/styles/components/ui/input.css";

const InputBox = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  error = false,
}) => {
  return (
    <div className={`input-container ${className}`}>
      <input
        className={`input-box ${error ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default InputBox;
