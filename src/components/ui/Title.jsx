import { GUI_DEFAULT_IMAGES, SITE_NAME } from "@/config";
import useThemeIcon from "@/helpers/useThemeIcon";
import "@styles/components/ui/title.css";

export const TitleText = () => {
    const icon = useThemeIcon();
    return (
        <a href="/" className="title-container">
            <img src={icon} alt={GUI_DEFAULT_IMAGES.appIcon.alt} className="title-icon" />
            <p className="typewriter-text">{
                SITE_NAME.toUpperCase().split("").map((c, i) => (<span key={i}>{c}</span>))
            }</p>
        </a>
    )
}