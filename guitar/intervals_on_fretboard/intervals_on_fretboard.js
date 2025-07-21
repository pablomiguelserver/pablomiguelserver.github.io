        function parseForbiddenPairs(input) {
            let forbiddenPairs = new Set();
            let pairs = input.split(",");
            pairs.forEach(pair => {
                let nums = pair.trim().split(" ");
                if (nums.length === 2) {
                    forbiddenPairs.add(`${nums[0]} ${nums[1]}`);
                    forbiddenPairs.add(`${nums[1]} ${nums[0]}`); // Ensure reverse pairs are also forbidden
                }
            });
            return forbiddenPairs;
        }

        function generateUniqueTriplet() {
            let uniqueNumbers = new Set();
            while (uniqueNumbers.size < 3) {
                uniqueNumbers.add(Math.floor(Math.random() * 8) + 1);
            }
            return Array.from(uniqueNumbers);
        }

        function containsForbiddenPair(triplet, forbiddenPairs) {
            return forbiddenPairs.has(`${triplet[0]} ${triplet[1]}`) ||
                   forbiddenPairs.has(`${triplet[0]} ${triplet[2]}`) ||
                   forbiddenPairs.has(`${triplet[1]} ${triplet[2]}`);
        }

        document.getElementById("input").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                let forbiddenPairs = parseForbiddenPairs(this.value);
                let outputDiv = document.getElementById("output");
                outputDiv.innerHTML += `<br>> Generating triplets...<br>`;
                
                for (let i = 0; i < 8; i++) {
                    let triplet;
                    do {
                        triplet = generateUniqueTriplet();
                    } while (containsForbiddenPair(triplet, forbiddenPairs));
                    outputDiv.innerHTML += `${triplet.join(" ")}<br>`;
                }
                this.value = "";
            }
        });