<h1>Install</h1>
<h2>First try: http://cheesyphoenix.tk</h2>
</br>
</br>
<h2>with docker:</h2>
  <h3>run:</h3> 
    <pre><code>docker run -d --env DATA_PATH=/src/data/MenuSites.json --mount type=volume,src=testVolume,target=/src/data -p 8080:8080 --restart always cheesyphoenix/websiteapi:latest</code></pre>
</br>
</br>
<h2>Then:</h2>
<ul>
  <li><p>clone this repo</p></li>
  <li><p>then launch website normally (index.html), and click on MainAPI to switch to debug api</p></li>
</ul>



