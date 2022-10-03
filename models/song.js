import mongoose from 'mongoose'

const Schema = mongoose.Schema

const songSchema = new Schema({
  songName: String,
  trackNo: Number
})

const Song = mongoose.model('Song', songSchema)

export {
  Song
}
