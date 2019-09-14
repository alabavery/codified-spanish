import getUserById from "./queries/getUserById";
import createUser from './mutations/createUser'

export default {
    queries: {
        getUserById,
    },
    mutations: {
        createUser,
    },
};