export default {
    async contactProject(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message,
        };

        
        const response = fetch(`https://vue-http-demo-f5470-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.projectId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        }
        );

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.projectId = payload.projectId;

        context.commit('addRequest', newRequest);

    },

    async fetchRequests(context){
        const projectId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-http-demo-f5470-default-rtdb.europe-west1.firebasedatabase.app/requests/${projectId}.json?auth=`+token);
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];
        for (const key in responseData){
            const request = {
                id: key,
                projectId: projectId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }
        context.commit('setRequests', requests);
    }
};


