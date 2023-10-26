import axios from "axios";

const apiRequestsPlugin = (store) => {
    store.fetchData = async (url) => {
        try {
            const response = await axios.get(url);

            if (response.headers.get("X-Total-Count")) {
                store.dispatch(
                    "getTotalArticles",
                    response.headers.get("X-Total-Count")
                );
            }

            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to fetch data from the following URL: ${url}. ${error}`
            );
        }
    };

    store.postData = async (url, data) => {
        try {
            await axios.post(url, data);
        } catch (error) {
            throw new Error(
                `An error occurred while trying to post data to the following URL: ${url}. ${error}`
            );
        }
    };

    store.deleteData = async (url) => {
        try {
            await axios.delete(url);
        } catch (error) {
            throw new Error(
                `An error occurred while trying to delete data from the following URL: ${url}. ${error}`
            );
        }
    };

    store.editData = async (url, editedData) => {
        try {
            await axios.put(url, editedData);
        } catch (error) {
            throw new Error(
                `An error occurred while trying to edit data from the following URL: ${url}. ${error}`
            );
        }
    };
};

export default apiRequestsPlugin;
