import axios from "axios";

const fetchPlugin = (store) => {
    store.fetchData = async (url, mutation) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            store.commit(mutation, data);
        } catch (error) {
            console.log("There was an error", error);
        }
    };
};

export default fetchPlugin;
