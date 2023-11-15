import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import EditForm from "../components/forms/EditForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("EditForm component", () => {
    let store;
    let actions;
    let getters;

    beforeEach(() => {
        actions = {
            editArticle: vi.fn(),
            closeModalAction: vi.fn(),
        };
        getters = {
            specificArticle: vi.fn(() => ({
                id: 1,
                authorId: 1,
                title: "title",
                body: "content",
                created_at: "2023-11-15",
                updated_at: "2023-11-15",
            })),
            allAuthors: vi.fn(() => [
                {
                    id: 1,
                    name: "Oliver",
                    created_at: "2023-05-31",
                    updated_at: "2023-05-31",
                },
            ]),
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
        it("should call the submitForm function and dispatch editArticle to edit article", async () => {
            const wrapper = shallowMount(EditForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        content: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");
            await wrapper.setData({
                title: "changed title",
                content: "changed content",
            });

            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("editArticle", {
                authorId: 1,
                body: "changed content",
                id: 1,
                title: "changed title",
                created_at: "2023-11-15",
                updated_at: new Date().toLocaleString("lt-LT").slice(0, 11),
                author: {
                    created_at: "2023-05-31",
                    id: 1,
                    name: "Oliver",
                    updated_at: "2023-05-31",
                },
            });
        });

        it("should not call dispatch actions because of error", async () => {
            const wrapper = shallowMount(EditForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        content: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.submitForm();

            expect(dispatchSpy).not.toHaveBeenCalled();
        });

        it("should call the submitForm function and dispatch closeModalAction to close the modal", async () => {
            const wrapper = shallowMount(EditForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        content: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");
            await wrapper.setData({
                title: "changed title",
                content: "changed content",
            });

            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("closeModalAction");
        });
    });

    describe("if condition", () => {
        it("should render the 'errors' ul element if title or content field is empty.", async () => {
            const wrapper = shallowMount(EditForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        content: "",
                    };
                },
            });

            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });

        it("should render the 'errors' ul element if the title exceed 50 characters.  .", async () => {
            const wrapper = shallowMount(EditForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                    };
                },
            });

            await wrapper.setData({
                title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis.",
            });
            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });
    });

    describe("h1 element", () => {
        it("renders initialTitle correctly in the h1 element", () => {
            const wrapper = shallowMount(EditForm, {
                store,
                localVue,
                data() {
                    return {
                        initialTitle: "",
                    };
                },
            });

            const h1Element = wrapper.find("h1.title");

            expect(h1Element.text()).toBe(
                `Edit "${wrapper.vm.$data.initialTitle}" article`
            );
        });
    });
});
