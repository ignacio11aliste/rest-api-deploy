const z = require('zod')

// creamos un schema para las movies
const moviesSchemas = z.object({
  title: z.string({
    invalid_type_error: 'Movies title must be a string',
    required_error: 'Movie title is requeried'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5.5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
      'Crime'
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be na array of enum Genre'
    }
  )
})

//  funcion para utilizar las validaciones del schemas
function validateMovie(object) {
  return moviesSchemas.safeParse(object)
}

function validatePârtialMovie(object) {
  return moviesSchemas.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePârtialMovie
}
