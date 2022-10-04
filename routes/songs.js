import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as songsCtrl from '../controllers/songs.js'

const router = Router()

router.get('/new/:albumId', isLoggedIn, songsCtrl.new)
router.post('/:id/:albumId', isLoggedIn, songsCtrl.create)
router.delete('/:songId/:albumId', isLoggedIn, songsCtrl.delete)

export {
  router
}
