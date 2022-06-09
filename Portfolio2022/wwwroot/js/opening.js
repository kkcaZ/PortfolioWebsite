function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const welcomeScriptIncorrect = "./weclome.sh"
const welcomeScriptCorrect = "lcome.sh"

let openingComplete = false;

async function openingAnimation() {
    // Write welcome.sh in terminal
    // await sleep(2000);
    await writeText("welcome", welcomeScriptIncorrect);
    // await sleep(500);
    await removeText("welcome", 8);
    // await sleep(250);
    await writeText("welcome", welcomeScriptCorrect);
    // await sleep(250);
    show("welcomeResponse");
    
    // List directory
    show("list");
    // await sleep(1500);
    await writeText("list", "ls");
    // await sleep(100);
    show("listResponse");
    show("inputLine");
    
    let input = document.getElementsByTagName("input")[0];
    input.focus();
    input.selectionEnd = 10000;
    
    openingComplete = true;
}

async function writeText(id, text) {
    let element = document.getElementById(id);
    
    for (let l = 0; l < text.length; l++) {
        element.innerHTML += text.charAt(l);
        await sleep( Math.floor((Math.random() * 100) + 50));
    }
}

async function removeText(id, letterCount) {
    let element = document.getElementById(id);
    
    for (let l = 0; l < 8; l++) {
        element.innerHTML = element.innerText.substring(0, element.innerHTML.length - 1);
        await sleep( Math.floor((Math.random() * 100) + 50));
    }
}

function show(id) {
    document.getElementById(id).classList.add("shown");
}

_ = openingAnimation();