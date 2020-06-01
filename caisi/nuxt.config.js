
export default {
    spa: "universal",
    /*
    ** Headers of the page
    */
    head: {
        title: "才士题库-祝您轻松通关",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: process.env.npm_package_description || "" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/cstk.png" }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: "#fff" },
    /*
    ** Global CSS
    */
    css: [
        "element-ui/lib/theme-chalk/index.css",
        "../static/css/common.css",
        "../static/css/animate.min.css"
    ],
    js: ["../static/test.js"],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: "~/plugins/ElementUI", ssr: true }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        "@nuxtjs/style-resources"
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        // publicPath: " /_ nuxt/",
        // publicPath: " /static/",
        // plugins: [
        //     new CopyWebpackPlugin([
        //         {
        //             from: "applicaion/static",
        //             to: "vendors/"
        //         }
        //     ])
        // ],
        extend (config, ctx) {
            // vendor: ["element-ui"]
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/,
                    options: {
                        fix: true
                    }
                })
            }
        }
    }
}
