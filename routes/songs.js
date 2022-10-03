import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as songsCtrl from '../controllers/songs.js'

const router = Router()

router.get('/new', isLoggedIn, songsCtrl.new)
router.post('/', isLoggedIn, songsCtrl.create)

export {
  router
}
