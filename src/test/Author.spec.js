import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import Author from "../components/Author.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Author component", () => {
    let store;
    // let state;
    // let mutations;
    // let actions;
    // let getters;

    beforeEach(() => {
        // state = {
        //     searchInputValue: "",
        // };
        // mutations = {
        //     setSearchInputValue: vi.fn((state, inputValue) => {
        //         state.searchInputValue = inputValue;
        //     }),
        // };
        // actions = {
        //     getSearchInputValue: vi.fn(),
        //     updatePage: vi.fn(),
        // };
        // getters = {
        //     searchInputValue: vi.fn((state) => state.searchInputValue),
        // };

        store = new Vuex.Store({
            modules: {
                articlesModule: {
                    // state,
                    // mutations,
                    // actions,
                    // getters,
                },
            },
        });
    });

    describe("showModal()", () => {
        it("should call the showModal function and dispatch the modalAction function to show the modal and load the CreateForm component.", async () => {
            const wrapper = shallowMount(Author, {
                store,
                localVue,
                propsData: {
                    id: 1,
                    title: "text",
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.showModal();

            expect(dispatchSpy).toHaveBeenCalledWith("modalAction", {
                component: "DeleteVerification",
                isVisible: true,
                id: this.id,
                title: this.name,
                target: "author",
            });
            // it("should call the searchArticle function and dispatch getSearchInputValue to get search input value", async () => {
            //     const wrapper = shallowMount(ArticleSearch, {
            //         store,
            //         localVue,
            //         data() {
            //             return {
            //                 inputValue: "text",
            //             };
            //         },
            //     });
            //     const dispatchSpy = vi.spyOn(store, "dispatch");

            //     await wrapper.vm.searchArticle();

            //     expect(dispatchSpy).toHaveBeenCalledWith(
            //         "getSearchInputValue",
            //         "text"
            //     );
            // });
        });
    });
});
