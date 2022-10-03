import { Profile } from "../models/profile.js";
import { Song } from "../models/song.js";

function newSong(req, res) {
  Song.find({})
  .then(songs => {
    res.render('songs/new', {
      title: 'Add Song',
      songs,
    })
  })
}

function create(req, res) {
  Song.create(req.body)
  .then(song => {
    res.redirect('/songs/new')
  })
}

export {
  newSong as new,
  create,
}