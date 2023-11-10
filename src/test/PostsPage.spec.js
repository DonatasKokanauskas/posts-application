import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostsPage from "../views/PostsPage.vue";
import Article from "../components/Article.vue";
import ArticleSearch from "../components/ArticleSearch.vue";
import Pagination from "../components/Pagination.vue";
import articlesModule from "../store/modules/articlesModule";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockData = [
    {
        id: 1,
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    let state;
    let mutations;
    let actions;
    let getters;

    beforeEach(() => {
        state = {
            articlesData: null,
        };
        mutations = {
            setArticlesData: vi.fn((state, data) => {
                state.articlesData = data;
            }),
        };
        actions = {
            fetchArticlesData: vi.fn().mockResolvedValue(mockData),
            modalAction: vi.fn(),
        };
        getters = { allArticles: vi.fn() };

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

    it("dispatches fetchArticlesData action", async () => {
        const wrapper = mount(PostsPage, { store, localVue });

        await wrapper.vm.$nextTick();

        expect(actions.fetchArticlesData).toHaveBeenCalled();
    });

    it("renders 'ArticleSearch' component", () => {
        const wrapper = mount(PostsPage, { store, localVue });
        const articleSearchComponent = wrapper.findComponent(ArticleSearch);

        expect(articleSearchComponent.exists()).toBe(true);
    });

    it("renders 'Pagination' component", () => {
        const wrapper = mount(PostsPage, { store, localVue });
        const paginationComponent = wrapper.findComponent(Pagination);

        expect(paginationComponent.exists()).toBe(true);
    });
});
