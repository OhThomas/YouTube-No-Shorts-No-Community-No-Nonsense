var window = window ?? self;
let red = "#FF4968"; let green = "#0BF01E"; let black = "#000000";
const settings = new Map()
const emptyDSC = "emptyDSC"

var powerIO =               { on: true, name: 'Power'}
var shortsIO =              { on: true, name: 'Shorts', section: 'Shorts'}
var shortsVideosIO =        { on: true, name: 'Shorts Videos', section: 'Shorts'}
var shortsSidebarIO =       { on: true, name: 'Shorts Sidebar', section: 'Shorts'}
var communityIO =           { on: true, name: 'Community', section: 'Community'}
var breakingNewsIO =        { on: true, name: 'Breaking News', section: 'Community'}
var communityTrendingIO =   { on: true, name: 'Community Trending', section: 'Community'}
var sidebarExtendedIO =     { on: true, name: 'Sidebar Extended', section: 'Sidebar'}
var sidebarMiniIO =         { on: true, name: 'Sidebar Mini', section: 'Sidebar'}
var headerTopicsIO =        { on: true, name: 'Header Topics', section: 'Header'}
var headerRelatedIO =       { on: true, name: 'Header Related', section: 'Header'}
var headerNotificationIO =  { on: true, name: 'Header Notification', section: 'Header'}
var headerUploadIO =        { on: true, name: 'Header Upload', section: 'Header'}
var headerVoiceIO =         { on: true, name: 'Header Voice', section: 'Header'}
var videoNextIO =           { on: true, name: 'Video Next', section: 'Video'}
var videoAutoplayIO =       { on: true, name: 'Video Autoplay', section: 'Video'}
var videoSubtitlesIO =      { on: false, name: 'Video Subtitles', section: 'Video'}
var videoSettingsIO =       { on: false, name: 'Video Settings', section: 'Video'}
var videoMiniplayerIO =     { on: true, name: 'Video Miniplayer', section: 'Video'}
var videoPictureIO =        { on: true, name: 'Video Picture', section: 'Video'}
var videoCinemaIO =         { on: false, name: 'Video Cinema', section: 'Video'}
var videoTVIO =             { on: true, name: 'Video TV', section: 'Video'}
var videoFullscreenIO =     { on: false, name: 'Video Fullscreen', section: 'Video'}
var videoChatIO =           { on: true, name: 'Video Chat', section: 'Video'}
var descDownloadIO =        { on: true, name: 'Description Download', section: 'Description'}
var descShareIO =           { on: true, name: 'Description Share', section: 'Description'}
var descClipIO =            { on: true, name: 'Description Clip', section: 'Description'}
var descPlaylistIO =        { on: false, name: 'Description Playlist', section: 'Description'}
var descPopupIO =           { on: true, name: 'Description Popup', section: 'Description'}
var descThanksIO =          { on: true, name: 'Description Thanks', section: 'Description'}
var descJoinIO =            { on: true, name: 'Description Join', section: 'Description'}
var descOfferIO =           { on: true, name: 'Description Offer', section: 'Description'}
var descTryIO =             { on: true, name: 'Description Try', section: 'Description'}
var descMerchIO =           { on: true, name: 'Description Merch', section: 'Description'}
var descLikeIO =            { on: false, name: 'Description Like', section: 'Description'}
var descMetadataIO =        { on: true, name: 'Description Metadata', section: 'Description'}
var descBoxIO =             { on: false, name: 'Description Box', section: 'Description'}
var moviesSectionsIO =      { on: true, name: 'Movies Sections', section: 'Movies'}
var moviesBuyIO =           { on: true, name: 'Movies Buy', section: 'Movies'}
var moviesFreeIO =          { on: false, name: 'Movies Free', section: 'Movies'}

settings.set("Power",powerIO)
settings.set("Shorts",shortsIO)
settings.set("Shorts Videos",shortsVideosIO)
settings.set("Shorts Sidebar",shortsSidebarIO)
settings.set("Community",communityIO)
settings.set("Breaking News",breakingNewsIO)
settings.set("Community Trending",communityTrendingIO)
settings.set("Sidebar Extended",sidebarExtendedIO)
settings.set("Sidebar Mini",sidebarMiniIO)
settings.set("Header Topics",headerTopicsIO)
settings.set("Header Related",headerRelatedIO)
settings.set("Header Notification",headerNotificationIO)
settings.set("Header Upload",headerUploadIO)
settings.set("Header Voice",headerVoiceIO)
settings.set("Video Next",videoNextIO)
settings.set("Video Autoplay",videoAutoplayIO)
settings.set("Video Subtitles",videoSubtitlesIO)
settings.set("Video Settings",videoSettingsIO)
settings.set("Video Miniplayer",videoMiniplayerIO)
settings.set("Video Picture",videoPictureIO)
settings.set("Video Cinema",videoCinemaIO)
settings.set("Video TV",videoTVIO)
settings.set("Video Fullscreen",videoFullscreenIO)
settings.set("Video Chat",videoChatIO)
settings.set("Description Download",descDownloadIO)
settings.set("Description Share",descShareIO)
settings.set("Description Clip",descClipIO)
settings.set("Description Playlist",descPlaylistIO)
settings.set("Description Popup",descPopupIO)
settings.set("Description Thanks",descThanksIO)
settings.set("Description Join",descJoinIO)
settings.set("Description Offer",descOfferIO)
settings.set("Description Try",descTryIO)
settings.set("Description Merch",descMerchIO)
settings.set("Description Like",descLikeIO)
settings.set("Description Metadata",descMetadataIO)
settings.set("Description Box",descBoxIO)
settings.set("Movies Sections",moviesSectionsIO)
settings.set("Movies Buy",moviesBuyIO)
settings.set("Movies Free",moviesFreeIO)

async function getStorage(key){
    var storage = await chrome.storage.local.get(key).then((result) => { return result[key] });
    return storage;
}

async function setStorage(key, value){ chrome.storage.local.set({[key]: value}) }

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

function addTextAnimation(element, color, display){
    try{
        if(display){
            element.classList.remove(emptyDSC)
            if(color == true){
                element.classList.remove('noAnimation')
                element.style.animation = "colorChange 10000ms linear infinite"
                element.style.webkitTextFillColor = "#00000000" }
            else{
                element.classList.add('noAnimation')
                element.style.webkitTextFillColor = "#000000" 
            }
        }
        else if(!element.classList.contains(emptyDSC)){
            element.classList.add(emptyDSC)
            element.classList.add('noAnimation')
        }
    } catch{}
}

function checkmarkCheck(){
    let shortsCheck = true; let communityCheck = true; let sidebarCheck = true;  
    let videoCheck = true; let descriptionCheck = true; let headerCheck = true;
    const shortsElement = document.getElementById("shortsCheckmark");
    const communityElement = document.getElementById("communityCheckmark");
    const sidebarElement = document.getElementById("sidebarCheckmark");
    const headerElement = document.getElementById("headerCheckmark");
    const videoElement = document.getElementById("videoCheckmark");
    const descriptionElement = document.getElementById("descriptionCheckmark");
    const moviesElement = document.getElementById("moviesCheckmark");

    if(shortsElement == null || communityElement == null || sidebarElement == null || 
        headerElement == null || videoElement == null || descriptionElement == null || moviesElement == null){ return }

    for (const [key, value] of settings.entries()) {
        if (value.on == false && value.section == 'Shorts'){ shortsCheck = false; }
        if (value.on == false && value.section == 'Community'){ communityCheck = false; }
        if (value.on == false && value.section == 'Sidebar'){ sidebarCheck = false; }
        if (value.on == false && value.section == 'Header'){ headerCheck = false; }
        if (value.on == false && value.section == 'Video'){ videoCheck = false; }
        if (value.on == false && value.section == 'Description'){ descriptionCheck = false; }
        if (value.on == false && value.section == 'Movies'){ moviesCheck = false; }
    }

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let color = (tabs[0].url.includes("youtube.com") && settings.get("Power").on == true)
        addTextAnimation(shortsElement, color, shortsCheck)
        addTextAnimation(communityElement, color, communityCheck)
        addTextAnimation(sidebarElement, color, sidebarCheck)
        addTextAnimation(headerElement, color, headerCheck)
        addTextAnimation(videoElement, color, videoCheck)
        addTextAnimation(descriptionElement, color, descriptionCheck)
        addTextAnimation(moviesElement, color, moviesCheck)
    });
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

        checkmarkCheck()
    });
}

async function clickBuilder(setting){
    setting.on = (await getStorage(setting.name) != null) ? await getStorage(setting.name) : setting.on
    
    document.getElementById(setting.name).checked = setting.on // loading stored settings
    document.getElementById(setting.name).onclick = async function(button){
        let check = document.getElementById(setting.name).checked
        console.log(setting.name+" "+check)
        // console.log("powerio = "+powerIO.on+" shortsio = "+shortsIO.on+" communityio = "+communityIO.on+" sidebario = "+sidebarIO.on+" headerio = "+headerIO.on)
        setting.on = check
        textCheck()
        
        // Making sure youtube is open to indicate utility
        chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
            if (tabs[0].url.match('https:\/\/.*.youtube.com\/.*')) {
                await setStorage(setting.name,check)
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