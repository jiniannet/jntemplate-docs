module.exports = {
    title: 'jntemplate',
    description: 'JNTemplate Documentation',
    themeConfig: {
        sidebar: [
            {
                title: "Getting Started",
                children: [{
                    title: "Installation",
                    path: "/started/install.md"
                }, {
                    title: "Quick Start",
                    path: "/started/quickstart.md"
                }, {
                    title: "Hello World",
                    path: "/started/hello.md"
                }],
            },
            {
                title: "Tag & Syntax",
                children: [{
                    title: "Overview",
                    path: "/tags/tag.md"
                }, {
                    title: "Basis Tags",
                    path: "/tags/basistag.md"
                }, {
                    title: "Complex Tags",
                    path: "/tags/complextag.md"
                }],
            },
            {
                title: "Customization",
                children: [{
                    title: "Configuration",
                    path: "/customization/configuration.md"
                }],
            },
            {
                title: "Guide",
                children: [{
                    title: "Change Log",
                    path: "/guide/changelog.md"
                }, {
                    title: "License",
                    path: "/guide/license.md"
                }, {
                    title: "Contributing",
                    path: "/guide/contributors.md"
                }],
            }
        ]
    }
}