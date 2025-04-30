// utils/generate-menu.js
import fs from 'fs'
import path from 'path'

const pagesDir = path.join(__dirname,'..', 'pages')

function getRouteFiles () {
  return fs.readdirSync(pagesDir).filter(file => {
    return file !== '.DS_Store' && fs.lstatSync(path.join(pagesDir, file)).isDirectory()
  })
}

export function generateMenu () {
  const menuItems = []
  const pages = getRouteFiles()

  pages.forEach(pageDir => {
    const pagePath = '/' + pageDir
    const pageComponent = `pages/${pageDir}/index.vue`

    if (fs.existsSync(path.join(pagesDir, pageDir, 'index.vue'))) {
      menuItems.push({
                       name: pageDir,
                       path: pagePath,
                       component: pageComponent,
                       children: []
                     })
    }
  })

  return menuItems
}