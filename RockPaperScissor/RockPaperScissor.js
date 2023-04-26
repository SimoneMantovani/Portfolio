function choice(number){
    let CPUChoice = Math.floor((Math.random() * 3) + 1);
    let result = document.createElement("h3");
    let imgPlayer = document.createElement("img");
    let imgCPU = document.createElement("img"); 
    let playerCounter = document.getElementById("playerCounter").innerText;
    let CPUCounter = document.getElementById("CPUCounter").innerText;
    let player= document.getElementById("playerCounter");
    let CPU = document.getElementById("CPUCounter"); 
    switch (number){
        case 1: switch (CPUChoice){
            case 1: result.innerText = "Tie"; break;
            case 2: result.innerText = "Lose"; CPUCounter++; break;
            case 3: result.innerText = "Win"; playerCounter++; break;
        } break;
        case 2: switch (CPUChoice){
            case 1: result.innerText = "Win"; playerCounter++; break;
            case 2: result.innerText = "Tie"; break;
            case 3: result.innerText = "Lose"; CPUCounter++; break;
        } break;
        case 3: switch (CPUChoice){
            case 1: result.innerText = "Lose"; CPUCounter++; break;
            case 2: result.innerText = "Win"; playerCounter++; break;
            case 3: result.innerText = "Tie"; break;
        } break;
    }
    switch (number){
        case 1: imgPlayer.src = "rock.png"; break;
        case 2: imgPlayer.src = "paper.png"; break;
        case 3: imgPlayer.src = "scissor.png"; break;
    }
    switch (CPUChoice){
        case 1: imgCPU.src = "rock.png"; break;
        case 2: imgCPU.src = "paper.png"; break;
        case 3: imgCPU.src = "scissor.png"; break;
    }
    let tagResult = document.getElementById("result");
    
    imgCPU.height = "150";
    imgPlayer.height = "150";
    tagResult.innerHTML="";
    tagResult.append(imgPlayer);
    tagResult.append(result);
    tagResult.append(imgCPU);
    playerCounter!=0 ? player.innerText = playerCounter : player.innerText = 0;
    CPUCounter!=0 ? CPU.innerText = CPUCounter : CPU.innerText = 0;
}