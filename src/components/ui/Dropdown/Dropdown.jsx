import './Dropdown.css';

const Dropdown = ({ options = [], value, onChange, className = '', ref = null }) => {
  return (
    <select className={`dropdown ${className}`} value={value} onChange={onChange} ref={ref}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;