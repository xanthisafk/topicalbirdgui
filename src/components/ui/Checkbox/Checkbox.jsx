import './Checkbox.css';

const Checkbox = ({ id, checked, onChange, label }) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="checkbox-input" />
      {label && <label htmlFor={id} className="checkbox-label">{label}</label>}
    </div>
  );
};

export default Checkbox;