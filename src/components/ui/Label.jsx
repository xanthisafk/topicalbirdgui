import Tooltip from './Tooltip';
import "@/styles/components/ui/label.css";


const Label = ({ htmlFor, children, className = '', helperText="" }) => {
  return (
    <div className='boxlabel-container'>
    <label htmlFor={htmlFor} className={`input-label ${className}`}>
      {children}
    </label>
    {helperText && <Tooltip text={helperText} />}
    </div>
  );
};

export default Label;