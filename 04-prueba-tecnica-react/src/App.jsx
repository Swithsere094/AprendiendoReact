import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
// const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com/cat/says/hello";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/";

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  //Recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  //Recuperar la imagen cada vez que tenemos una cita
  useEffect(() => {
    if (!fact) return;

    const ThreeFirstWords = fact.split(" ", 3).join(" ");
    console.log(ThreeFirstWords);

    fetch(`https://cataas.com/cat/says/${ThreeFirstWords}?size=20&json=true`)
      .then((res) => res.json())
      .then((response) => {
        const url = response._id;
        setImageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h3>App de gatitos</h3>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
