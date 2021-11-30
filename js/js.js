document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("whats your name ?");
    if (yourName==null||yourName=="") {
        document.querySelector('.name span').innerHTML = "UnKnown";
    } else {
        document.querySelector('.name span').innerHTML = yourName;
        document.getElementById('cong').play();
    }
    document.querySelector(".control-buttons").remove();
};
let duration = 500,
    blocksContainer = document.querySelector('.memory-game-blocks'),
    blocks = Array.from(blocksContainer.children),
    orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);
blocks.forEach((block, index) => {
    // console.log(index)
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
      fliped(block)  
    })
});
function fliped(selectedBlock) {
    selectedBlock.classList.add('fliped');
    var allFlipedBlocks = blocks.filter(flipedBlocks => flipedBlocks.classList.contains('fliped'))
    if (allFlipedBlocks.length === 2) {
        stopClicking();
        checkMatched(allFlipedBlocks[0], allFlipedBlocks[1])
}
}
function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}
function checkMatched(firstBlock,secondBlock) {
    var tries = document.querySelector('.tries span');
    if (firstBlock.dataset.img === secondBlock.dataset.img) {
        firstBlock.classList.remove('fliped');
        secondBlock.classList.remove('fliped');
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');
        document.getElementById('seccess').play();
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('fliped');
            secondBlock.classList.remove('fliped');
            document.getElementById('fail').play();
        },duration)
        
    }
    
       
    
}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        
    }
    return array;
}
