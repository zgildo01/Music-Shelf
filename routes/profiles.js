import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profilesCtrl.index)
router.get('/:id', profilesCtrl.show)
router.get('/:id/albums/new', isLoggedIn, profilesCtrl.addAlbum)
router.get('/:profileId/albums/:albumsId', profilesCtrl.showAlbum)
router.get('/:profileId/albums/:albumsId/edit', isLoggedIn, profilesCtrl.editAlbum)
router.post('/:id/albums', isLoggedIn, profilesCtrl.createAlbum)
router.delete('/albums/:id', isLoggedIn, profilesCtrl.deleteAlbum)
router.put('/:profileId/albums/:albumsId', isLoggedIn, profilesCtrl.updateAlbum)
router.post('/:profileId/albums/:albumsId/songs', isLoggedIn, profilesCtrl.addToSongs)


export {
  router
}