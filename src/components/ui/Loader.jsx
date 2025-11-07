import { LoaderCircle } from "lucide-react";

const Loader = ({size, stroke = "var(--accent-color)"}) => {
    const wh = size || "1.5rem";
    return (
        <LoaderCircle
            stroke={stroke}
            className="spin"
            width={wh}
            height={wh} />
    );
}

export default Loader;