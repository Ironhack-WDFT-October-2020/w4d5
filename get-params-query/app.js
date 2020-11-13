const express = require('express');
const app = express();
const movies = require('./movies.json');
const handlebars = require('hbs');
// console.log(movies);

app.use(express.static('public'));
handlebars.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('movies', { movies: movies })
});

app.get('/movies', (req, res) => {
    // res.send(req.query.q)
    const searchedMovies = movies.filter(movie => movie
        .title
        .toLowerCase()
        .includes(req.query.q.toLowerCase())
    );
    console.log(searchedMovies);
    res.render('movies', { moviesList: searchedMovies })
})

app.get('/movies/:title', (req, res) => {
    console.log(req.params.title)
    const movie = movies.find(movie => movie.title === req.params.title);
    console.log(movie);
    res.render('movieDetails', { clickedMovie: movie });
})

// app.get('/movies/:actor/:user', (req, res) => {
//     const actor = req.params.actor;
//     const user = req.params.user;
//     res.send(req.params);

// })



// app.get('/godfather', (req, res) => {
//     const godfather = movies.find(movie => movie.title === 'The Godfather');
//     console.log(godfather);
//     res.render('movieDetails', { clickedMovie: godfather });
// })

// app.get('/onemovie', (req, res) => {
//     res.render('onemovie')
// });

app.listen(3000);