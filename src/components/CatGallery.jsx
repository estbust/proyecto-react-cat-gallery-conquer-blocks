import { useState, useEffect } from "react";
import CatCard from "./CatCard";

function CatGallery() {
  const [cats, setCats] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteCats");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.thecatapi.com/v1/images/search?limit=9")
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((error) => {
        console.error("Error fetching cat images:", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteCats", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (gatoSeleccionado) => {
    if (!favorites.some((gato) => gato.id === gatoSeleccionado.id)) {
      setFavorites([...favorites, gatoSeleccionado]);
    }
  };

  const handleRemoveFavorite = (gatoSeleccionado) => {
    setFavorites(favorites.filter((gato) => gato.id !== gatoSeleccionado.id));
  };

  const loadMoreCats = () => {
    setIsLoading(true);
    fetch("https://api.thecatapi.com/v1/images/search?limit=9")
      .then((response) => response.json())
      .then((data) => setCats((prevCats) => [...prevCats, ...data]))
      .catch((error) =>
        console.error("Error fetching more cat images:", error),
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="gallery-container">
      <h1>Galeria de gatos!!! 🐱</h1>
      <div className="favorites-container">
        <h2>Tus michis favoritos:</h2>
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-card">
            <img src={fav.url} alt="Gato favorito" className="favorite-image" />
            <button onClick={() => handleRemoveFavorite(fav)}>Eliminar</button>
          </div>
        ))}
      </div>
      <div className="gallery">
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} onFavorite={handleFavorite} />
        ))}
      </div>
      {isLoading && <p className="loading">Cargando gatos... ⏳</p>}
      {error && <p className="error">¡Miau! Hubo un error al cargar los michis. Por favor, intenta de nuevo más tarde.</p>}
      <button onClick={loadMoreCats} className="load-more-button" disabled={isLoading}>
        Ver más gatos 🐾
      </button>
    </div>
  );
}

export default CatGallery;