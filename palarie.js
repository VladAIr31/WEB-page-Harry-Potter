document.getElementById('quizForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
        .map(input => input.value);

    if (answers.length < 7) {
        alert("Te rog răspunde la toate întrebările înainte de a trimite.");
        return;
    }

    let houseScores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
    answers.forEach(answer => houseScores[answer]++);
    const sortedHouse = Object.keys(houseScores).reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);

    let previousResults = JSON.parse(localStorage.getItem("results")) || [];

    previousResults.push({ name, house: sortedHouse });

    localStorage.setItem("results", JSON.stringify(previousResults));

    window.location.href = "rezpalarie.html";
});
