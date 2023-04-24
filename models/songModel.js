const mongoose = require("mongoose");
const Joi = require("joi");

const songsSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    singerOrBand: String,
    youtube_url: String,
    genere: String,
  },
  { timestamps: true }
);
exports.songModel = mongoose.model("songs",songsSchema);

exports.validateSong = (_reqBody) => {
    const joiSchema = Joi.object({
        title: Joi.string().min(2).max(35).required(),
        year: Joi.number().min(1950).max(2023).required(),
        singerOrBand: Joi.string().min(2).max(60).required(),
        youtube_url: Joi.string().min(2).max(250).required(),
        genere: Joi.string().min(2).max(50).required(),
    })
    return joiSchema.validate(_reqBody);
}