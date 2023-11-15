import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import EditAuthorForm from "../components/forms/EditAuthorForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("EditAuthorForm component", () => {
    let store;
    let actions;
    let getters;

    beforeEach(() => {
        actions = {
            editAuthor: vi.fn(),
            closeModalAction: vi.fn(),
        };
        getters = {
            modalDataGetter: vi.fn(() => ({
                id: 1,
                name: "name",
                created_at: "2023-11-15",
            })),
        };

        store = new Vuex.Store({
            modules: {
                module: {
                    actions,
                    getters,
                },
            },
        });
    });

    describe("submitForm()", () => {
        it("should call the submitForm function and dispatch editAuthor to edit author", async () => {
            const wrapper = shallowMount(EditAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");
            await wrapper.setData({
                name: "changed name",
            });

            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("editAuthor", {
                id: 1,
                name: "changed name",
                created_at: "2023-11-15",
                updated_at: new Date().toLocaleString("lt-LT").slice(0, 11),
            });
        });

        it("should not call dispatch actions because of error", async () => {
            const wrapper = shallowMount(EditAuthorForm, {
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
            const wrapper = shallowMount(EditAuthorForm, {
                store,
                localVue,
                data() {
                    return {
                        name: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");
            await wrapper.setData({
                name: "changed name",
            });

            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("closeModalAction");
        });
    });

    describe("if condition", () => {
        it("should render the 'errors' ul element if name field is empty.", async () => {
            const wrapper = shallowMount(EditAuthorForm, {
                store,
                localVue,
            });

            await wrapper.setData({
                name: "",
            });
            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });

        it("should render the 'errors' ul element if the name exceed 50 characters.  .", async () => {
            const wrapper = shallowMount(EditAuthorForm, {
                store,
                localVue,
            });

            await wrapper.setData({
                name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis.",
            });
            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });
    });

    describe("h1 element", () => {
        it("renders initialName correctly in the h1 element", () => {
            const wrapper = shallowMount(EditAuthorForm, {
                store,
                localVue,
            });

            const h1Element = wrapper.find("h1.title");

            expect(h1Element.text()).toBe(
                `Edit "${getters.modalDataGetter().name}" author`
            );
        });
    });
});
