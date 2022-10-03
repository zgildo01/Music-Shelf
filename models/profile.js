import mongoose from 'mongoose'

const Schema = mongoose.Schema

const albumSchema = new Schema({
  albumName: String,
  artistName: String,
  releaseDate: Date,
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }],
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  albums: [albumSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
