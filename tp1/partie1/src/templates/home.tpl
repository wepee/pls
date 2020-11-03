<doctype html>
<html lang="fr">
	<head>
		<title>Mon premier serveur node.js</title>
		<meta charset="utf-8" />
	</head>
	<body>
		<h1>Hello {{ name }} !</h1>
		<p>Ceci est ma première page html</p>

		<form action = "message" method = "post">
			<fieldset>
				<legend> Message pour le serveur</legend>
				<textarea rows="10" cols="40" name="msg"></textarea>
				<input type="submit" value="Envoyer!"/>
			</fieldset>
		</form>

	</body>
</html>
