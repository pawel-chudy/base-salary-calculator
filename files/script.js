const salaries = {
    mrWh: {
        intern: 2521,
        intern: 2602,
        designated: 2944,
        certificated: 3433
    },
    mrbchWht: {
        intern: 2131,
        contractual: 2212,
        designated: 2542,
        certificated: 3030
    },
    bchWht: {
        intern: 1878,
        contractual: 1925,
        designated: 2220,
        certificated: 2630
    }
};

const workload = [];

workload["18"] = 18;
workload["22"] = 22;
workload["25"] = 25;
workload["30"] = 30;

function getSalary() {
    
    const edLvlVal = document.querySelector('#edLvl').value;
    
    const degreeVal = document.querySelector('#degrees').value;
    
    return salaries[edLvlVal][degreeVal];
}

function getDegrees() {
    
    let degree = 0;
    
    const form = document.forms["data"];
    
    const selectedDegree = form.elements["degrees"];
    
    degree = degrees[selectedDegree.value];
    
    return degree;
}

function getWorkload() {
    
    let wkld = 0;
    
    const form = document.forms["data"];
    
    const selectedWorkload = form.elements["workload"];
    
    wkld = workload[selectedWorkload.value];
    
    return wkld;
}

function chkJobTime(pStr) {
    
    let splWorkingHours = document.getElementById("splWorkingHours");
    
    if (!isNaN(pStr) && pStr !== "" && pStr <= getWorkload()) {
        
        splWorkingHours.style.fontSize = "22px";
        
        pStr = pStr / getWorkload();
        
        return pStr;
        
    } else if (isNaN(pStr)) {
        
        splWorkingHours.style.fontSize = "18px";
        
        splWorkingHours.innerHTML = "Enter number." + "<br>";
        
        return 0;
        
    } else if (pStr > getWorkload()) {
        
        let splWorkingHours = document.getElementById("splWorkingHours");
        
        splWorkingHours.innerHTML = "Incorrect value." + "<br>";
        
        return 0;
        
    } else
        
        document.getElementById("splWorkingHours").innerHTML = "";
}

function calcWorkingHours() {
    
    let str = document.getElementById("inppn");
    
    let strVal = str.value;
    
    let cmp = /^\d{1,2}$/.test(strVal);
    
    if (cmp === true) {
        
        let commaStr = strVal.concat(",0");
        
        document.getElementById("inppn").value = commaStr;
        
        return chkJobTime(strVal);
        
    } else {
        
        strVal = str.value.split(",").join(".");
        
        let fstrVal = parseFloat(strVal);
        
        let cmp2 = /^\d{1,2}\.?\d$/.test(strVal);
        
        if (cmp2 === false) {
            
            strVal = strVal.substring(0, strVal.length - 1);

            document.getElementById("inppn").value = strVal;

            return chkJobTime(strVal);
        }
        
        return chkJobTime(fstrVal);
    }
}

function calcSalaries() {

    if (typeof(getSalary()) === "undefined") 
        
        document.getElementById("splWage").innerHTML = "Fill in above fields.";
    
    else
        
        document.getElementById("splWage").innerHTML = getSalary() + " zł";
    
    calcWorkingHours();
    
    let BasicPay = (getSalary() * calcWorkingHours()).toFixed(2);
    
    document.getElementById("splBasicPay").innerHTML = BasicPay.replace(/\./g, ',') + " zł";

    if (isNaN(BasicPay)) 
        
        document.getElementById("splBasicPay").innerHTML = "Fill in above fields.";
    
    document.getElementById("splBasicPay").style.padding = "5px 10px";
}

function clearInps() {

    location.reload();
}

function stopRKey(evt) {
    
    var evt = (evt) ? evt : ((event) ? event : null);
    
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    
    if ((evt.keyCode == 13) && (node.type == "text")) 
        
        return false;
}

document.onkeypress = stopRKey;