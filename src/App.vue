<template>

    <main-layout></main-layout>
    <!-- <the-header></the-header> -->
    <!-- <router-view></router-view> -->
</template>

<script>

    // import TheHeader from "./components/layout/TheHeader.vue";
    import MainLayout from "./components/layout/MainLayout.vue";

    export default {
        components: {
            MainLayout,
        },

        computed: {
            didAutoLogout() {
                return this.$store.getters.didAutoLogout;
            }
        },


        created() {
            this.$store.dispatch('tryLogin');
        },

        watch: {
            didAutoLogout(curValue, oldValue) {
                if (curValue && curValue !== oldValue) {
                    this.$router.replace('/projects');
                }
            }
        }
    };

</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

    * {
        box-sizing: border-box;
    }

    html {
        font-family: "Roboto", sans-serif;
    }

    body {
        margin: 0;
    }
</style>