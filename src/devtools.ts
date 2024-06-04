import { existsSync } from 'node:fs'
import type { Nuxt } from 'nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import { getRandomPort } from 'get-port-please'

// @ts-expect-error missing types
import { start } from 'chii'

const DEVTOOLS_UI_ROUTE = '/__chrome_devtools_module'
const DEVTOOLS_UI_LOCAL_PORT = 3300

export async function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  const clientPath = resolver.resolve('./client')
  const isProductionBuild = existsSync(clientPath)

  // Serve production-built client (used when package is published)
  if (isProductionBuild) {
    nuxt.hook('vite:serverCreated', async (server) => {
      const sirv = await import('sirv').then(r => r.default || r)
      server.middlewares.use(
        DEVTOOLS_UI_ROUTE,
        sirv(clientPath, { dev: true, single: true }),
      )
    })
  }
  // In local development, start a separate Nuxt Server and proxy to serve the client
  else {
    nuxt.hook('vite:extendConfig', (config) => {
      config.server = config.server || {}
      config.server.proxy = config.server.proxy || {}
      config.server.proxy[DEVTOOLS_UI_ROUTE] = {
        target: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}${DEVTOOLS_UI_ROUTE}`,
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(DEVTOOLS_UI_ROUTE, ''),
      }
    })
  }

  const availablePort = await getRandomPort()

  start({
    port: availablePort,
  })

  // Inject target script
  nuxt.options.app.head.script ||= []
  nuxt.options.app.head.script.push({
    src: `http://localhost:${availablePort}/target.js`,
  })

  nuxt.hook('vite:serverCreated', (server) => {
    server.middlewares.use('/__chrome_devtools', async (_req, res) => {
      try {
        const raw = await fetch(`http://localhost:${availablePort}/targets`)
        const data = await raw.json()
        if (data?.targets.length > 0) {
          const devToolsUrl = `http://localhost:${availablePort}/front_end/chii_app.html?ws=localhost:${availablePort}/client/xxxxx?target=${data.targets[0].id}&rtc=false`

          res.end(devToolsUrl)
        }
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })
  })

  nuxt.hook('devtools:customTabs', (tabs) => {
    tabs.push({
      // unique identifier
      name: 'chrome-devtools-embedded-nuxt',
      // title to display in the tab
      title: 'Chrome Devtools',
      // any icon from Iconify, or a URL to an image
      icon: 'ph:google-chrome-logo',
      // iframe view
      view: {
        type: 'iframe',
        src: DEVTOOLS_UI_ROUTE,
      },
    })
  })
}
