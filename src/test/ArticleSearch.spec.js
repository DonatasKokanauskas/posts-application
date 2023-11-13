import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import ArticleSearch from "../components/ArticleSearch.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ArticleSearch component", () => {
    let store;
    let state;
    let mutations;
    let actions;
    let getters;

    beforeEach(() => {
        state = {
            searchInputValue: "",
        };
        mutations = {
            setSearchInputValue: vi.fn((state, inputValue) => {
                state.searchInputValue = inputValue;
            }),
        };
        actions = {
            getSearchInputValue: vi.fn(),
            updatePage: vi.fn(),
        };
        getters = {
            searchInputValue: vi.fn((state) => state.searchInputValue),
        };

        store = new Vuex.Store({
            modules: {
                articlesModule: {
                    state,
                    mutations,
                    actions,
                    getters,
                },
            },
        });
    });

    describe("searchArticle()", () => {
        it("should call the searchArticle function and dispatch getSearchInputValue to get search input value", async () => {
            const wrapper = shallowMount(ArticleSearch, {
                store,
                localVue,
                data() {
                    return {
                        inputValue: "text",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.searchArticle();

            expect(dispatchSpy).toHaveBeenCalledWith(
                "getSearchInputValue",
                "text"
            );
        });
    });

    describe("h3 heading", () => {
        it("It should render the correct value received from the searchInputValue getter in an h3 element.", async () => {
            const wrapper = shallowMount(ArticleSearch, {
                store,
                localVue,
            });

            store.commit("setSearchInputValue", "text");
            await wrapper.vm.$nextTick();
            const h3 = wrapper.find("h3");

            expect(h3.text()).toBe('Article(s) by search term "text"');
        });

        it("should not render the h3 element if searchInputValue not received", async () => {
            const wrapper = shallowMount(ArticleSearch, {
                store,
                localVue,
            });

            store.commit("setSearchInputValue", "");
            await wrapper.vm.$nextTick();
            const h3 = wrapper.find("h3");

            expect(h3.exists()).toBe(false);
        });
    });
});
