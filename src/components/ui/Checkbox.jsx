import "@/styles/components/ui/checkbox.css";
import Label from "./Label";
import { Check } from "lucide-react";

const Checkbox = ({ id, label, ...props }) => {
    return (
        <div className="checkbox-container">
            <Label htmlFor={id}>
                <input id={id} type="checkbox" {...props} />
                <span className="cbx">
                    <Check className="checkmark" />
                </span>
                <span>{label}</span>
            </Label>
        </div>
    )
}

export default Checkbox