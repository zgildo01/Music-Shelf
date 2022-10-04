import mongoose from 'mongoose'

const Schema = mongoose.Schema

const songSchema = new Schema({
  songName: String,
  trackNo: Number,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const Song = mongoose.model('Song', songSchema)

export {
  Song
}