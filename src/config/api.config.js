export const API_BASE_URL = "http://localhost:9999";
export const API_URL_FROM_CONTENT_URL = (val) => {
    if (!val || val.length <= 0) return API_BASE_URL;
    if (val[0] === "/") return `${API_BASE_URL}${val}`;

    return `${API_BASE_URL}/${val}`
};

const api_defaults_folder = `${API_BASE_URL}/content/assets/defaults`;
export const API_DEFAULT_IMAGES = Object.freeze({
    appIcon: {
        image: `${api_defaults_folder}/api_icon.svg`,
        alt: "A parrot",
    },
    userPicture: {
        image: `${api_defaults_folder}/pp_256.png`,
        alt: "An egg",
    },
    nestPicture: {
        image: `${api_defaults_folder}/nest_256.png`,
        alt: "A nest",
    }
});

const api = `${API_BASE_URL}/api`;
export const API_ENDPOINTS = Object.freeze({
    base: api,
    auth: {
        changePassword: {
            url: `${api}/Auth/password`,
            method: "PATCH",
        },
        create: {
            url: `${api}/Auth/register`,
            method: "POST",
        },
        login: {
            url: `${api}/Auth/login`,
            method: "POST",
        },
        logout: {
            url: `${api}/Auth/logout`,
            method: "POST",
        },
    },
    comments: {
        delete: {
            url: commentId => `${api}/Comments/remove/${encodeURIComponent(commentId)}`,
            method: "DELETE",
        },
        get: {
            url: postId => `${api}/Comments/get/${encodeURIComponent(postId)}`,
            method: "GET",
        },
        update: {
            url: commentId => `${api}/Comments/edit/${encodeURIComponent(commentId)}`,
            method: "PATCH",
        },
        create: {
            url: postId => `${api}/Comments/add/${encodeURIComponent(postId)}`,
            method: "POST",
        },
    },
    nest: {
        getById: {
            url: id => `${api}/Nest/${encodeURIComponent(id)}`,
            method: "GET"
        },
        getByTitle: {
            url: title => `${api}/Nest/title/${encodeURIComponent(title)}`,
            method: "GET"
        },
        search: {
            url: query => `${api}/Nest/search/${encodeURIComponent(query)}`,
            method: "GET"
        },
        getAll: {
            url: `${api}/Nest/`,
            method: "GET"
        },
        selfNests: {
            url: `${api}/Nest/me`,
            method: "GET"
        },
        update: {
            url: id => `${api}/Nest/${encodeURIComponent(id)}`,
            method: "PATCH"
        },
        create: {
            url: `${api}/Nest/new`,
            method: "POST"
        },
    },
    posts: {
        deletePostById: {
            url: id => `${api}/Posts/delete/${encodeURIComponent(id)}`,
            method: "DELETE"
        },
        getPostById: {
            url: id => `${api}/Posts/${encodeURIComponent(id)}`,
            method: "GET"
        },
        getAllPostsByNest: {
            url: `${api}/Posts/nest`,
            method: "GET"
        },
        getAllPostsByUserId: {
            url: id => `${api}/Posts/user/id/${encodeURIComponent(id)}`,
            method: "GET"
        },
        getAllPostsByUsername: {
            url: `${api}/Posts/user/username`,
            method: "GET"
        },
        latest: {
            url: `${api}/Posts/latest`,
            method: "GET"
        },
        popular: {
            url: `${api}/Posts/popular`,
            method: "GET"
        },
        update: {
            url: postId => `${api}/Posts/update/${encodeURIComponent(postId)}`,
            method: "PATCH"
        },
        create: {
            url: `${api}/Posts/new`,
            method: "POST"
        }
    },
    users: {
        adminOnlyGetAll: {
            url: `${api}/Users`,
            method: "GET"
        },
        currentUser: {
            url: `${api}/Users/me`,
            method: "GET"
        },
        getById: {
            url: id => `${api}/Users/get/id/${encodeURIComponent(id)}`,
            method: "GET"
        },
        getByUsername: {
            url: username => `${api}/Users/get/username/${encodeURIComponent(username)}`,
            method: "GET"
        },
        adminOnlyGetByEmail: {
            url: email => `${api}/Users/get/email/${encodeURIComponent(email)}`,
            method: "GET"
        },
        search: {
            url: `${api}/Users/search`,
            method: "GET"
        },
        update: {
            url: id => `${api}/Users/update/${encodeURIComponent(id)}`,
            method: "PATCH"
        },
        adminOnlyBan: {
            url: id => `${api}/Users/ban/${encodeURIComponent(id)}`,
            method: "PATCH"
        },
        adminOnlyUnban: {
            url: id => `${api}/Users/unban/${encodeURIComponent(id)}`,
            method: "PATCH"
        },
        adminOnlyPromote: {
            url: id => `${api}/Users/promote/${encodeURIComponent(id)}`,
            method: "PATCH"
        },
    },
    vote: {
        score: {
            url: id => `${api}/Vote/${encodeURIComponent(id)}/score`,
            method: "GET"
        },
        cast: {
            url: id => `${api}/Vote/${encodeURIComponent(id)}`,
            method: "POST"
        }
    }
});