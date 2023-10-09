var window = window ?? self;
let red = "#FF4968"; let green = "#0BF01E"; let black = "#000000";
const settings = new Map()

var powerIO = { on: 'true', name: 'Power'}
var shortsIO = { on: 'true', name: 'Shorts'}
var shortsVideosIO = { on: 'true', name: 'Shorts Videos'}
var communityIO = { on: 'true', name: 'Community'}
var breakingNewsIO = { on: 'true', name: 'Breaking News'}
var sidebarIO = { on: 'true', name: 'Sidebar'}
var headerIO = { on: 'true', name: 'Header'}

settings.set("Power",powerIO)
settings.set("Shorts",shortsIO)
settings.set("Shorts Videos",shortsVideosIO)
settings.set("Community",communityIO)
settings.set("Breaking News",breakingNewsIO)
settings.set("Sidebar",sidebarIO)
settings.set("Header",headerIO)

async function getStorage(key){
    var storage = await chrome.storage.local.get(key).then((result) => { return result[key] });
    return storage;
}

function setStorage(key, value){ chrome.storage.local.set({[key]: value}) }

function createText(string,color){
    const tempText = document.getElementById("textBox")
    textDiv = document.createTextNode(string)
    tempText.style.font = 30+"px KoopasInvaders"
    tempText.style.color = color
    tempText.style.opacity = 1
    tempText.style.textAlign = "center"
    tempText.appendChild(textDiv)
}

function updateText(string){
    const tempText = document.getElementById("textBox")
    tempText.innerHTML = string
}

function textCheck(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let noSettingsOn = true;

        for (const [key, value] of settings.entries()) {
            if (value.on == true && value.name != 'Power'){
                noSettingsOn = false;
                break;
            }
        }

        const tempText = document.getElementById("textBox")
        const colorText = document.getElementById("kiFontColor")
        if(!tabs[0].url.includes("youtube.com") || settings.get("Power").on == false || noSettingsOn){
            try{
                tempText.classList.add('noAnimation')
                colorText.classList.add('noAnimation')
                colorText.style.webkitTextFillColor = "#000000"
            } catch{}
            updateText("Inactive") 

            // Greying out toggle buttons
            if(!tabs[0].url.includes("youtube.com")){
                for (const [key, value] of settings.entries()) {
                    document.getElementById(value.name).disabled = true
                    let sliders = document.querySelector('[class="slider round"]')
                    if(sliders != null){ sliders.className = "sliderDisabled" }
                }
            }
        }
        else{
            try{
                tempText.style.animation = "glowing 5000ms infinite"
                colorText.style.animation = "colorChange 10000ms linear infinite"
                tempText.classList.remove('noAnimation')
                colorText.classList.remove('noAnimation')
                colorText.style.webkitTextFillColor = "#00000000"
            } catch{}
            updateText("Currently Blocking")
        }
    });
}

async function clickBuilder(setting){
    setting.on = (await getStorage(setting.name) != null) ? await getStorage(setting.name) : true
    
    document.getElementById(setting.name).checked = setting.on // loading stored settings
    document.getElementById(setting.name).onclick = async function(button){
        let check = document.getElementById(setting.name).checked
        console.log(setting.name+" "+check)
        // console.log("powerio = "+powerIO.on+" shortsio = "+shortsIO.on+" communityio = "+communityIO.on+" sidebario = "+sidebarIO.on+" headerio = "+headerIO.on)
        setting.on = check
        textCheck()
        
        // Making sure youtube is open to indicate utility
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0].url.match('https:\/\/.*.youtube.com\/.*')) {
                setStorage(setting.name,check)
            }
        });
    }
}

async function startupDSCHTML(){
    for (const [key, value] of settings.entries()) { await clickBuilder(value) }
    createText("Invalid",black)
    textCheck()
}

// Adding listener incase another open html page changes something
chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(settings.get(key).on != newValue){
            settings.get(key).on = newValue
            document.getElementById(key).checked = newValue
            textCheck()
        }
    }
});

startupDSCHTML()