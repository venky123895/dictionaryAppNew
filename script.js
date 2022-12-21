const input=document.getElementById('input');
const button =document.getElementById('but');
const outputContainer=document.getElementById('output');

init()

function init(){

button.addEventListener('click',getDetails);

}


async function getDetails(){
    const streamResponse = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${input.value}?key=2b5e1f3a-218c-4ef0-81ef-116d66b99965`);
    const textResponse= await streamResponse.text();
    const jsonData=JSON.parse(textResponse);
    const audioName=jsonData[0].hwi.prs[0].sound.audio;
    let html=``

   
   html += `<div class="outputBox">
   <p id="def">${jsonData[0].shortdef[0]}</p>
   <audio controls id="audio">
       <source src="https://media.merriam-webster.com/audio/prons/en/us/mp3/${getAudioDetails(audioName)}/${audioName}.mp3">
    </audio>
</div>`
   
    outputContainer.innerHTML=html;
}

function getAudioDetails(audioName){
    if(audioName.startsWith('bix')){
        return 'bix'
    }
    else if(audioName.startsWith('gg')){
        return 'gg'
    }
    else if(!isNaN(audioName[0])){
        return 'number'
    }
    else
    {
        return audioName[0];
    }
}