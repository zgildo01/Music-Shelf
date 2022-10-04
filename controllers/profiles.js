import { Profile } from "../models/profile.js";
import { Song } from "../models/song.js";

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'Profiles'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: {
      path: 'commenter'
    }
  })
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      title: `${ profile.name }'s profile`,
      profile,
      isSelf,
      
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addAlbum(req, res) {
  Profile.find({})
  .then(profile => {
    res.render('albums/new', {
      title: "Add new album",
      profile,
    })
  })
}

function createAlbum(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.albums.push(req.body)
    profile.save()
    console.log(profile)
    res.redirect(`/profiles/${req.user.profile._id}/`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/')
  })
}

function deleteAlbum(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.albums.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function showAlbum(req, res) {
  Profile.findById(req.params.profileId)
  .populate('albums.songs')
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    const embeddedAlbum = profile.albums.id(req.params.albumsId)
    Song.find({_id: {$nin: profile.albums.songs}})
    .then(songs => {
      let myMusic = []
      songs.forEach(song => {
        if(song.addedBy.equals(req.user.profile._id)){
          myMusic.push(song)
        }
      })
      res.render('albums/show', {
        title: 'Album Details',
        album: embeddedAlbum,
        profile,
        isSelf,
        songs,
        myMusic,
      })
    })
  })
}


function editAlbum(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const embeddedAlbum = profile.albums.id(req.params.albumsId)
    res.render('albums/edit', {
      title: 'Edit Album',
      album: embeddedAlbum,
      profile,
    })
  })
}

function updateAlbum(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const embeddedAlbum = profile.albums.id(req.params.albumsId)
    embeddedAlbum.set(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.params.profileId}`)
    })
    .catch(err =>{
      console.log(err)
      res.redirect(`/profiles/${req.params.profileId}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.params.profileId}`)
  })
}

function addToSongs(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const embeddedAlbum = profile.albums.id(req.params.albumsId)
    embeddedAlbum.songs.push(req.body.songId)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.params.profileId}/albums/${req.params.albumsId}`)
    })
  })
}

function newComment(req, res) {
  req.body.commenter = req.user.profile._id
  Profile.findById(req.params.id)
  .then(profile => {
    profile.comments.push(req.body)
    profile.save()
    res.redirect(`/profiles/${profile._id}/`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/')
  })
}

export {
  index,
  show,
  addAlbum,
  createAlbum,
  deleteAlbum,
  showAlbum,
  editAlbum,
  updateAlbum,
  addToSongs,
  newComment,
}