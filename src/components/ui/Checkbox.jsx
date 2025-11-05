import "@/styles/components/ui/checkbox.css";
import Label from "./Label";

const Checkbox = ({ label, ...props }) => {
    return (
        <div class="checkbox-container">
            <Label>
                <input type="checkbox" {...props} />
                <span class="cbx">
                    <svg width="11px" height="11px" viewBox="0 0 12 11">
                        <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                    </svg>
                </span>
                <span>{label}</span>
            </Label>
        </div>
    )
}

export default Checkbox