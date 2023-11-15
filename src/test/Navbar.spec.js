import { shallowMount } from "@vue/test-utils";
import { describe } from "vitest";
import Navbar from "../components/Navbar.vue";

describe("Navbar component", () => {
    describe("toggleNav()", () => {
        it("should toggles the isNavOpen data property to true when the button is clicked, changing it from false.", async () => {
            const wrapper = shallowMount(Navbar, {
                data() {
                    return {
                        isNavOpen: false,
                    };
                },
            });

            await wrapper.find(".navbar-burger").trigger("click");

            expect(wrapper.vm.isNavOpen).toBe(true);
        });

        it("should toggles the isNavOpen data property to false when the button is clicked, changing it from true.", async () => {
            const wrapper = shallowMount(Navbar, {
                data() {
                    return {
                        isNavOpen: true,
                    };
                },
            });

            await wrapper.find(".navbar-burger").trigger("click");

            expect(wrapper.vm.isNavOpen).toBe(false);
        });
    });

    describe("Navigation links", () => {
        it("should renders correct navigation links", () => {
            const wrapper = shallowMount(Navbar);

            const links = wrapper.findAll(".navbar-menu .navbar-item");

            expect(links.at(0).text()).toBe("Home");
            expect(links.at(1).text()).toBe("Authors");
        });
    });
});
