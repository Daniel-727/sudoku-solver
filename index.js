//Selecting elements
const puzzle = document.querySelector(".puzzle");
const solve_btn = document.querySelector(".solve-btn");
const squares = 81;
const submission = [];

//creating our sudoku board
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "9");
    puzzle.appendChild(inputElement);
}

//getting values from sudoku board
const joinValue = () => {
    const inputArray = document.querySelectorAll("input");
    inputArray.forEach((input) => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push(".");
        }
    });
};

//code to call the API
const solve = () => {
    joinValue();
    const data = submission.join("");

    const options = {
        method: "POST",
        url: "https://solve-sudoku.p.rapidapi.com/",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
                "359137b4e2mshc315a010aa134c3p180fb4jsn1855a5ea97a3",
            "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
        },
        data: { puzzle: data },
    };

    axios
        .request(options)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
};

//taking the response data and populating our sudoku board
const populate = () => {};

solve_btn.addEventListener("click", solve);
