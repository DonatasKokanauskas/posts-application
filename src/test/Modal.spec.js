import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import Modal from "../components/modals/Modal.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Modal component", () => {
    let store;
    let state;
    let mutations;
    let getters;

    beforeEach(() => {
        state = {
            modalData: {},
        };
        mutations = {
            setModalData: vi.fn((state, modalObject) => {
                state.modalData = modalObject;
            }),
        };
        getters = {
            modalDataGetter: vi.fn((state) => state.modalData),
        };

        store = new Vuex.Store({
            modules: {
                module: {
                    state,
                    mutations,
                    getters,
                },
            },
        });
    });

    describe("if condition", () => {
        it("should render the modal if condition is true", async () => {
            const wrapper = shallowMount(Modal, {
                store,
                localVue,
            });

            await store.commit("setModalData", {
                isVisible: true,
            });
            const modal = wrapper.find(".modal");

            expect(modal.exists()).toBe(true);
        });

        it("should not render the modal if condition is false", async () => {
            const wrapper = shallowMount(Modal, {
                store,
                localVue,
            });

            await store.commit("setModalData", {
                isVisible: false,
            });
            const modal = wrapper.find(".modal");

            expect(modal.exists()).toBe(false);
        });
    });

    describe("closeModal()", () => {
        it("should call the closeModal function and dispatch closeModalAction to close the modal.", async () => {
            const wrapper = shallowMount(Modal, {
                store,
                localVue,
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.closeModal();

            expect(dispatchSpy).toHaveBeenCalledWith("closeModalAction");
        });
    });
});
