const apiURL = 'http://localhost:5000/api/movies';

document.getElementById('movieForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const customId = document.getElementById('customId').value.trim();
  const title = document.getElementById('title').value.trim();
  const director = document.getElementById('director').value.trim();
  const releaseYear = parseInt(document.getElementById('releaseYear').value);
  const genre = document.getElementById('genre').value.trim();

  const movie = {
    _id: customId !== '' ? customId : title.toLowerCase().replace(/\s+/g, '') + Date.now(),
    title,
    director,
    releaseYear,
    genre
  };

  try {
    const res = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (res.ok) {
      loadMovies();
      e.target.reset();
    } else {
      alert('Failed to add movie');
    }
  } catch (err) {
    console.error('Error adding movie:', err);
    alert('Failed to add movie - network/server issue');
  }
});

async function loadMovies() {
  try {
    const res = await fetch(apiURL);
    const movies = await res.json();

    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';

    movies.forEach((movie) => {
      const div = document.createElement('div');
      div.className = 'movie-card';
      div.innerHTML = `
        <strong>${movie.title}</strong><br/>
        🎬 Director: ${movie.director}<br/>
        📅 Year: ${movie.releaseYear}<br/>
        🎭 Genre: ${movie.genre}<br/>
        <button onclick="deleteMovie('${movie._id}')">Delete</button>
        <button onclick="editMovie('${movie._id}', '${movie.title}', '${movie.director}', '${movie.releaseYear}', '${movie.genre}')">Edit</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading movies:', err);
    alert('Failed to load movies');
  }
}

async function deleteMovie(id) {
  try {
    const res = await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadMovies();
    } else {
      alert('Failed to delete');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Failed to delete - network/server issue');
  }
}

async function getMovieById() {
  const movieId = document.getElementById('movieIdInput').value;
  const resultDiv = document.getElementById('movieResult');
  resultDiv.innerHTML = '';

  try {
    const res = await fetch(`${apiURL}/${movieId}`);
    if (!res.ok) throw new Error('Movie not found');

    const movie = await res.json();
    resultDiv.innerHTML = `
      <strong>${movie.title}</strong><br/>
      🎬 Director: ${movie.director}<br/>
      📅 Year: ${movie.releaseYear}<br/>
      🎭 Genre: ${movie.genre}
    `;
  } catch (err) {
    resultDiv.innerHTML = `<span style="color:red;">${err.message}</span>`;
  }
}

async function deleteMovieById() {
  const id = document.getElementById('deleteMovieIdInput').value;
  const resultDiv = document.getElementById('deleteResult');
  resultDiv.innerHTML = '';

  if (!id) {
    resultDiv.innerHTML = '<span style="color:red;">Please enter a movie ID</span>';
    return;
  }

  try {
    const res = await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      resultDiv.innerHTML = `<span style="color:green;">✅ Movie deleted successfully!</span>`;
      loadMovies(); // Refresh list
    } else {
      const errorData = await res.json();
      resultDiv.innerHTML = `<span style="color:red;">❌ Failed: ${errorData.message || 'Error deleting movie'}</span>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<span style="color:red;">❌ Error: ${error.message}</span>`;
  }
}


function editMovie(id, title, director, releaseYear, genre) {
  document.getElementById('customId').value = id;
  document.getElementById('title').value = title;
  document.getElementById('director').value = director;
  document.getElementById('releaseYear').value = releaseYear;
  document.getElementById('genre').value = genre;

  const form = document.getElementById('movieForm');
  form.removeEventListener('submit', submitHandler);

  form.onsubmit = async function (e) {
    e.preventDefault();
    const updated = {
      title: document.getElementById('title').value.trim(),
      director: document.getElementById('director').value.trim(),
      releaseYear: parseInt(document.getElementById('releaseYear').value),
      genre: document.getElementById('genre').value.trim(),
    };

    try {
      const res = await fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        loadMovies();
        form.reset();
        form.onsubmit = submitHandler;
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Update failed - network/server issue');
    }
  };
}

const submitHandler = document.getElementById('movieForm').onsubmit;
loadMovies();
