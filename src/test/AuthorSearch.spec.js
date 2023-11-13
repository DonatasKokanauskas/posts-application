import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import AuthorSearch from "../components/AuthorSearch.vue";

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
      authorSearchInputValue: "",
    };
    mutations = {
      setAuthorSearchInputValue: vi.fn((state, inputValue) => {
        state.authorSearchInputValue = inputValue;
      }),
    };
    actions = {
      getAuthorSearchInputValue: vi.fn(),
      updateAuthorsPage: vi.fn(),
    };
    getters = {
      authorSearchInputValue: vi.fn((state) => state.authorSearchInputValue),
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

  describe("searchAuthor()", () => {
    it("should call the searchAuthor function and dispatch getAuthorSearchInputValue to get search input value", async () => {
      const wrapper = shallowMount(AuthorSearch, {
        store,
        localVue,
        data() {
          return {
            inputValue: "text",
          };
        },
      });
      const dispatchSpy = vi.spyOn(store, "dispatch");

      await wrapper.vm.searchAuthor();

      expect(dispatchSpy).toHaveBeenCalledWith(
        "getAuthorSearchInputValue",
        "text"
      );
    });
  });

  describe("h3 heading", () => {
    it("It should render the correct value received from the authorSearchInputValue getter in an h3 element.", async () => {
      const wrapper = shallowMount(AuthorSearch, {
        store,
        localVue,
      });

      store.commit("setAuthorSearchInputValue", "text");
      await wrapper.vm.$nextTick();
      const h3 = wrapper.find("h3");

      expect(h3.text()).toBe('Author(s) by search term "text"');
    });

    it("should not render the h3 element if authorSearchInputValue not received", async () => {
      const wrapper = shallowMount(AuthorSearch, {
        store,
        localVue,
      });

      store.commit("setAuthorSearchInputValue", "");
      await wrapper.vm.$nextTick();
      const h3 = wrapper.find("h3");

      expect(h3.exists()).toBe(false);
    });
  });
});
