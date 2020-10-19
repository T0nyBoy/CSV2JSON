const convertBtnFile = document.querySelector("#convertBtn");
const warningsHere=document.querySelector("#warningsHere");
const jsonPlace = document.querySelector("#jsonCodeHere");
const copyBtn = document.querySelector("#copyBtn");

convertBtnFile.addEventListener("click", (e)=>{
    e.preventDefault();
    //get the file from the page
    const fileinput = document.querySelector("#csvfile").files[0];
    //throw error if no file selected
    if(!fileinput) warningsHere.innerHTML="<p class='alert alert-danger' id='warningMsg'>No file selected. Please select a file</>";
    fileToArray(fileinput, (wholeText)=>{

        newJSON = new arrayWorks(wholeText);
        
        //check for empty headings
        checkForEmptyHeadings ="";
        if(newJSON.emptyHeadings().length>1){
            checkForEmptyHeadings = `<p class="alert alert-danger" id="warningMsg">${newJSON.emptyHeadings(wholeText)}`
        };
        //check for double key values
        chekcForDoubleKeys=""; 
        if(newJSON.doubleKeys().length>1){
            chekcForDoubleKeys = `<p class="alert alert-danger" id="warningMsg">${newJSON.doubleKeys(wholeText)}`;
        };
        //check for reduced head length copared to the data
        checkForHeadLength = "";
        if(newJSON.headLength().length>1){
            checkForHeadLength = `<p class="alert alert-danger" id="warningMsg">${newJSON.headLength(wholeText)}`
        };
        

        //call makeArray to create the export of JSON table
        const arrayOutput = (newJSON.makeArray());
        warningsHere.innerHTML = `${chekcForDoubleKeys} ${checkForEmptyHeadings} ${checkForHeadLength}`;
        jsonPlace.innerHTML = `<p>Your JSON code from the csv file is:</p><p id="JSONCode"><code>${arrayOutput}</code></p>`;

        //clear the value of the fileinput and make the user to reselect a file
        document.querySelector("#csvfile").value = [];
    });
});


//copy to clipboard the JSON conversion function
const copyToClipboard = () =>{
    try{
        jsonCodeToCopy = document.querySelector("#JSONCode").textContent;

        //pop-up that code is copied
        document.querySelector("#ifNothingToCopy").style.display = "inline-block";
        document.querySelector("#ifNothingToCopy").innerHTML = `<p class="alert alert-success" id="successMsg">JSON copied!</p>`;
        setTimeout(function(){
            document.querySelector("#ifNothingToCopy").style.display = "none";
          },1300)
        
        //The way to copy items to clipboard
        var elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = jsonCodeToCopy;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
        }
    catch(e){
        //pop-up that theere is nothing to copy
        document.querySelector("#ifNothingToCopy").style.display = "inline-block";
        document.querySelector("#ifNothingToCopy").innerHTML = `<p class="alert alert-danger" id="warningMsg">Nothing to copy...</p>`;
        setTimeout(function(){
            document.querySelector("#ifNothingToCopy").style.display = "none";
          },1300)
    }
};
    



const fileToArray = (csvFile, cbfunc)=>{ //we need the callback function so we can return data as onload is async
    //funtion to read the file and log them
    //myFile returns an object
    const myFile = new FileReader();
    //what we want to do with the object
    myFile.onload = (event) => {
        //read the whole text file
        const wholeText = event.target.result;
        //we call the wholeText in the call back function because we want to pass it to the processing
        cbfunc(wholeText);
    }
    //call funtion we created to read the whole file
    myFile.readAsText(csvFile,"cp1258");
}

