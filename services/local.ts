import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import feed from '../api/feed'
import bot from '../api/bot'
import sitemap from '../api/sitemap'
import rss from '../api/rss'
import healthcheck from '../api'
import makershunt from '../api/makershunt'
import maker from '../api/maker'
import project from '../api/project'
import community from '../api/community'
import ep from '../api/ep'
import { morningBot } from './discord/bot/utils'

dotenv.config()
const app = express()
const appRouter = express.Router()

const morning = async (_req: Request, res: Response) => {
  console.error('bot')
  await morningBot()
  return res.status(200).end('Morning send')
}
app.use(express.json())
appRouter.get('/feed', feed)
appRouter.get('/sitemap.xml', sitemap)
appRouter.get('/rss.xml', rss)
appRouter.get('/makershunt', makershunt)
appRouter.get('/community', community)
appRouter.get('/maker', maker)
appRouter.get('/project', project)
appRouter.get('/ep', ep)
appRouter.post('/bot', bot)
appRouter.post('/morning', morning)
appRouter.get('/', healthcheck)

app.use('/', appRouter)

export default app
