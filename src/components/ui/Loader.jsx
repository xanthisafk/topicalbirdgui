import { LoaderCircle } from "lucide-react";

const Loader = ({size}) => {
    const wh = size || "1.5rem";
    return (
        <LoaderCircle
            stroke="var(--accent-color)"
            className="spin"
            width={wh}
            height={wh} />
    );
}

export default Loader;