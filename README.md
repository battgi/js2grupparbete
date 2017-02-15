<!DOCTYPE html>
<html>
<head>
	<title>API demo, dagens längd</title>
	<script>
		window.addEventListener('load', function() {
			let button = document.getElementById('btnSend');
			button.addEventListener('click', function() {
				// DOM-element som vi kommer att behöva
				let svar = document.getElementById('svar');
				let lat = document.getElementById('lat').value;
				let lng = document.getElementById('lng').value;
				let datum = document.getElementById('inputDate').value;
				
				// Skapa URL med querystring
				let url = 'http://api.sunrise-sunset.org/json?';
                url += "lat=" + lat;
                url += "&lng=" lng;
                url += "&date" + datum;
                console.log(url);
            
				
				// Gör en AJAX request och visa resultatet
				let ajax = new XMLHttpRequest();// TODO
                ajax.open("get", url);
                ajax.onreadystatechange = function(){
                    if(ajax.status == 200 && readyState == 4){
                    console.log(this.responseText)
                    }
                }
			});
		});
	</script>
	<style>
		div {
			border: 1px solid gray;
			border-radius: 4px;
			margin: 8px 2px 8px 2px;
		}
		.info {
			background-color: azure;
			padding: 10px;
		}
		#svar {
			padding: 10px;
			background-color: cornsilk;
		}
		input[type="date"] { width: 140px; }
		input[type="number"] { width: 141px; }
		button {
			width: 145px;
			border-radius: 2px;
			padding: 4px;
		}
		input, button { margin: 2px; }
	</style>
</head>
<body>
	<h2>Hur lång är dagen?</h2>
	<input type="date" id="inputDate" value="2017-02-14" title="Datum" /> <br>
	<input type="number" id="lat" value="57.68423627" placeholder="Latitud" title="Latitud" />
	<input type="number" id="lng" value="11.99915854" placeholder="Longitud" title="Longitud" /><br>
	<button id="btnSend">Fråga API</button>
	<div>Koordinater för EC Elisedal: <br>
	Latitude	57.68423627<br>
	Longitude	11.99915854
	</div>
	<div id="svar">Inget svar</div>
	<p></p>
	
	<div class="info">
		<h3>API documentation</h3>
		<p>Ours is a very simple REST api, you only have to do a GET request to http://api.sunrise-sunset.org/json.</p>

		<strong>Parameters</strong>
		<ul>
		<li><strong>lat</strong>: Latitude in decimal degrees. Required.</li>
		<li><strong>lng</strong>: Longitude in decimal degrees. Required.</li>
		<li><strong>date</strong>: Date in YYYY-MM-DD format. Also accepts other date formats and even relative date formats. If not present, date defaults to current date. Optional.</li>
		<li><strong>callback</strong>: Callback function name for JSONP response. Optional.</li>
		<li><strong>formatted</strong>: 0 or 1 (1 is default). Time values in response will be expressed following ISO 8601 and day_length will be expressed in seconds. Optional.</li>
		</ul>

		<h3>Sample requests</h3>
		<p>These are three sample requests for getting sunset and sunrise information from our API for a given location:</p>
		<pre>
http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400

http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today

http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2017-02-13

http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0
</pre>
		<p>Applikationen använder sig av <em>Sunset and sunrise times API</em>, <a href="http://sunrise-sunset.org/api">http://sunrise-sunset.org/api</a></p>
	</div>
</body>
</html>