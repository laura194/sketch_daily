import { useEffect, useState } from "react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";


const UNSPLASH_ACCESS_KEY = "Sm8J18awIUbZaLc97PS1WrKXtEvRqKtsvACb1qq0dlg";

export default function UnsplashDaily() {
  const [images, setImages] = useState([]);
  const today = new Date().toDateString();

  useEffect(() => {
    const storedData = localStorage.getItem("unsplash_images");
    const storedDate = localStorage.getItem("unsplash_date");

    if (storedData && storedDate === today) {
      setImages(JSON.parse(storedData));
    } else {
      fetchImages();
    }
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=3&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      setImages(data);
      localStorage.setItem("unsplash_images", JSON.stringify(data));
      localStorage.setItem("unsplash_date", today);
    } catch (error) {
      console.error("Fehler beim Laden der Bilder:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">daily references</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent>
              <img
                src={image.urls.regular}
                alt={image.alt_description || "Unsplash Image"}
                className="w-20 h-20 max-w-xs h-auto object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        ))} 
      </div>
    </div>
  );
}
