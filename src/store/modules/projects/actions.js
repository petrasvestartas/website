import auth from "../auth";

export default {
    async registerProject(context, data) {
        const userId = context.rootGetters.userId;
        const projectData = {
            title: data.title,
            authors: data.authors,
            date: data.date,
            location: data.location,
            urls: data.urls,
            descriptions: data.descriptions.map(description => ({
                title: description.title,
                text: description.text
              })),
            types: data.types,
            imageUrl: data.imageUrl,
            figureUrls: data.figureUrls,
            publications: data.publications,
            sortId: data.sortId,
        };

        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-http-demo-f5470-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=` + token, {
            method: 'POST',
            body: JSON.stringify({ userId, ...projectData })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to register project.');
            throw error;
        }

        context.commit('registerProject', {
            ...projectData,
            id: userId
        });

    },
    async loadProjects(context, payload) {

        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }


        const response = await fetch(
            `https://vue-http-demo-f5470-default-rtdb.europe-west1.firebasedatabase.app/projects.json`
        );

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const projects = [];

        for (const key in responseData) {
            const projectData = responseData[key];
            if (projectData.sortId !== -1) {
                const project = {
                    id: key,
                    title: projectData.title,
                    authors: projectData.authors,
                    date: projectData.date,
                    location: projectData.location,
                    urls: projectData.urls,
                    descriptions: projectData.descriptions.map(description => ({
                        title: description.title,
                        text: description.text
                    })),
                    types: projectData.types,
                    imageUrl: projectData.imageUrl,
                    figureUrls: projectData.figureUrls,
                    userId: projectData.userId,
                    publications: projectData.publications,
                    sortId: projectData.sortId,
                };
                // console.log(project.sortId);
                projects.push(project);
            }
 
        }

        // Sort projects by sortId
        projects.sort((a, b) => a.sortId - b.sortId);

        context.commit('setProjects', projects);
        context.commit('setFetchTimestamp');




    }


};