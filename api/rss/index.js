const RSS = require('rss')
const util = require('../../plugins/feed')

module.exports = async (req, res) => {
  try {
    const feedBase = await util.rawRss()
    const eps = await util.feed()
    const feed = new RSS({
      title: feedBase.title,
      description: 'description',
      feed_url: 'https://indiemakers.fr/rss.xml',
      site_url: 'https://indiemakers.fr',
      image_url: feedBase.image_url,
      managingEditor: 'Martin Donadieu et Anthonin Archer',
      webMaster: 'Martin Donadieu',
      copyright: 'INDIE MAKERS',
      language: 'fr',
      categories: ['podcast', 'entrepreneur', 'makers', 'independants'],
      pubDate: feedBase.pubDate,
      ttl: feedBase.ttl
    })

    eps.forEach((element) => {
      feed.item({
        title: element.title,
        description: element.content,
        url: `https://indiemakers.fr/episode/${element.id}`,
        guid: element.guid_fix,
        author: `Martin Donadieu and ${element.title}`,
        date: element.pubDate,
        enclosure: {
          url: element.image_big,
          type: 'image/jpeg'
        }
      })
    })
    const xml = feed.xml()
    return res.send(xml)
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
