<template>
    <nav
        class="navbar is-light px-6"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <a
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Home</router-link>
            </div>
        </div>
    </nav>
</template>
