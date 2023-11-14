import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import VueRouter from "vue-router";
import DeleteVerification from "../components/DeleteVerification.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("DeleteVerification component", () => {
    let store;
    let state;
    let mutations;
    let actions;
    let getters;

    beforeEach(() => {
        state = {
            modalData: {
                component: null,
                isVisible: false,
            },
        };
        mutations = {
            setModalData: vi.fn((state, modalObject) => {
                state.modalData = modalObject;
            }),
        };
        actions = {
            deleteArticleAction: vi.fn(),
            closeModalAction: vi.fn(),
            deleteAuthorAction: vi.fn(),
        };
        getters = {
            modalDataGetter: vi.fn((state) => state.modalData),
        };

        store = new Vuex.Store({
            modules: {
                module: {
                    state,
                    mutations,
                    actions,
                    getters,
                },
            },
        });
    });

    describe("deleteArticle()", () => {
        it("should call the deleteArticle function and dispatch deleteArticleAction to delete specific article", async () => {
            const mockRouter = new VueRouter();
            const wrapper = shallowMount(DeleteVerification, {
                store,
                localVue,
                mocks: {
                    $router: mockRouter,
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            store.commit("setModalData", {
                id: 1,
            });
            await wrapper.vm.deleteArticle();

            expect(dispatchSpy).toHaveBeenCalledWith("deleteArticleAction", 1);
        });
    });

    describe("deleteAuthor()", () => {
        it("should call the deleteAuthor function and dispatch deleteAuthorAction to delete specific author", async () => {
            const wrapper = shallowMount(DeleteVerification, {
                store,
                localVue,
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            store.commit("setModalData", {
                id: 1,
            });
            await wrapper.vm.deleteAuthor();

            expect(dispatchSpy).toHaveBeenCalledWith("deleteAuthorAction", 1);
        });
    });

    describe("button click", () => {
        it('calls deleteArticle function when "Delete" button is clicked', async () => {
            const mockRouter = new VueRouter();
            const showModalSpy = vi.spyOn(
                DeleteVerification.methods,
                "deleteArticle"
            );
            const wrapper = shallowMount(DeleteVerification, {
                store,
                localVue,
                mocks: {
                    $router: mockRouter,
                },
            });

            store.commit("setModalData", {
                target: "article",
            });
            await wrapper.find(".button.is-danger").trigger("click");
            await wrapper.vm.$nextTick();

            expect(showModalSpy).toHaveBeenCalled();
        });

        it('calls deleteAuthor function when "Delete" button is clicked', async () => {
            const mockRouter = new VueRouter();
            const showModalSpy = vi.spyOn(
                DeleteVerification.methods,
                "deleteAuthor"
            );
            const wrapper = shallowMount(DeleteVerification, {
                store,
                localVue,
                mocks: {
                    $router: mockRouter,
                },
            });

            store.commit("setModalData", {
                target: "author",
            });
            await wrapper.find(".button.is-danger").trigger("click");
            await wrapper.vm.$nextTick();

            expect(showModalSpy).toHaveBeenCalled();
        });
    });

    describe("router push", () => {
        it('should push to "/" route if not on the home page after article deletion', async () => {
            const mockRouter = {
                push: vi.fn(),
                currentRoute: { fullPath: "/route" },
            };
            const wrapper = shallowMount(DeleteVerification, {
                store,
                localVue,
                mocks: {
                    $router: mockRouter,
                },
            });

            await wrapper.vm.deleteArticle();

            expect(mockRouter.push).toHaveBeenCalledWith({ path: "/" });
        });
    });
});
