import { useState, useEffect } from "react";

function CatCard( {cat, onFavorite} ) {
  return (
    <div className="cat-card">
      <img src={cat.url} alt="Gato bonito" className="cat-image" />
      <button onClick={() => onFavorite(cat)}>Favorito 🐈</button>
    </div>
  );
}

export default CatCard;