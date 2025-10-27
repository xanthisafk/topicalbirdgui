import './Dropdown.css';

const Dropdown = ({ options = [], value, onChange, className = '' }) => {
  return (
    <select className={`dropdown ${className}`} value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;