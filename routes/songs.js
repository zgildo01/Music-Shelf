import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as songsCtrl from '../controllers/songs.js'

const router = Router()

router.get('/new', songsCtrl.new)

export {
  router
}
