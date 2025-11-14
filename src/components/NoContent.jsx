import "@/styles/components/no-content.css"
import { Frown } from "lucide-react";
import Button from "./ui/Button";
import { useViewNavigate } from "@/helpers";

const NoContent = ({ action = null, size=128, what = "posts" }) => {
    const navigate = useViewNavigate()
    return (
        <div className='noContent'>
            <Frown stroke="var(--accent-color)" size={size} />
            <h1>No {what}</h1>
            {
                action && <Button
                    onClick={() => navigate(action.href, action.direction)}>
                    {action.label}</Button>
            }
        </div>
    )
}

export default NoContent;