import useThemeIcon from "../../../helpers/useThemeIcon";
import "./title.css"

export const TitleText = () => {
    const icon = useThemeIcon();
    return (
        <a href="/" className="title-container">
            <img src={icon} alt="Topicalbird Icon" className="title-icon" />
            <h1 className="typewriter-text">{
                "TOPICALBIRD".split("").map((c, i) => (<span key={i}>{c}</span>))
            }</h1>
        </a>
    )
}