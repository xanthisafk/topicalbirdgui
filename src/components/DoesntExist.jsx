import { GUI_DEFAULT_IMAGES, NAVIGATION_PAGES } from "@/config";
import useThemeIcon from "@/helpers/useThemeIcon";

import "@/styles/components/doesnt-exist.css";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const DoestExist = ({
    icon,
    alt = GUI_DEFAULT_IMAGES.appIcon.alt,
    to = {
        url: NAVIGATION_PAGES.home,
        label: "Go Home",
        direction: "theme"
    },
    what = "page" }) => {
    const parrot = useThemeIcon();
    icon = icon || parrot;
    const navigate = useNavigate()
    return (
        <div className='doesntExist'>

            <img
                src={icon} alt={alt} />
            <h1>This {what} doesn't exist!</h1>
            <Button
                onClick={() => navigate(to.url, { viewTransition: true })}>
                {to.label}</Button>
        </div>
    )
}

export default DoestExist;