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

export {
  newSong as new,
}