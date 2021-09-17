<h1>Install</h1>

with docker:
  run: docker run -d --env DATA_PATH=/src/data/MenuSites.json --mount type=volume,src=testVolume,target=/src/data -p 8080:8080 cheesyphoenix/websiteapi:2.0
 
with node:
  clone repo
  run: node .
  
