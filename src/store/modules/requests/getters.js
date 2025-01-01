export default{
    requests(state, _, _2, rootGetters){
        const projectId = rootGetters.userId; 
        return state.requests.filter(req => req.projectId === projectId);
    },
    hasRequests(_, getters){
        return getters.requests && getters.requests.length > 0;
    }
};