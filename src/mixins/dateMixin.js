export default {
    methods: {
        showCreatedOrEditedDate(created_at, updated_at) {
            const createdDate = new Date(created_at).getTime();
            const updatedDate = new Date(updated_at).getTime();

            if (createdDate > updatedDate) {
                const date = new Date(createdDate)
                    .toLocaleString("lt-LT")
                    .slice(0, 11);
                return date;
            } else {
                const date = new Date(updatedDate)
                    .toLocaleString("lt-LT")
                    .slice(0, 11);
                return date;
            }
        },
    },
};
