import { useTheme } from "@/hooks/useTheme"
import { 
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownLabel,
    DropdownSeparator,
    DropdownTrigger
} from "./Dropdown";
import { flushSync } from "react-dom";
import { Check, ChevronDown } from "lucide-react";


const themes = {
    dark: [
        { value: 'coffee-dark', label: 'Coffee Dark' },
        { value: 'minty-night-dark', label: 'Minty Night' },
        { value: 'midnight-purple-dark', label: 'Midnight Purple' },
        { value: 'pastel-dreams-dark', label: 'Pastel Dreams' },
        { value: 'red-velvet-dark', label: 'Red Velvet' },
        { value: 'soaring-forest-dark', label: 'Soaring Forest' },
        { value: 'social-media-dark', label: 'Social Media' },
        { value: 'sunburnt-dark', label: 'Sunburnt Dark' }
    ],
    light: [
        { value: 'coffee-light', label: 'Morning Roast' },
        { value: 'mint-light', label: 'Garden Fresh' },
        { value: 'lavender-fields-light', label: 'Lavender Fields' },
        { value: 'pastel-light', label: 'Cotton Candy' },
        { value: 'pride-light', label: 'Pride' },
        { value: 'theme-sky-light', label: 'Theme SKY 🦅' },
        { value: 'social-media-light', label: 'Social Media Light' },
        { value: 'sunburnt-light', label: 'Sunburnt Light' }
    ]
};


const ChangeTheme = () => {
    const { theme, setTheme } = useTheme();

    const handleOnChange = async (value) => {
        if (
            !document.startViewTransition
            || window.matchMedia("(prefers-reduced-motion: reduce").matches) {
            setTheme(value);
            return;
        }

        document.startViewTransition(() => {
            flushSync(() => {
                setTheme(value);
            });
        });
    }
    return (
        <div className="theme-switcher">
            <Dropdown>
                <DropdownTrigger>
                    {(isOpen) => (
                        <>
                            <span>Change Theme</span>
                            <ChevronDown
                                style={{
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform var(--transition-fast)',
                                }}
                            />
                        </>
                    )}
                </DropdownTrigger>
                <DropdownContent>
                    <DropdownLabel><span>Light Themes</span></DropdownLabel>
                    {
                        themes.light.map(({ value, label }, index) => (
                            <DropdownItem
                                key={index}
                                value={value}
                                onClick={() => handleOnChange(value)}
                            > {theme === `theme-${value}` && <Check color="var(--accent-color)" />} {label}</DropdownItem>
                        ))
                    }
                    <DropdownSeparator />
                    <DropdownLabel><span>Dark Themes</span></DropdownLabel>
                    {
                        themes.dark.map(({ value, label }, index) => (
                            <DropdownItem
                                key={index}
                                value={value}
                                onClick={() => handleOnChange(value)}
                            >{theme === `theme-${value}` && <Check color="var(--accent-color)" />} {label}</DropdownItem>
                        ))
                    }
                </DropdownContent>
            </Dropdown>
        </div>
    )
}

export default ChangeTheme