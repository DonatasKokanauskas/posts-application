const modalModule = {
    state: () => ({
        modalData: {},
    }),
    mutations: {
        setModalData(state, modalObject) {
            state.modalData = modalObject;
        },
    },
    actions: {
        modalAction({ commit }, modalObject) {
            commit("setModalData", modalObject);
        },
        closeModalAction({ commit }) {
            commit("setModalData", {});
        },
    },
    getters: {
        modalDataGetter(state) {
            return state.modalData;
        },
    },
};

export default modalModule;
