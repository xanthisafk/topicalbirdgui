import './input.css';

const InputBox = ({ value, onChange, placeholder = '', type = 'text', className = '' }) => {
  return (
    <input
      className={`input-box ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default InputBox;