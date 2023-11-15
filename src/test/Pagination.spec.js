import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, expect, vi } from "vitest";
import Pagination from "../components/Pagination.vue";

const localVue = createLocalVue();

describe("Pagination component", () => {
    describe("totalPages()", () => {
        it("should calculate total pages.", async () => {
            const wrapper = shallowMount(Pagination, {
                localVue,
                propsData: {
                    pageSize: 3,
                    totalArticlesNumber: 10,
                },
            });

            expect(wrapper.vm.totalPages).toBe(4);
        });
    });

    describe("pages()", () => {
        it("should generate the correct page array when the currentPage is at the start.", () => {
            const wrapper = shallowMount(Pagination, {
                localVue,
                propsData: {
                    pageSize: 3,
                    totalArticlesNumber: 22,
                    currentPage: 1,
                },
            });

            expect(wrapper.vm.pages).toEqual([1, 2, 3, "...", 8]);
        });

        it("should return the correct pages array when the current page is the last.", () => {
            const wrapper = shallowMount(Pagination, {
                localVue,
                propsData: {
                    pageSize: 3,
                    totalArticlesNumber: 22,
                    currentPage: 8,
                },
            });

            expect(wrapper.vm.pages).toEqual([1, "...", 6, 7, 8]);
        });

        it("should generate correct page array when totalPages is small", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    currentPage: 2,
                    pageSize: 10,
                    totalArticlesNumber: 20,
                },
            });

            expect(wrapper.vm.pages).toEqual([1, 2]);
        });
    });

    describe("pageUpdate()", () => {
        it("should not emit pageUpdate event when pageNumber is greater than total pages number", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    pageSize: 3,
                    totalArticlesNumber: 9,
                },
            });

            wrapper.vm.pageUpdate(4);

            expect(wrapper.emitted().pageUpdate).toBeUndefined();
        });

        it("should not emit pageUpdate event when pageNumber is 0", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    pageSize: 3,
                    totalArticlesNumber: 9,
                },
            });

            wrapper.vm.pageUpdate(0);

            expect(wrapper.emitted().pageUpdate).toBeUndefined();
        });

        it("should emit the pageUpdate event when the pageNumber is not equal to 0 and not greater than the total number of pages.", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    pageSize: 3,
                    totalArticlesNumber: 9,
                },
            });

            wrapper.vm.pageUpdate(2);

            expect(wrapper.emitted().pageUpdate).toBeDefined();
        });
    });

    describe("disablePreviousLink()", () => {
        it("should return true if totalArticlesNumber is equal to 0", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    totalArticlesNumber: 0,
                },
            });

            const result = wrapper.vm.disablePreviousLink();

            expect(result).toBe(true);
        });

        it("should return true if currentPage is equal to 1", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    currentPage: 1,
                    totalArticlesNumber: 9,
                },
            });

            const result = wrapper.vm.disablePreviousLink();

            expect(result).toBe(true);
        });
    });

    describe("disableNextLink()", () => {
        it("should return true if totalArticlesNumber is equal to 0", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    totalArticlesNumber: 0,
                },
            });

            const result = wrapper.vm.disableNextLink();

            expect(result).toBe(true);
        });

        it("should return true if currentPage is equal to total pages number", () => {
            const wrapper = shallowMount(Pagination, {
                propsData: {
                    currentPage: 2,
                    totalArticlesNumber: 10,
                    pageSize: 5,
                },
            });

            const result = wrapper.vm.disableNextLink();

            expect(result).toBe(true);
        });
    });

    describe("goToLink()", () => {
        it("should emit pageUpdate with the correct value when a valid link is clicked", () => {
            const wrapper = shallowMount(Pagination);
            const linkValue = 3;
            const eventValue = {
                target: {
                    getAttribute: vi.fn().mockReturnValue(linkValue),
                },
            };

            wrapper.vm.goToLink(eventValue);

            expect(wrapper.emitted().pageUpdate).toBeTruthy();
            expect(wrapper.emitted().pageUpdate[0]).toEqual([linkValue]);
        });

        it("should not emit pageUpdate when '...' link is clicked", () => {
            const wrapper = shallowMount(Pagination);
            const eventValue = {
                target: {
                    getAttribute: vi.fn().mockReturnValue("..."),
                },
            };

            wrapper.vm.goToLink(eventValue);

            expect(wrapper.emitted().pageUpdate).toBeFalsy();
        });
    });
});
