import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import CreateAuthorForm from "../components/forms/CreateAuthorForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CreateAuthorForm component", () => {
    let store;
    let actions;

    beforeEach(() => {
        actions = {
            postNewAuthor: vi.fn(),
            closeModalAction: vi.fn(),
        };

        store = new Vuex.Store({
            modules: {
                module: {
                    actions,
                },
            },
        });
    });

    describe("submitForm()", () => {
        it("should call the submitForm function and dispatch postNewAuthor to post new author", async () => {
            const wrapper = shallowMount(CreateAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.setData({ name: "name" });
            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("postNewAuthor", {
                name: "name",
                created_at: new Date().toLocaleString("lt-LT").slice(0, 11),
                updated_at: new Date().toLocaleString("lt-LT").slice(0, 11),
            });
        });

        it("should not call dispatch actions because of error", async () => {
            const wrapper = shallowMount(CreateAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.submitForm();

            expect(dispatchSpy).not.toHaveBeenCalled();
        });

        it("should call the submitForm function and dispatch closeModalAction to close the modal", async () => {
            const wrapper = shallowMount(CreateAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.setData({ name: "name" });
            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("closeModalAction");
        });
    });

    describe("if condition", () => {
        it("should render the 'errors' ul element if the name field is empty .", async () => {
            const wrapper = shallowMount(CreateAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "",
                        errors: [],
                    };
                },
            });

            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });

        it("should render the 'errors' ul element if the name exceed 50 characters.  .", async () => {
            const wrapper = shallowMount(CreateAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, dolores.",
                        errors: [],
                    };
                },
            });

            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });
    });
});
