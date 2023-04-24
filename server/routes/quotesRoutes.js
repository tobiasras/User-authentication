import { Router } from 'express'
import db from '../database/connection.js'
const route = Router()
route.get('/seasons', async (req, res) => {
  const data = await db.all('SELECT * FROM seasons')
  if (data) {
    res.send(data)
  } else {
    res.status(404).send({ message: 'no seasons in database' })
  }
})

route.get('/episodes/:season', async (req, res) => {
  if (req.params.season) {
    const data = await db.all('SELECT * FROM episodes WHERE season_id = ?;', [req.params.season])
    if (data.length !== 0) {
      res.send(data)
    } else {
      res.status(404)
      res.send({ message: `no episodes for season: ${req.params.season}` })
    }
  } else {
    res.status(400)
    res.send({ message: 'invalid request' })
  }
})

route.get('/quotes/seasons/:season/episodes/:episode', async (req, res) => {
  const season = Number.parseInt(req.params.season)
  const episode = Number.parseInt(req.params.episode)

  if (season && episode) {
    const data = await db.all('SELECT * FROM quotes WHERE (SELECT episode_id FROM seasons WHERE season = ?) = ?', [season, episode])
    if (data.length !== 0) {
      res.send(data)
    } else {
      res.status(404)
      res.send({ message: 'no quotes for given query' })
    }
  } else {
    res.status(400)
    res.send({ message: 'invalid request' })
  }
})

export default route
