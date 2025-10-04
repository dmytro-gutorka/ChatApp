export const apiPaths = {
    auth: {
        logout: () => `/auth/logout`,
        loginGoogle: () => `/auth/google`,
    },
    // ${search && `search=${search}`}

    chats: {
        getChats: (search = '') => `/chats?search=${search}`,
        createChat: () => `/chats/`,
        updateChat: (chatId) => `/chats/${chatId}`,
        deleteChat: (chatId) => `/chats/${chatId}`,
    },
    messages: {

    }
};