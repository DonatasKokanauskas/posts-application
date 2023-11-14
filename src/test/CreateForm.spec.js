// import { shallowMount, createLocalVue } from "@vue/test-utils";
// import { describe, vi } from "vitest";
// import Vuex from "vuex";
// import CreateForm from "../components/forms/CreateForm.vue";

// const localVue = createLocalVue();
// localVue.use(Vuex);

// describe("CreateForm component", () => {
//     let store;
//     let actions;

//     beforeEach(() => {
//         state = {
//             authorsData: "",
//         };
//         mutations = {
//             setAuthorsData: vi.fn((state, data) => {
//                 state.authorsData = data;
//             }),
//         };
//         actions = {
//             postNewArticle: vi.fn(),
//             closeModalAction: vi.fn(),
//         };
//         getters = {
//             allAuthors: vi.fn((state) => state.authorsData),
//         };

//         store = new Vuex.Store({
//             modules: {
//                 module: {
//                     state,
//                     mutations,
//                     actions,
//                     getters,
//                 },
//             },
//         });
//     });

//     describe("submitForm()", () => {
//         it("should call the submitForm function and dispatch postNewArticle to post new article", async () => {
//             const wrapper = shallowMount(CreateForm, {
//                 store,
//                 localVue,
//                 data() {
//                     return {
//                         title: "",
//                         author: "",
//                         content: "",
//                     };
//                 },
//             });
//             const dispatchSpy = vi.spyOn(store, "dispatch");

//             // store.commit("setAuthorsData", "text");
//             await wrapper.setData({ title: "title" });
//             await wrapper.vm.submitForm();

//             expect(dispatchSpy).toHaveBeenCalledWith("postNewArticle", {
//                 name: "name",
//                 created_at: new Date().toLocaleString("lt-LT").slice(0, 11),
//                 updated_at: new Date().toLocaleString("lt-LT").slice(0, 11),
//             });
//         });

//         // it("should not call dispatch actions because of error", async () => {
//         //     const wrapper = shallowMount(CreateAuthorForm, {
//         //         store,
//         //         localVue,
//         //         data() {
//         //             return {
//         //                 name: "",
//         //             };
//         //         },
//         //     });
//         //     const dispatchSpy = vi.spyOn(store, "dispatch");

//         //     await wrapper.vm.submitForm();

//         //     expect(dispatchSpy).not.toHaveBeenCalled();
//         // });

//         // it("should call the submitForm function and dispatch closeModalAction to close the modal", async () => {
//         //     const wrapper = shallowMount(CreateAuthorForm, {
//         //         store,
//         //         localVue,
//         //         data() {
//         //             return {
//         //                 name: "",
//         //             };
//         //         },
//         //     });
//         //     const dispatchSpy = vi.spyOn(store, "dispatch");

//         //     await wrapper.setData({ name: "name" });
//         //     await wrapper.vm.submitForm();

//         //     expect(dispatchSpy).toHaveBeenCalledWith("closeModalAction");
//         // });
//     });

//     // describe("if condition", () => {
//     //     it("should render the 'errors' ul element if the name field is empty .", async () => {
//     //         const wrapper = shallowMount(CreateAuthorForm, {
//     //             store,
//     //             localVue,
//     //             data() {
//     //                 return {
//     //                     name: "",
//     //                     errors: [],
//     //                 };
//     //             },
//     //         });

//     //         await wrapper.vm.submitForm();
//     //         const ul = wrapper.find("ul");

//     //         expect(ul.exists()).toBe(true);
//     //     });

//     //     it("should render the 'errors' ul element if the name exceed 50 characters.  .", async () => {
//     //         const wrapper = shallowMount(CreateAuthorForm, {
//     //             store,
//     //             localVue,
//     //             data() {
//     //                 return {
//     //                     name: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, dolores.",
//     //                     errors: [],
//     //                 };
//     //             },
//     //         });

//     //         await wrapper.vm.submitForm();
//     //         const ul = wrapper.find("ul");

//     //         expect(ul.exists()).toBe(true);
//     //     });
//     // });
// });
