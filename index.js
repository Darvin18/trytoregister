// checking for an iPhone
const ua = navigator.userAgent.toLocaleLowerCase();
const title_group = document.querySelector(".title_group");

if (ua.search("iphone") > -1){
    const iphone_detected = document.createElement("label");
    iphone_detected.textContent = "You have iphone? (≖ ͜ʖ≖) really? You are so rich, but... "+
    "Android is better)";
    iphone_detected.style.color = "#d4d4d4;";
    title_group.appendChild(iphone_detected);
}


// dont click button
const username_input = document.querySelector(".username");

const dangerous_btn = document.createElement("button");
dangerous_btn.classList.add("dangerous_btn");
dangerous_btn.type = "button";
dangerous_btn.textContent = "Dont click!";

const first_form_group = document.querySelectorAll(".form_group")[0];

username_input.addEventListener("change", () => first_form_group.append(dangerous_btn));
dangerous_btn.addEventListener("click", () => {
    const boom = new Audio();
    boom.src = "audio/boom.mp3";
    boom.volume = 0.2;
    boom.play();

    document.body.style.backgroundImage = "url('images/boom.jpg')";
    document.body.style.backgroundSize = "cover";
    
    setTimeout(() => {
        window.location = window.location.href;
    }, 800);
})


// check your location
const second_form_group = document.querySelectorAll(".form_group")[1];
const email_input = document.querySelector(".email");

const about_you_info = document.createElement("label");
about_you_info.classList.add("about_you_info");
about_you_info.style.display = "block";
fetch('http://ip-api.com/json/')
.then((response) => response.json())
.then((data) => {
    about_you_info.textContent = `Interesting fact! You live in ${data.city}!`;
})
.catch(() => console.error('error'));

email_input.addEventListener("change", () => {
    second_form_group.append(about_you_info);
})


// secret code
const broken_password_input = document.querySelector(".pass");
const fourth_form_group = document.querySelectorAll(".form_group")[3];

const secret_code_input = document.createElement("input");
secret_code_input.classList.add("secret_code_input");

secret_code_label = document.createElement("label");
secret_code_label.classList.add("secret_code_label");
secret_code_label.textContent = "secret code";

let generation_limit = true;
let input_count = 0;
let secret_code = Math.floor(1000 + Math.random() * 9000);

let checking_for_correctness = false;


function broken_password_unlock(){
    var unlock_password = false;
    input_count += 1;
    if (input_count > 1){
        broken_password_input.addEventListener("mouseout", () =>{
            fourth_form_group.append(secret_code_input);
            fourth_form_group.append(secret_code_label);
            if (generation_limit){
                document.title = secret_code;
            } 
        })
    }
    if (unlock_password == checking_for_correctness){
        broken_password_input.value = "";
    } else{
        broken_password_input.value = broken_password_input.value;
    }
}

broken_password_input.addEventListener("input", broken_password_unlock);


secret_code_input.addEventListener("input", () => {
    if (secret_code_input.value == secret_code){
        checking_for_correctness = true;
        confetti_audio = new Audio();
        confetti_audio.src = "audio/confetti.mp3";
        confetti_audio.play();
        confetti();
    }
})


// check form
const form_btn = document.querySelector(".form_btn");

form_btn.onclick = function(e) {
    e.preventDefault();
    if (!e.altKey || !e.shiftKey){
        return;
    }

    const main_form = document.querySelector(".form");

    let fail = "";

    const name = main_form.username.value;
    const email = main_form.email.value;
    const birthday = main_form.birthday.value;
    const pass = main_form.pass.value;
    const repass = main_form.repass.value;
    
    
    if (name == "" || email == "" || birthday == "" || pass == "" || repass == ""){
        fail = "Fill in all the fields";
    }
    else if (name.length <= 1 || name.length > 50){
        fail = "Enter the correct name";
    }
    else if (email.search("@") <= -1){
        fail = "The mail must contain the symbol @";
    }
    else if (pass.length < 3){
        fail = "The password must be at least three characters long.";
    }
    else if (pass != repass){
        fail = "Passwords must match";
    }
    if (fail != ""){
        document.querySelector(".error").innerHTML = fail;
    } else{
        alert("You did it! Congratulations!");
    }
}


// check your device
const repass_input = document.querySelector(".repass");

const fifth_form_group = document.querySelectorAll(".form_group")[4];

const switchDevice_label = document.createElement("label");
switchDevice_label.classList.add("switchDevice_label");
switchDevice_label.textContent = "is the register button not working? Try to connect from your phone";


function isMobileDevice(){
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    const phone_info = document.createElement("label");
    phone_info.textContent = "To press the button, you have to hold: alt+shift+LMB";
    phone_info.style.color = "#ff0033";
    title_group.appendChild(phone_info);
} else {
    repass_input.addEventListener("change", () =>{
        fifth_form_group.appendChild(switchDevice_label);
    })
}