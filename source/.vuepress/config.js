import { defaultTheme } from '@vuepress/theme-default'
export default {
    title:'jntemplate',
    description: 'jntemplate is an  fast and lightweight html templating engine for C# .NET. text template engine.',
  theme: defaultTheme({
    //navbar
    sidebar: [
    {
                text: "Getting Started",
                children: [{
                    text: "Installation",
                    link: "/started/install.html"
                }, {
                    text: "Quick Start",
                    link: "/started/quickstart.html"
                }],
            },
            {
                text: "Syntax",
                children: [{
                    text: "Overview",
                    link: "/tags/tag.html"
                }, {
                    text: "Syntax",
                    link: "/tags/syntax.html"
                }],
            },
            {
                text: "Customization",
                children: [{
                    text: "Configuration",
                    link: "/customization/configuration.html"
                }],
            },
            {
                text: "Guide",
                children: [{
                    text: "Change Log",
                    link: "/guide/changelog.html"
                }, {
                    text: "License",
                    link: "/guide/license.html"
                }, {
                    text: "Contributing",
                    link: "/guide/contributors.html"
                }],
            }
    ],
  }),
}