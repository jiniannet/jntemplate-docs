import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'JNTemplate Documentation',
  titleTemplate: ':title | JNTemplate',
  description: 'Documentation for JNTemplate, an open-source ASP.NET template engine',
  lang: 'en-US',
  lastUpdated: true,

  // Legacy files from the VuePress era / non-site content, excluded from the build
  srcExclude: ['**/SUMMARY.md', '**/_sidebar.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    siteTitle: 'JNTemplate',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/started/about', activeMatch: '^/started/' },
      { text: 'Tags & Syntax', link: '/tags/tag', activeMatch: '^/tags/' },
      { text: 'Customization', link: '/customization/configuration', activeMatch: '^/customization/' },
      { text: 'Guide', link: '/guide/changelog', activeMatch: '^/guide/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/started/about' },
          { text: 'Installation', link: '/started/install' },
          { text: 'Quick Start', link: '/started/quickstart' },
          { text: 'Template Compilation', link: '/started/compile' },
          { text: 'Hello World', link: '/started/hello' }
        ]
      },
      {
        text: 'Tags & Syntax',
        items: [
          { text: 'Tag Reference', link: '/tags/tag' },
          { text: 'Basic Tags', link: '/tags/basistag' },
          { text: 'Complex Tags', link: '/tags/complextag' }
        ]
      },
      {
        text: 'Customization',
        items: [
          { text: 'Configuration', link: '/customization/configuration' },
          { text: 'Custom Tags', link: '/customization/addtag' }
        ]
      },
      {
        text: 'Guide',
        items: [
          { text: 'Changelog', link: '/guide/changelog' },
          { text: 'License', link: '/guide/license' },
          { text: 'Contributors', link: '/guide/contributors' },
          { text: 'Links', link: '/guide/links' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    lastUpdated: {
      text: 'Last updated'
    },

    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiniannet/jntemplate' },
      { icon: 'nuget', link: 'https://www.nuget.org/packages/JinianNet.JNTemplate/' }
    ],

    footer: {
      message: 'Built with VitePress. Documentation content is licensed under the MIT License.',
      copyright: 'Copyright © jiniannet'
    },

    notFound: {
      title: 'Page Not Found',
      quote: 'Sorry, the page you are looking for does not exist.',
      linkText: 'Go to Home'
    }
  }
})
