const terminal = document.getElementById("terminal");
terminal.addEventListener("click", focusInput);
terminal.addEventListener("keydown", submitInput)

const commands = {
    "cls": clearCommandline,
    "./welcome.sh": welcomeScript,
    "ls": listDirectory
}

let historyIndex = undefined;
let commandHistory = [];

const rootDirectory = `<p id="listResponse" class="bold"><span class="txt-purple">index.html welcome.sh</span> <span class="txt-blue">portfolio about</span></p>`;

let terminalToggled = localStorage.getItem("terminalToggled");
if (terminalToggled === null || terminalToggled === "true") {
    document.getElementsByClassName("terminal-container")[0].style.bottom = "0";
    document.getElementById("closeBtn").innerHTML = "&#9660;";
}
else {
    document.getElementsByClassName("terminal-container")[0].style.bottom = "-30vh";
    document.getElementById("closeBtn").innerHTML = "&#9650;";
}

function submitInput(e) {
    let input = document.getElementsByTagName("input")[0];
    
    switch (e.keyCode) {
        // Enter
        case 13:
            // Get input

            // Remove input from previous line
            let p = document.createElement("p");
            p.innerText = input.value;
            p.style.marginLeft = "9px";
            input.parentNode.replaceChild(p, input);

            console.log(input.value);

            let commandVerb = input.value.includes(" ") ? input.value.substring(0, input.value.indexOf(" ")) : input.value;

            console.log(commandVerb);

            // Call command
            if (commandVerb in commands) {
                commands[commandVerb]();
                commandHistory.push(input.value);
            } else if (input.value.replace(" ", "") !== "") {
                terminal.innerHTML += `<p>${input.value}: command not found</p>`;
                commandHistory.push(input.value);
            }

            // Create new terminal line
            terminal.innerHTML += `<div class="terminalInput"><p><span class="txt-green">kcaZ&#64;Alfred</span>:<span class="txt-blue">~</span>$</p><input/></div>`;
            focusInput();
            
            historyIndex = undefined;
            break;
        // Up arrow    
        case 38:
            e.preventDefault();
            
            if (historyIndex === undefined) {
                historyIndex = 0;
            }
            if (commandHistory.length === 0 || historyIndex === commandHistory.length) {
                break;
            }

            historyIndex++;
            input.value = commandHistory[commandHistory.length - historyIndex];
            focusInput();
            break;
        // Down arrow
        case 40:
            e.preventDefault();
            
            if (historyIndex === undefined) {
                historyIndex = 0;
            }
            if (commandHistory.length === 0 || historyIndex === 0) {
                break;
            }
            if (historyIndex === 1) {
                historyIndex -= 1;
                input.value = "";
                break;
            }

            historyIndex--;
            input.value = commandHistory[commandHistory.length - historyIndex];
            focusInput();
            break;
    }
}

function focusInput() {
    if (openingComplete) {
        let input = terminal.getElementsByTagName("input")[0];
        input.focus();
        input.selectionStart = 10000;
        input.selectionEnd = 10000;
    }
}

function clearCommandline() {
    terminal.innerHTML = "";
}

function welcomeScript() {
    terminal.innerHTML += `<div><p>---------------------------------</p><p>Welcome to Zack's terminal.</p><p>We hope you enjoy your stay!</p><p>---------------------------------</p></div>`;
}

function listDirectory() {
    terminal.innerHTML += `<p class="bold"><span class="txt-purple">index.html welcome.sh</span> <span class="txt-blue">portfolio about</span></p>`;
}

function toggleTerminal(arrow) {
    let terminalContainer = document.getElementsByClassName("terminal-container")[0];
    
    if (terminalContainer.style.bottom === "0px") {
        terminalContainer.style.bottom = "-30vh";
        arrow.innerHTML = "&#9650;";
        localStorage.setItem("terminalToggled", "false");
    }
    else {
        terminalContainer.style.bottom = "0px";
        arrow.innerHTML = "&#9660;";
        localStorage.setItem("terminalToggled", "true");
    }
}