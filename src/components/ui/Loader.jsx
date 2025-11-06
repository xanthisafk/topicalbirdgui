import { LoaderCircle } from "lucide-react";

const Loader = ({size}) => {
    const wh = size || "1.5rem";
    return (
        <LoaderCircle
            className="spin"
            width={wh}
            height={wh} />
    );
}

export default Loader;