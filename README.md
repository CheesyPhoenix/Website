<h1>Install</h1>

with docker: </br>
  <h3>run:</h3> docker run -d --env DATA_PATH=/src/data/MenuSites.json --mount type=volume,src=testVolume,target=/src/data -p 8080:8080 cheesyphoenix/websiteapi:2.0
 
<h3>with node:</h3> </br>
  <h3>clone repo:</h3> https://github.com/CheesyPhoenix/api </br>
  <h3>run:</h3> node .
  