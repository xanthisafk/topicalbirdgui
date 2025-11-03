import InfoTooltip from '../InfoTooltip';
import './label.css';


const InputLabel = ({ htmlFor, children, className = '', helperText="" }) => {
  return (
    <div className='boxlabel-container'>
    <label htmlFor={htmlFor} className={`input-label ${className}`}>
      {children}
    </label>
    {helperText && <InfoTooltip text={helperText} />}
    </div>
  );
};

export default InputLabel;