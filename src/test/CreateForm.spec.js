import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, vi } from "vitest";
import Vuex from "vuex";
import CreateForm from "../components/forms/CreateForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CreateForm component", () => {
    let store;
    let actions;
    let getters;

    beforeEach(() => {
        actions = {
            postNewArticle: vi.fn(),
            closeModalAction: vi.fn(),
        };
        getters = {
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
        it("should call the submitForm function and dispatch postNewArticle to post new article", async () => {
            const wrapper = shallowMount(CreateForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        author: "",
                        content: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");
            await wrapper.setData({
                title: "title",
                author: 1,
                content: "content",
            });

            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith(
                "postNewArticle",
                expect.objectContaining({
                    authorId: 1,
                    body: "content",
                    created_at: new Date().toLocaleString("lt-LT").slice(0, 11),
                    title: "title",
                    updated_at: new Date().toLocaleString("lt-LT").slice(0, 11),
                    author: {
                        created_at: "2023-05-31",
                        id: 1,
                        name: "Oliver",
                        updated_at: "2023-05-31",
                    },
                })
            );
        });

        it("should not call dispatch actions because of error", async () => {
            const wrapper = shallowMount(CreateForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        author: "",
                        content: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.submitForm();

            expect(dispatchSpy).not.toHaveBeenCalled();
        });

        it("should call the submitForm function and dispatch closeModalAction to close the modal", async () => {
            const wrapper = shallowMount(CreateForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        author: "",
                        content: "",
                    };
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");
            await wrapper.setData({
                title: "title",
                author: 1,
                content: "content",
            });

            await wrapper.vm.submitForm();

            expect(dispatchSpy).toHaveBeenCalledWith("closeModalAction");
        });
    });

    describe("if condition", () => {
        it("should render the 'errors' ul element if any author is not selected or if the title or author field is empty.", async () => {
            const wrapper = shallowMount(CreateForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "",
                        author: "",
                        content: "",
                        errors: [],
                    };
                },
            });

            await wrapper.vm.submitForm();
            const ul = wrapper.find("ul");

            expect(ul.exists()).toBe(true);
        });

        it("should render the 'errors' ul element if the title exceed 50 characters.  .", async () => {
            const wrapper = shallowMount(CreateForm, {
                store,
                localVue,
                data() {
                    return {
                        title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, dolores.",
                        author: "author",
                        content: "content",
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
