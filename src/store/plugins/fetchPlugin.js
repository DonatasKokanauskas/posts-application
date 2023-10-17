import axios from "axios";

const fetchPlugin = (store) => {
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
};

export default fetchPlugin;
