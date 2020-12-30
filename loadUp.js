//Load Up is designed to load the inputted file into the innerHTML of the mermaid div in the index html file



function readMermaidFile(input) {
   let previewBox = document.getElementById('previewBox') 
   let fileReader = new FileReader();
   fileReader.onload = function(e) {
        previewBox.innerHTML = e.target.result
   }
}

const pageBody = document.body
pageBody.addEventListener('load', readMermaidFile())

