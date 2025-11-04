import { GUI_DEFAULT_IMAGES, NAVIGATION_PAGES, SITE_TITLE } from "@/config";
import useThemeIcon from "@/helpers/useThemeIcon";
import "@/styles/components/ui/title.css";
import { Link } from "react-router-dom";

export const TitleText = () => {
    const icon = useThemeIcon();
    return (
        <Link to={NAVIGATION_PAGES.home} viewTransition className="title-container">
            <img src={icon} alt={GUI_DEFAULT_IMAGES.appIcon.alt} className="title-icon" />
            <p className="typewriter-text">{
                SITE_TITLE.toUpperCase().split("").map((c, i) => (<span key={i}>{c}</span>))
            }</p>
        </Link>
    )
}