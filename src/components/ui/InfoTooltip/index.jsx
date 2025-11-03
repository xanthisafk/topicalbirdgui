import { Info } from 'lucide-react';
import './styles.css';

const InfoTooltip = ({ text }) => {
  return (
    <div className="info-tooltip">
      <Info size={16} className="info-icon" />
      <div className="tooltip-content">{text}</div>
    </div>
  );
};

export default InfoTooltip;
