const knex = require("../database/knex");

class MovieNotesController{
  async create(req,res) {
    const { title, description, rating, tags } = req.body;
    const { user_id } = req.params;

    if(rating < 1 || rating > 5) {
      throw new AppError("Informe uma nota entre 1 e 5");
    }

    const note_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("movie_tags").insert(tagsInsert);

    res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const note = await knex("movie_notes").where({ id }).first();

    return res.json(note);
  }
}

module.exports = MovieNotesController;