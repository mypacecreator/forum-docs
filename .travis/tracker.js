const axios = require('axios')
const fs = require('fs')
const turndown = require('turndown')
const turndownService = new turndown({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*'
})

axios
  .get('https://wordpress.org/support/wp-json/wp/v2/pages?per_page=100')
  .then(res => {
    for (const item of res.data) {
      if (item.slug === 'guidelines' || item.slug === 'welcome') {
        const content = item.content.rendered
        let markdown = turndownService.turndown(content)
        markdown = `Last modified: ${item.modified_gmt}\n\n${markdown}`
        fs.writeFile(`original/${item.slug}.md`, markdown, err => {
          if (err) throw err
        })
      }
    }
  })
