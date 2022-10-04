import { Song } from "../models/song.js";
import { Profile } from "../models/profile.js";

function newSong(req, res) {
  Song.find({})
  .then(songs => {
    res.render('songs/new', {
      title: 'Add Song',
      songs,
      albumId: req.params.albumId
    })
  })
}

function create(req, res) {
  req.body.addedBy = req.params.id
  Song.create(req.body)
  .then(song => {
    res.redirect(`/profiles/${req.params.id}/albums/${req.params.albumId}`)
  })
}

function deleteSong(req, res) {
  Song.findByIdAndDelete(req.params.songId)
  .then(song => {
    console.log(song)
    res.redirect(`/profiles/${req.user.profile._id}/albums/${req.params.albumId}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  newSong as new,
  create,
  deleteSong as delete,
}