from fastapi import FastAPI, Query
from typing import Annotated
from pydantic import BaseModel
from chefkoch.retrievers import RandomRetriever
from chefkoch.retrievers import SearchRetriever
from chefkoch.recipe import Recipe

app = FastAPI(title="Recipe API", description="HTTP server to interact with chefkoch api")

class RecipeResponse(BaseModel):
    title: str
    ingredients: list[str]
    
class RecipeRequest(BaseModel):
    ingredients: list[str]
    limit: int = 10
    
class RandomRecipeRequest(BaseModel):
    limit: int = 10
    
def getRecipeResponse(recipes: list[Recipe], limit=10):
    return [RecipeResponse(title=r.title, ingredients=r.ingredients) for r in recipes][:limit]
    
@app.post("/recipes")
def get_recipes(req: RecipeRequest):
    retriever = SearchRetriever()
    recipes = retriever.get_recipes(search_query=", ".join(req.ingredients))[:req.limit]
    
    return getRecipeResponse(recipes, req.limit)

@app.post("/random_recipes")
def get_random_recipes(req: RandomRecipeRequest):
    retriever = RandomRetriever()
    recipes = retriever.get_recipes(n=req.limit)
    return getRecipeResponse(recipes, req.limit)
    

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=5001)