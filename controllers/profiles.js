import { Profile } from "../models/profile.js";

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
  .then(profile => {
    const embeddedAlbum = profile.albums.id(req.params.albumsId)
    res.render('albums/show', {
      title: 'Album Details',
      album: embeddedAlbum,
      profile,
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


export {
  index,
  show,
  addAlbum,
  createAlbum,
  deleteAlbum,
  showAlbum,
  editAlbum,
  updateAlbum
}