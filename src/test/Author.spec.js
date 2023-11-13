import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import Author from "../components/Author.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Author component", () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      modalAction: vi.fn(),
    };

    store = new Vuex.Store({
      modules: {
        articlesModule: {
          actions,
        },
      },
    });
  });

  describe("showModal()", () => {
    it("should call the showModal function and dispatch the modalAction function, which saves the data in Vuex for modal opening.", async () => {
      const wrapper = shallowMount(Author, {
        store,
        localVue,
        propsData: {
          id: 1,
          name: "name",
        },
      });
      const dispatchSpy = vi.spyOn(store, "dispatch");

      await wrapper.vm.showModal();

      expect(dispatchSpy).toHaveBeenCalledWith("modalAction", {
        component: "DeleteVerification",
        isVisible: true,
        id: 1,
        title: "name",
        target: "author",
      });
    });
  });

  describe(" showEditFormModal()", () => {
    it("should call the showEditFormModal function and dispatch the modalAction function, which saves the data in Vuex for modal opening", async () => {
      const wrapper = shallowMount(Author, {
        store,
        localVue,
        propsData: {
          id: 1,
          name: "name",
          createdDate: "2023-11-13",
        },
      });
      const dispatchSpy = vi.spyOn(store, "dispatch");

      await wrapper.vm.showEditFormModal();

      expect(dispatchSpy).toHaveBeenCalledWith("modalAction", {
        component: "EditAuthorForm",
        isVisible: true,
        id: 1,
        name: "name",
        created_at: "2023-11-13",
      });
    });
  });

  describe("h3 element", () => {
    it("should render the component with the correct 'name' prop and display the prop value in an h3 element.", () => {
      const wrapper = shallowMount(Author, {
        propsData: {
          name: "name",
        },
      });

      const h3 = wrapper.find("h3");

      expect(h3.text()).toContain("Author: name");
    });
  });

  describe("button click", () => {
    it('calls showEditFormModal when "Edit author" button is clicked', async () => {
      const showEditFormModalSpy = vi.spyOn(
        Author.methods,
        "showEditFormModal"
      );
      const wrapper = shallowMount(Author);

      await wrapper.find(".button.mr-3").trigger("click");
      await wrapper.vm.$nextTick();

      expect(showEditFormModalSpy).toHaveBeenCalled();
    });

    it('calls showModal when "Delete author" button is clicked', async () => {
      const showModalSpy = vi.spyOn(Author.methods, "showModal");
      const wrapper = shallowMount(Author);

      await wrapper.find(".button.is-danger").trigger("click");
      await wrapper.vm.$nextTick();

      expect(showModalSpy).toHaveBeenCalled();
    });
  });
});
