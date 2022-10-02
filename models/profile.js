import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const albumSchema = new Schema({
  albumName: String,
  artistName: String,
  releaseDate: Date,
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }],
  comments: [commentSchema]
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  albums: [albumSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
