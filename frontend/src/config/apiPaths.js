export const apiPaths = {
    auth: {
        logout: () => `/auth/logout`,
        loginGoogle: () => `/auth/google`,
    },
    chats: {
        getChats: (search = '') => `/chats?search=${search}`,
        createChat: () => `/chats/`,
        updateChat: (chatId) => `/chats/${chatId}`,
        deleteChat: (chatId) => `/chats/${chatId}`,
    },
    messages: {
        getMessages: (chatId) => `/chats/${chatId}/messages`,
        createMessage: (chatId) => `/chats/${chatId}/messages`,
    }
};