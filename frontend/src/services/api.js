import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});




export const getDevelopers = () => {
    return API.get("/developers");
};


export const getDeveloper = (id) => {
    return API.get(`/developers/${id}`);
};


export const createDeveloper = (data) => {
    return API.post("/developers", data);
};


export const getDeveloperSkills = (id) => {
    return API.get(`/developers/${id}/skills`);
};




export const getSkills = () => {
    return API.get("/skills");
};



export const getJobs = () => {
    return API.get("/jobs");
};


export const getJob = (id) => {
    return API.get(`/jobs/${id}`);
};



export const getRecommendations = (developerId) => {
    return API.get(
        `/jobs/recommendations/${developerId}`
    );
};



export const getDeveloperGraph = (developerId) => {
    return API.get(
        `/graph/${developerId}`
    );
};


export default API; 