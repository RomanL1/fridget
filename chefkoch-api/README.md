## building docker image
docker buildx create --name multi-chefkoch-api --use

docker buildx inspect --bootstrap

docker buildx build . \
  --platform linux/amd64,linux/arm64 \
  -t romanl1/fridget-chefkoch-api:latest \
  --push