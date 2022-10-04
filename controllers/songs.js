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

function deleteSong(req, res) {
  Song.findByIdAndDelete(req.params.id)
  .then(song => {
    console.log(song)
    res.redirect('/profiles')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/profiles')
  })
}

export {
  newSong as new,
  create,
  deleteSong as delete,
}