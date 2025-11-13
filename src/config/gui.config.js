export const SITE_TITLE = "Topicalbird";
export const SITE_URL = "http://localhost:8888"
export const GUI_DEFAULT_SOUNDS = Object.freeze({
    likePop: "/assets/posts/like-pop.wav",
});

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
    feedLimit: "topicalbird_feed_limit",
    feedPosts: "topicalbird_feed_posts",
    feedPages: "topicalbird_feed_pagination"
});
export const EVENT_LISTENER_KEYS = Object.freeze({
    currentUser: "topicalbird-current-user-changed"
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
        settings: title => `/n/${encodeURIComponent(title)}/settings`,
        newPost: title => `/n/${encodeURIComponent(title)}/new`,
        newNest: "/nests/new"
    },
    post: {
        id: id => `/p/${encodeURIComponent(id)}`,
        feed: `/feed/`
    }
});