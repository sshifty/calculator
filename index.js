/*Variables and html elements*/
const operatorNumbers=document.querySelectorAll(".btn-operator");
const numberButtons=document.querySelectorAll(".btn-number");
const clearButton=document.querySelector(".btn-clear");
const deleteButton=document.querySelector(".btn-delete");
const displayDownP=document.querySelector(".display-down");
const resultDisplay=document.querySelector('.display-up');
let displayContainer="";




clearButton.addEventListener("click",e=>{
    displayContainer="";    
    displayDownP.textContent=displayContainer;
    resultDisplay.textContent="";
});

deleteButton.addEventListener('click',e=>{
    if(displayContainer.length){
        displayContainer=displayContainer.slice(0,displayContainer.length-1);
        displayDownP.textContent=displayContainer;       

    };
})
numberButtons.forEach(num=>{
    num.addEventListener('click',e=>{
        let isNul=displayContainer.charAt(displayContainer.length-1);       
        displayContainer+=e.target.dataset.number;
        displayDownP.textContent=displayContainer;                      
    });
});

operatorNumbers.forEach(op=>{
    op.addEventListener("click",e=>{
        let calculation=displayContainer.match(/\d+|[^0-9]/g);
        let isOk=calculation[calculation.length-1].match(/[0-9]/);
        if(e.target.dataset.operator==="="){
            if(calculation && calculation.length>2 && isOk){
                calculate(displayContainer);
            }            
        }else if(!displayContainer && e.target.dataset.operator==='-'){
            displayContainer+=e.target.dataset.operator;
            displayDownP.textContent=displayContainer;
        }
        else{
            if(displayContainer && (displayContainer[displayContainer.length-1].match(/[\/*+-]/))){
                let char=displayContainer.charAt(displayContainer.length-1);
                displayContainer=displayContainer.replace(char,e.target.dataset.operator)
                displayDownP.textContent=displayContainer;              
                
            }
            if(displayContainer && (displayContainer[displayContainer.length-1].match(/[0-9]/))){                  
                displayContainer+=e.target.dataset.operator;
                displayDownP.textContent=displayContainer;
            };            
        };     
    });
});




/*Basic Math Functions*/

function add(a,b){
    return a+b;
};

function subtract(a,b){
    return a-b;
};

function multiply(a,b){
    return a*b;
};

function divine(a,b){
    if(b===0){
        return "LMAO";
    }
    return (a/b).toFixed(2);    
};


function calculate(calcString){
    let sum;
    
    let calculation=calcString.match(/\d+|[^0-9]/g);
    console.log(calculation)

    if(calculation[0]==='-'){
        let minus=0-parseInt(calculation[1]);
        let word=minus.toString();
        calculation.splice(0,2,word);
    }    
    let done=isFloatDone=false;
    //creating float numbers
    do{
        let length=calculation.length;
        isFloatDone=true;
        for(let j=0;j<length;j++){
            length=calculation.length;
           if(calculation[j].match(/[.]/)){          
               
               let floatNum=calculation[j-1]+calculation[j]+calculation[j+1] ; 
                        
               calculation.splice(j-1,3,floatNum);
               done=false;
               break;
           }
       }
    }while(!isFloatDone)
    //Doing multiply, divinie first left to right, leaving only add and subtract
    do{
        let length=calculation.length;
         done=true;         
        for(let i=0;i<length;i++){
            if(calculation[i].match(/[\/*]/)){                
                let a=calculation[i-1];
                let b=calculation[i+1];
                let op=calculation[i];
                sum=operate(op,a,b).toString();                
                calculation.splice(i-1,3,sum);
                done=false;
                break;
            }
        }

    }while(!done)   
    
    for(let i=0;i<calculation.length;i++){
        if(i===0){            
                sum=parseFloat(calculation[i]);            
        }else{
            if(!isNaN(calculation[i])){
                switch(calculation[i-1]){
                    case '-':
                        sum-=parseFloat(calculation[i]);
                    break;
                    case '+':
                        sum+=parseFloat(calculation[i]);
                    break;
                }
            }
        }
    }
     
    resultDisplay.textContent=displayContainer+"= "+sum;
    displayContainer="";
    
}
function operate(operator,a,b){
    switch(operator){
        case '+':
          return add(a,b);          
        case '-':
            return subtract(a,b);
        case '/':
            return divine(a,b);
        case '*':
            return multiply(a,b);
        default:
            return 'Cant operate!';
    };
};


