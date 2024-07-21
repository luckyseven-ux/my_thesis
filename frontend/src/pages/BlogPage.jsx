import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    } else {
      // Verify token with the backend
      axios.get("http://localhost:3000/user/check-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      })
      .catch(error => {
        navigate("/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [navigate]);
  if (isLoading) {
    return <div>Loading...</div>;
  }


  const translateText = async (text, sourceLang = 'en', targetLang = 'id') => {
    const translateOptions = {
      method: 'POST',
      url: 'https://google-translator9.p.rapidapi.com/v2',
      headers: {
        'x-rapidapi-key': 'c1116a7479msh7a7c10e2f42b2e2p130a66jsnbc5d881fa83c',
        'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        q: text,
        source: 'en',
        target: 'id',
        format: 'text'
      }
    };

    try {
      const response = await axios.request(translateOptions);
      console.log('Translation response:', response.data);
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
        params: {
          tags: 'main course , Healthy',
          number: '1'
        },
        headers: {
          'x-rapidapi-key': 'c1116a7479msh7a7c10e2f42b2e2p130a66jsnbc5d881fa83c',
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log('Response from spoonacular:', response.data);
        const recipeData = response.data.recipes[0];

        // Translate title and instructions
        const translatedTitle = await translateText(recipeData.title);
        const translatedInstructions = await translateText(recipeData.instructions || "No instructions available.");

        // Translate ingredients
        const translatedIngredients = await Promise.all(
          recipeData.extendedIngredients.map(async (ingredient) => {
            const translatedIngredient = await translateText(ingredient.original);
            return { ...ingredient, original: translatedIngredient };
          })
        );

        setRecipe({
          ...recipeData,
          title: translatedTitle,
          instructions: translatedInstructions,
          extendedIngredients: translatedIngredients
        });
        setLoading(false);
      } catch (error) {
        console.error("Fetch recipe error:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: "url('./src/img/bg5.jpg')" }}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-600">Resep Acak</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => window.location.href = '/dashboard'}
          >
            Kembali ke Dashboard
          </button>
        </div>
        <div className="bg-green-300 bg-opacity-95 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-500">{recipe.title}</h2>
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="mb-4 w-full h-64 object-cover rounded-md"
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-500">Bahan-bahan</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-500">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={`${ingredient.id}-${index}`}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-500">Instruksi</h3>
              <div className="prose text-gray-500">
                {recipe.instructions ? (
                  <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                ) : (
                  <p>Tidak ada instruksi yang tersedia.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
