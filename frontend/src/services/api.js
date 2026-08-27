import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});


// ---------------------------------------
// Developers
// ---------------------------------------

export const getDevelopers = () => {
    return API.get("/developers");
};


export const getDeveloper = (id) => {
    return API.get(`/developers/${id}`);
};


export const getDeveloperSkills = (id) => {
    return API.get(`/developers/${id}/skills`);
};


// ---------------------------------------
// Jobs
// ---------------------------------------

export const getJobs = () => {
    return API.get("/jobs");
};


export const getJob = (id) => {
    return API.get(`/jobs/${id}`);
};


// ---------------------------------------
// Recommendations
// ---------------------------------------

export const getRecommendations = (developerId) => {
    return API.get(
        `/jobs/recommendations/${developerId}`
    );
};


// ---------------------------------------
// Graph
// ---------------------------------------

export const getDeveloperGraph = (developerId) => {
    return API.get(
        `/graph/${developerId}`
    );
};


export default API;