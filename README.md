<h1>Install</h1>
<h2>First try: https://cheesyphoenix.tk</h2>
</br>
</br>
<h2>with docker:</h2>
  <h3>run:</h3> 
    <pre><code>docker run -d --env DATA_PATH=/src/data/MenuSites.json --mount type=volume,src=testVolume,target=/src/data -p 8080:8080 --restart always cheesyphoenix/websiteapi:2.1</code></pre>
</br>
</br>
<h2>with node:</h2>
  <h3>clone repo:</h3> https://github.com/CheesyPhoenix/api </br>
  <h3>run:</h3> <pre><code>node .</code></pre>
</br>
</br>
<h2>Then:</h2>
<h3>clone this repo</h3>

<h3>and launch website normally (index.html)</h3>
