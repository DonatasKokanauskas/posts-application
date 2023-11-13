import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostsPage from "../views/PostsPage.vue";
import Article from "../components/Article.vue";
import ArticleSearch from "../components/ArticleSearch.vue";
import Pagination from "../components/Pagination.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockData = [
    {
        id: 1,
        title: "title",
        body: "content",
        authorId: 3,
        created_at: "2023-05-31",
        updated_at: "2023-05-31",
        author: {
            id: 3,
            name: "Leo",
            created_at: "2023-05-31",
            updated_at: "2023-05-31",
        },
    },
];

describe("PostsPage component", () => {
    let store;
    let getters;

    beforeEach(() => {
        getters = { allArticles: vi.fn(() => mockData) };

        store = new Vuex.Store({
            modules: {
                articlesModule: {
                    getters,
                },
            },
        });
    });

    it("should dispatch the fetchArticlesData function", async () => {
        const wrapper = mount(PostsPage, { store, localVue });
        const dispatchSpy = vi.spyOn(store, "dispatch");

        await wrapper.vm.fetchArticlesData();

        expect(dispatchSpy).toHaveBeenCalledWith("fetchArticlesData");
    });

    it("should call the showModal function and dispatch the modalAction function to show the modal and load the CreateForm component.", async () => {
        const wrapper = mount(PostsPage, { store, localVue });
        const dispatchSpy = vi.spyOn(store, "dispatch");

        await wrapper.vm.showModal();

        expect(dispatchSpy).toHaveBeenCalledWith("modalAction", {
            component: "CreateForm",
            isVisible: true,
        });
    });

    it("should call the pageUpdate function and dispatch the updatePage function to update pagination's current page.", async () => {
        const wrapper = mount(PostsPage, { store, localVue });
        const dispatchSpy = vi.spyOn(store, "dispatch");

        await wrapper.vm.pageUpdate(1);

        expect(dispatchSpy).toHaveBeenCalledWith("updatePage", 1);
    });

    it("should render ArticleSearch component", () => {
        const wrapper = mount(PostsPage, { store, localVue });

        const articleSearchComponent = wrapper.findComponent(ArticleSearch);

        expect(articleSearchComponent.exists()).toBe(true);
    });

    it("should render Pagination component", () => {
        const wrapper = mount(PostsPage, { store, localVue });

        const paginationComponent = wrapper.findComponent(Pagination);

        expect(paginationComponent.exists()).toBe(true);
    });

    it("should render Article component", () => {
        const wrapper = mount(PostsPage, { store, localVue });

        const articleComponent = wrapper.findComponent(Article);

        expect(articleComponent.exists()).toBe(true);
    });
});
