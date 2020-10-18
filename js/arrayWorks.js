class arrayWorks {
    constructor(getText) {
        this.getText = getText;
        this.csvArray = getText.split(/\r\n|\n/).map(i => i.split(","));
    }

    //methods
    makeArray(){
        let str="";
        
        str+=("[");
        for(var i=1;i<this.csvArray.length;i++){
            str+=("{");
            for(var j=0;j<this.csvArray[0].length;j++){
                if(j<this.csvArray[0].length-1){
                    str+=(`"${this.csvArray[0][j]}":"${this.csvArray[i][j]}",`);
                } else {
                    str+=(`"${this.csvArray[0][j]}":"${this.csvArray[i][j]}"`);
                }
                
            } if(i<this.csvArray.length-1){
                str+=("},");
            } else {
                str+=("}");
            } 
        }
        str+=("]")    
        return str;
    }

    emptyHeadings(){
        let headings="";
        for(var i=0; i<this.csvArray[0].length;i++){
            if(this.csvArray[0][i]=="" || this.csvArray[0][i]==undefined){
                headings="Warning: There are empty values at the headings!";
            }
        }
       return headings;
    }
        
    doubleKeys() {
         //sorting the array in ascending alphabetical order
        let sorted_arr = this.csvArray[0].slice().sort(); 
        
        let doubleKeys = "";
        for (var i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                doubleKeys="Warning: There are doublicated values in the headings!";
            }
            }
        return doubleKeys;
        }

    headLength(){
        let headLengthCompare = "";
        let lineBiggerThanHeading =0;
        for(var i=1;i<this.csvArray[i].length;i++){
            if(this.csvArray[i].length>this.csvArray[0].length){
                lineBiggerThanHeading+=1;
            }
            if(lineBiggerThanHeading!=0){
                headLengthCompare="Warning: The heading's length is shorter to the data! Columns might be missing!";
            }
        }
        return headLengthCompare;
    }
}