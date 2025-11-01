
const CURRENT_CATEGORIES = {
  categories: [
    "fruit", "vegetable", "dairy", "plant-based milk", "grain",
    "oil", "sauce", "condiment", "beverage", "snack", "sweet", "spice"
  ],
  productTypes: [
    "milk", "yogurt", "cheese", "banana", "tomato", "rice", "oil",
    "coconut milk", "tomato puree", "chocolate"
  ],
};

async function askOllama(product){

    // Preload OLLAMA curl http://localhost:11434/api/generate -d '{"model": "mistral"}'

    const body = {
        "model": "llama3.1:latest",
        "prompt": `
You are a food classification assistant.

### Goal
Given a product name, classify it into:
- "category" → a broad, high-level group (examples: fruit, vegetable, meat, seafood, dairy, plant-based milk, grain, oil, sauce, condiment, beverage, snack, sweet, spice, canned good)
- "productType" → the generic item used in cooking (e.g., milk, oil, tomato, rice, flour, sugar, yogurt, cheese)

### Rules
1. Respond with JSON.
2. Always prefer the **broader culinary class**, not the brand or variety.  
   - "almond milk" → category: "plant-based milk", productType: "milk"
   - "banana chips" → category: "snack", productType: "fruit"
   - "olive oil extra virgin" → category: "oil", productType: "oil"
   - "coconut milk" → category: "plant-based milk", productType: "milk"
   - "greek yogurt" → category: "dairy", productType: "yogurt"
   - "basmati rice" → category: "grain", productType: "rice"
3. Ignore brand names, sizes, certifications, or adjectives ("bio", "fairtrade", "1 kg", etc.).
4. Use German terms only.
5. If unclear, use null for both fields.
6. Keep results consistent — similar products should map to the same broader type.

### Input
Product: "${product}"
  `,
        "format": {
            "type": "object",
            "properties": {
                "category": {"type": "string"},
                "productType": {"type": "string"}
             },
        },
        "stream": false
    }
    
    const response = await fetch('http://localhost:11434/api/generate', {
        method: "POST",
        body: JSON.stringify(body)
    })

    const data = await response.json()

    console.log(data.response)
}

askOllama("Nutty Almond – alpro – 1 l")
askOllama("Max Havelar Bananas 500g")