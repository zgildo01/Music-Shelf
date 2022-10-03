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

export {
  index,
  show,
  addAlbum,
  createAlbum,
}