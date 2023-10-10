const fetchPlugin = (store) => {
    store.fetchData = async (url, mutation) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            store.commit(mutation, data);
        } catch (error) {
            console.log("There was an error", error);
        }
    };
};

export default fetchPlugin;
