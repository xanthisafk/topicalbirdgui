import './label.css';

const InputLabel = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`input-label ${className}`}>
      {children}
    </label>
  );
};

export default InputLabel;