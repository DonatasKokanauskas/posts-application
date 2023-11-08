<template>
    <nav
        class="navbar is-light px-6"
        role="navigation"
        aria-label="main navigation"
        :class="{ 'is-active': isNavOpen }"
    >
        <div class="navbar-brand">
            <a
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                @click="toggleNav"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link to="/authors" class="navbar-item">
                    Authors
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isNavOpen: false,
        };
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
    },
};
</script>

<style>
@media screen and (max-width: 1023px) {
    .navbar-menu {
        display: none;
    }
    .navbar.is-active .navbar-menu {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        padding: 0;
    }
    .navbar.is-active .navbar-menu a {
        text-align: center;
    }
}
</style>
