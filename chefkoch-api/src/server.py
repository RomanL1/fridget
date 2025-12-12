from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import JSONResponse
from typing import Annotated
from pydantic import BaseModel
from chefkoch.retrievers import DailyRecipeRetriever
from chefkoch.retrievers import SearchRetriever
from chefkoch.recipe import Recipe
from traceback import print_exc

app = FastAPI(title="Recipe API", description="HTTP server to interact with chefkoch api")

class ERROR_CODES:
    SEARCH_NO_RESULTS = 2002
    SEARCH_FAILURE = 2003
    SEARCH_LIMIT_VALIDATION = 2004
    RANDOM_NO_RESULTS = 3002
    RANDOM_FAILURE = 3003
    RANDOM_LIMIT_VALIDATION = 3004
    

class RecipeResponse(BaseModel):
    title: str
    rating: float
    originURL: str
    ratingCount: int
    imageUrl: str
    
class RecipeRequest(BaseModel):
    ingredients: list[str]
    limit: int = 10
    
class ErrorResponse(BaseModel):
    error: str
    code: int
    status: int
    
class RandomRecipeRequest(BaseModel):
    limit: int = 10
    
def getErrorResponse(message: str, code: int, status_code: int) -> dict:
    return {"error": message, "code": code, "status": status_code}

    
def getRecipeResponse(recipes: list[Recipe]):
    return [RecipeResponse(title=r.title, rating=r.rating, originURL=r.url, ratingCount=r.number_ratings, imageUrl=r.image_url) for r in recipes]
    
@app.post("/recipes")
def get_recipes(req: RecipeRequest):
    
    if req.limit <= 0:
        raise HTTPException(
                status_code=422,
                detail=getErrorResponse(
                    message=f"limit has to be greater than 0",
                    code=ERROR_CODES.SEARCH_LIMIT_VALIDATION,
                    status_code=422
                )
            )
    
    try:
        retriever = SearchRetriever()
        recipes = retriever.get_recipes(search_query=", ".join(req.ingredients), limit=req.limit)
        
        if not recipes or len(recipes) <= 0:
            raise HTTPException(
                status_code=404,
                detail=getErrorResponse(
                    message=f"no recipes found",
                    code=ERROR_CODES.SEARCH_NO_RESULTS,
                    status_code=404
                )
            )
            
    
        return getRecipeResponse(recipes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=getErrorResponse(
                message=f"failed to retrieve recipe {str(e.stra)}",
                code=ERROR_CODES.SEARCH_FAILURE,
                status_code=500
        )
)

@app.post("/daily_recipes")
def get_random_recipes(req: RandomRecipeRequest):
    if req.limit <= 0:
        raise HTTPException(
                status_code=422,
                detail=getErrorResponse(
                    message=f"limit has to be greater than 0",
                    code=ERROR_CODES.RANDOM_LIMIT_VALIDATION,
                    status_code=422
                )
            )
    
    try: 
        retriever = DailyRecipeRetriever()
        recipes = retriever.get_recipes(type="kochen", limit=req.limit)
        if not recipes or len(recipes) <= 0:
            raise HTTPException(
                status_code=404,
                detail=getErrorResponse(
                    message=f"no random recipes found",
                    code=ERROR_CODES.RANDOM_NO_RESULTS,
                    status_code=404
                )
            )
        
        return getRecipeResponse(recipes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=getErrorResponse(
                message=f"failed to retrieve random recipes {str(e)}",
                code=ERROR_CODES.RANDOM_FAILURE,
                status_code=500
            )
        )
    

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=5002)