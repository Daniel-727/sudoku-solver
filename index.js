//Selecting elements
const puzzle = document.querySelector(".puzzle");
const solve_btn = document.querySelector(".solve-btn");
const squares = 81;
const submission = [];
const reset_btn = document.querySelector(".reset-btn");

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
    const data = {numbers: submission.join("")};
    console.log(data);

    fetch("http://localhost:8000/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            populate(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

//taking the response data and populating our sudoku board
const populate = ({ solvable, solution }) => {
    if (solvable === true) {
        const inputArray = document.querySelectorAll("input");
        let i = 0;
        inputArray.forEach((input) => {
            input.value = solution[i];
            i++;
        });
    } else {
        console.log("This board is not solvable");
    }
};

//resets sudoku board
const reset = () => {
    const inputArray = document.querySelectorAll("input");
    inputArray.forEach((input) => {
        input.value = "";
    });
};

reset_btn.addEventListener("click", reset);
solve_btn.addEventListener("click", solve);

/*Testing Code
const test_string =
    "912345687345687129687129345138564792294718536576293814859436271461872953723951468";
    test_btn.addEventListener("click", populate);
    const test_btn = document.querySelector(".test-btn");
*/