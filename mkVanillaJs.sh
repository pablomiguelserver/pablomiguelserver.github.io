#!/bin/bash

# Create index.html
cat <<EOF > index.html
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="style.css">
		<title>My Website</title>
	</head>
	<body>
		<h1>This is the Title</h1>
		<!-- more tags here -->
		<script src="main.js"></script>
	</body>
</html>
EOF

# Create main.js
echo '' > main.js

# Create style.css
echo 'h1 {' > style.css
echo '	color: green;' >> style.css
echo '}' >> style.css

