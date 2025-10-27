import { LoaderCircle } from 'lucide-react'

const Loader = ({ size }) => {
    const wh = size || "3.5rem";
    return (
        <LoaderCircle style={{ color: "var(--accent-color)" }} className="spin" width={wh} height={wh} />
    )
}

export default Loader;
