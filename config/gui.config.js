export const GUI_DEFAULT_IMAGES = Object.freeze({
    adminIcon: {
        image: "/admin_icon.svg",
        alt: "A golden shield",
    },
    modIcon: {
        image: "/mod_icon.svg",
        alt: "A purple shield",
    },
    appIcon: {
        image: "/icon.svg",
        variants: {
            black: "/icon.svg",
            white: "/icon_white.svg",
        },
        alt: "A parrot",
    }
});

export const ACCEPTABLE_FILE_FORMATS_LIST = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
]
export const ACCEPTABLE_FILE_FORMATS_JOINED = ACCEPTABLE_FILE_FORMATS_LIST.join(",");
export const LOCALSTORAGE_KEYS = Object.freeze({
    currentUser: "topicalbird_current_user",
    theme: "topicalbird_preferred_theme",
});

export const NAVIGATION_PAGES = Object.freeze({
    home: "/",
    auth: {
        base: "/auth",
        login: "/auth/login",
        register: "/auth/register",
        account: "/auth/account",
    },
    users: {
        self: "/me",
        username: username => `/u/${encodeURIComponent(username)}`,
    },
    nests: {
        base: "/nests",
        title: title => `/n/${encodeURIComponent(title)}`,
    },
    post: {
        id: id => `/p/${encodeURIComponent(id)}`,
    }
});
