import "@/styles/components/no-content.css"
import { Frown } from "lucide-react";

const NoContent = ({ action = null, size=128, what = "posts" }) => {
    return (
        <div className='noContent'>
            <Frown stroke="var(--accent-color)" size={size} />
            <h1>No {what}</h1>
            {
                action && <Button
                    onClick={() => action.action()}>
                    {action.label}</Button>
            }
        </div>
    )
}

export default NoContent;