import axios from "axios";

const apiRequestsPlugin = (store) => {
    store.fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to fetch data from the following URL: ${url}. ${error}`
            );
        }
    };

    store.postData = (url, data) => {
        try {
            axios.post(url, data);
        } catch (error) {
            throw new Error(
                `An error occurred while trying to post data to the following URL: ${url}. ${error}`
            );
        }
    };

    store.deleteData = (url) => {
        try {
            axios.delete(url);
        } catch (error) {
            throw new Error(
                `An error occurred while trying to delete data from the following URL: ${url}. ${error}`
            );
        }
    };
};

export default apiRequestsPlugin;
