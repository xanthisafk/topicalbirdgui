import { GUI_DEFAULT_IMAGES, NAVIGATION_PAGES } from "@/config";
import useThemeIcon from "@/helpers/useThemeIcon";
import Loader from "./ui/Loader";

const ContentLoading = ({ size = 32 }) => {
    const parrot = useThemeIcon();
    return (
        <div className='doesntExist'>

            <img
                src={parrot} alt={GUI_DEFAULT_IMAGES.appIcon.alt} />
            <h1><Loader size={size} /></h1>
            
        </div>
    )
}

export default ContentLoading;