import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Article from "../components/Article.vue";
import { describe } from "vitest";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Article component", () => {
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

    describe("navigateToDetailPage()", () => {
        it("should push to the correct path when navigateToDetailPage is called", async () => {
            const mockRouter = new VueRouter();
            const wrapper = shallowMount(Article, {
                localVue,
                mocks: {
                    $router: mockRouter,
                },
                propsData: {
                    id: 1,
                },
            });

            await wrapper.vm.navigateToDetailPage();

            expect(mockRouter.history.current.path).toBe("/postsDetailPage/1"); //
        });
    });

    describe("modal", () => {
        it("should call the showModal function and dispatch the modalAction function to show the modal and load the DeleteVerification component.", async () => {
            const wrapper = shallowMount(Article, {
                store,
                localVue,
                propsData: {
                    id: 1,
                    title: "title",
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.showModal();

            expect(dispatchSpy).toHaveBeenCalledWith("modalAction", {
                component: "DeleteVerification",
                isVisible: true,
                id: 1,
                title: "title",
                target: "article",
            });
        });

        it("should call the showEditFormModal function and dispatch the modalAction function to show the modal and load the EditForm component.", async () => {
            const wrapper = shallowMount(Article, {
                store,
                localVue,
                propsData: {
                    id: 1,
                    title: "title",
                },
            });
            const dispatchSpy = vi.spyOn(store, "dispatch");

            await wrapper.vm.showEditFormModal();

            expect(dispatchSpy).toHaveBeenCalledWith("modalAction", {
                component: "EditForm",
                isVisible: true,
                id: 1,
            });
        });
    });

    describe("showCreatedOrEditedDate()", () => {
        it("should display created date", async () => {
            const wrapper = shallowMount(Article, {
                store,
                localVue,
                propsData: {
                    createdDate: "2023-11-13",
                    updatedDate: "2023-11-13",
                },
            });

            const date = await wrapper.vm.showCreatedOrEditedDate(
                wrapper.vm.createdDate,
                wrapper.vm.updatedDate
            );

            expect(date).toBe("2023-11-13 ");
        });

        it("should display updated date", async () => {
            const wrapper = shallowMount(Article, {
                store,
                localVue,
                propsData: {
                    createdDate: "2023-11-13",
                    updatedDate: "2024-01-01",
                },
            });

            const date = await wrapper.vm.showCreatedOrEditedDate(
                wrapper.vm.createdDate,
                wrapper.vm.updatedDate
            );

            expect(date).toBe("2024-01-01 ");
        });
    });
});
