import { Info } from 'lucide-react';
import "@/styles/components/ui/tooltip.css";

const Tooltip = ({ text }) => {
  return (
    <div className="info-tooltip">
      <Info size={16} className="info-icon" />
      <div className="tooltip-content">{text}</div>
    </div>
  );
};

export default Tooltip;
