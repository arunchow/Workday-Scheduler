/*Bootcamp Project Module 5
<!--Version 1.0-->
<!--Author:AC-->
<!--Date: 10-25-2020*/
//Variables
var text_Hour = 9;
var text_Suffix = ":00am";

var storedBlocks = [];
var storedBlocks_NAME = "Stored Blocks";

//function to set color based on current, same and future time
function setBGColor($div, currentTime, textTime)
{
    var iTime_CUR = [];
    iTime_CUR = currentTime.split("");
    var iTime_TXT = [];
    iTime_TXT = textTime.split("");
    var t_CUR = parseHour(iTime_CUR);
    var t_TXT = parseHour(iTime_TXT);
    var am_CUR = jQuery.inArray('a', iTime_CUR);
    var pm_CUR = jQuery.inArray('p', iTime_CUR);
    var am_TXT = jQuery.inArray('a', iTime_TXT);
    var pm_TXT = jQuery.inArray('p', iTime_TXT);

    var ampm_CUR = '';
    var ampm_TXT = '';
 
    if (iTime_CUR[am_CUR])
    {
        ampm_CUR = 'a';
    }    
    else if (iTime_CUR[pm_CUR])
    {
        ampm_CUR = 'p';
    }
    if (iTime_TXT[am_TXT])
    {
        ampm_TXT = 'a';
    }
    else if  (iTime_TXT[pm_TXT])
    {
        ampm_TXT = 'p';
    }    
    
    //debugger;
    if(parseInt(t_CUR) > parseInt(t_TXT)) 
    {
        if ((ampm_CUR === 'a' && ampm_TXT === 'p')) 
        {
        console.log("current less");
        $div.addClass("bg-primary");
        }
        else if ((ampm_CUR === 'p' && ampm_TXT === 'p'))
        {
            console.log("current less");
            $div.addClass("bg-primary");
        } 
        else if ((ampm_CUR === 'p' && ampm_TXT === 'a'))
        {
            console.log("current greater");
            $div.addClass("bg-success");
        }
        else if ((ampm_CUR === 'a' && ampm_TXT === 'a'))
        {
            console.log("current greater");
            $div.addClass("bg-success");
        }
    }
    
    else if(parseInt(t_CUR) < parseInt(t_TXT))
    {
        if ((ampm_CUR === 'a' && ampm_TXT === 'p')) 
        {
        console.log("current less");
        $div.addClass("bg-success");
        }
        else if ((ampm_CUR === 'p' && ampm_TXT === 'p'))
        {
            if (parseInt(t_TXT) <= 12 && parseInt(t_TXT) >= 9)
            {
                console.log("current less");
                $div.addClass("bg-primary");
            }
            else{
                console.log("txt more");
                $div.addClass("bg-success");
            }
        } 
        
        else if ((ampm_CUR === 'p' && ampm_TXT === 'a'))
        {
            console.log("current more");
            $div.addClass("bg-primary");
        }
        else if ((ampm_CUR === 'a' && ampm_TXT === 'a'))
        {
            console.log("current less");
            $div.addClass("bg-success");
        }
     
    }      
    else
    {
        console.log("current same");
        $div.addClass("text-light bg-dark");
    }
    
}

//function to generate hour block
function generateHourBlock(iterations)
{
    if(!iterations)
    {
        iterations = 1;
    }

    var currentTime = GetCurrentHour("LT");
 
    for(var i = 0; i < iterations; i++)
    {
        var text_time = text_Hour + text_Suffix;

        $iBlock = $("<div>").addClass("row py-1");
    
        $iTimeText = $("<h5>").addClass("text-center").text(text_time);
        $iTimeDiv = $("<div>").addClass("col-2 py-3 bg-warning align-middle").append($iTimeText);

        $iTextDiv = $("<textarea>").addClass("col-8 py-3 overflow-auto").text("").attr("id", text_time);
        setBGColor($iTextDiv, currentTime, text_time);
    
        $iSaveIcon =  $('<input type="button" value="Save" />').addClass("save"); 
      
           
    
        $iSaveDiv = $("<div>").addClass("col-1 py-3 save-container border border-primary").append($iSaveIcon);
        
        $iSaveIcon.toggleClass('unsave');
   
        $iBlock.append($iTimeDiv, $iTextDiv, $iSaveDiv);
 
        $("#planner").append($iBlock);

        incrementTextHour();
    }

}

function incrementTextHour()
{
    if(text_Hour === 12)
    {
        text_Hour = 1;
    }
    else if(text_Hour === 11)
    {
        text_Suffix = ":00pm";
        text_Hour++;
    } else
    {
        text_Hour++;
    }
}


function DisplayDate(pFormat)
{
    var date = moment().format(pFormat);

    $("#currentDay").text(date);
}
//function to get current hour
function GetCurrentHour(pFormat)
{
    var time = moment().format(pFormat).toLowerCase();

    time = time.split("");

    var suffix = "";

    var hour = parseHour(time);

    console.log(hour);

    if(time[time.length - 2] === "p")
    {
        console.log("afternoon");
        suffix = ":00pm";
    }
    else
    {
        console.log("morning");
        suffix = ":00am";
    }

    console.log(hour + suffix);
    return hour + suffix;
}

function parseHour(pTime)
{
    var i = 0;
    var iHour = "";

    while(pTime[i] !== ":" || i > 100)
    {
        iHour += pTime[i];
        i++;
    }

    return iHour;
}

//function to store the text in the time block
function AlterStoredBlocks(pText, pID)

{
 
    nBlock = {
        id : pID,
        input : pText.trim()
    }
    
   // debugger;
    for(var i = 0; i < storedBlocks.length; i++)
    {
        //alert("Inside For");
        if(storedBlocks[i].id === nBlock.id)
        {
            storedBlocks.splice(i, 1);

            localStorage.setItem(storedBlocks_NAME, JSON.stringify(storedBlocks));

            return null;
        }
    }
  
    storedBlocks.push(nBlock);

    localStorage.setItem(storedBlocks_NAME, JSON.stringify(storedBlocks));
}

//function to get the stored clocks
function GetStoredBlocks()
{
 
    if(localStorage.getItem(storedBlocks_NAME))
    {
        storedBlocks = JSON.parse(localStorage.getItem(storedBlocks_NAME));

        storedBlocks.forEach(iBlock => {
           
            iID = "#" + iBlock.id;

            $iBlock = $(document.getElementById(iBlock.id));

            $iBlock.val(iBlock.input);

            $iLock = $(($iBlock).parent().children().children()[1])
            
            $iLock.toggleClass("unsave");

        });

    }

}

generateHourBlock(9);
DisplayDate("LLLL");
GetStoredBlocks();
//Event .save
$(".save").click(function() {
    console.log("Save clicked");
   
    $(this).toggleClass('unsave');

    $iTextArea = $($(this).parent().parent().children()[1]);

    iInput = $iTextArea.val();
    iID = $iTextArea.attr("id");

    AlterStoredBlocks(iInput, iID);
  });


//Main//
