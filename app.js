const namespace = "loginApp_";
let currentQuestion = 0,
    score = 0;

const questions = [
    {
        q: "What does HTML stand for?",
        o: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        a: "Hyper Text Markup Language"
    },
    {
        q: "Who is making the Web standards?",
        o: ["Microsoft", "Mozilla", "The World Wide Web Consortium"],
        a: "The World Wide Web Consortium"
    },
    {
        q: "Choose the correct HTML element for the largest heading:",
        o: ["h1", "heading", "h6"],
        a: "h1"
    },
    {
        q: "What is the correct HTML element for inserting a line break?",
        o: ["break", "lb", "br"],
        a: "br"
    },
    {
        q: "What is the correct HTML for adding a background color?",
        o: ["body bg=yellow'", "backgroundyellow/background>", "body style='background-color:yellow;'"],
        a: "body style='background-color:yellow;'"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sign-up-container").classList.add("visible");
});

function signUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const signupMessage = document.getElementById("signup-message");

    if (username && password) {
        localStorage.setItem(namespace + username, password);
        signupMessage.style.color = "green";
        signupMessage.textContent = "Sign up successful! You can now log in.";
        setTimeout(() => {
            document.getElementById("sign-up-container").classList.remove("visible");
            setTimeout(() => {
                document.getElementById("sign-up-container").style.display = "none";
                document.getElementById("login-container").style.display = "block";
                document.getElementById("login-container").classList.add("visible");
            }, 300);
        }, 2000);
    } else {
        signupMessage.textContent = "Please fill in all fields.";
    }
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const loginMessage = document.getElementById("login-message");

    if (localStorage.getItem(namespace + username) === password) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful!";
        document.getElementById("login-container").classList.remove("visible");
        setTimeout(() => {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("quiz-container").style.display = "block";
            document.getElementById("quiz-container").classList.add("visible");
            showQuestion();
        }, 300);
    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <p style="font-size: 1.5rem; color: #007bff;">${questions[currentQuestion].q}</p>
        ${questions[currentQuestion].o.map(option => `<label class="quiz-option"><input type="radio" name="option" value="${option}"> ${option}</label>`).join("")}
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].a) score++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            document.getElementById("next-button").style.display = "none";
            document.getElementById("results-button").style.display = "block";
        }
    } else {
        document.getElementById("quiz-message").textContent = "Please select an option.";
    }
}

function showResults() {
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    document.getElementById("quiz-container").classList.remove("visible");
    setTimeout(() => {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("results-container").style.display = "block";
        document.getElementById("results-container").classList.add("visible");
        
        const circle = document.getElementById("circle");
        const percentageText = document.getElementById("percentage");

        circle.style.setProperty('--percentage', `${percentage}%`);
        percentageText.textContent = `${percentage.toFixed(2)}%`;
    }, 300);
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    document.getElementById("results-container").classList.remove("visible");
    setTimeout(() => {
        document.getElementById("results-container").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        document.getElementById("quiz-container").classList.add("visible");
        document.getElementById("next-button").style.display = "block";
        document.getElementById("results-button").style.display = "none";
        showQuestion();
    }, 300);
}
