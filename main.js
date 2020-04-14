// Constants
var num_questions = 4;
var error = {text: "Ooops! You missed a question! Go back and answer all the questions!", 
            bg: "url(images/error.gif)"};
var harvey = {text: "You are Harvey Specter!", bg: "url(images/harvey.gif" };
var louis = {text: "You are Louis Litt!", bg: "url(images/louis.gif" };
var donna = {text: "You are Donna Paulsen!", bg: "url(images/donna.gif" };
var jessica = {text: "You are Jessica Pearson!", bg: "url(images/jessica.gif" };
var michael = {text: "You are Michael Ross!", bg: "url(images/michael.gif" };
var rachel = {text: "You are Rachel Zane!", bg: "url(images/rachel.gif" };


/* 
 * Defining select state for choice images/text
 *
 */
$('.choice-img').on('click', function(e) {

    let img_id = e.target.id;
    let question_num = `q${e.target.id[1]}`;
    console.log(img_id);
        
    $(`.${question_num}.choices-container div.choice-img`).css("opacity", ".2");
    $(`.${question_num}.choices-container div[id="${e.target.id}"]`).css("opacity", "1");

});

/*
 * Given an array of integers, find and return the mode.
 * The "mode" is the number that is repeated most often.
 * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
 * @param {Array} numbers An array of numbers.
 * @return {Array} The mode of the specified numbers.
 * 
 * Fully copied from: 
 * https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
 */
function mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
}

/* 
 * Actions for when submit button is clicked. Determines and outputs the Suits character 
 * based off the user's responses. Displays an error to the user if not all questions are
 * answered.
 */
$('#submit-button').on('click', function(e) {
    // gather all checked radio-button values
    var choices = $("input[type='radio']:checked").map(function(i, radio) {
      return $(radio).val();
    }).toArray();
    // now you have an array of choices = ["valueofradiobox1", "valueofradiobox2", "valueofradiobox2"]
    // you'll need to do some calculations with this
    // a naive approach would be to just choose the most common option - seems reasonable

    console.log(choices);
    console.log("choices array length: " + choices.length);
    var modes = mode(choices);
    console.log("choices modes: " + modes);

    if (choices.length != num_questions) {
        console.log("ERROR");
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", error.bg)
        $('#outcome-content-text').text(error.text);

    }
    else if (modes.includes(1) && modes.includes(2)) {
        console.log('You are Michael');
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", michael.bg)
        $('#outcome-content-text').text(michael.text);
    }
    else if (modes.includes(3) && modes.includes(4)) {
        console.log(rachel.text);
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", rachel.bg)
        $('#outcome-content-text').text(rachel.text);
    }
    else if (modes.includes(1)) {
        console.log(harvey.text);
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", harvey.bg)
        $('#outcome-content-text').text(harvey.text);
    }
    else if (modes.includes(2)) {
        console.log(louis.text);
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", louis.bg)
        $('#outcome-content-text').text(louis.text);
    }
    else if (modes.includes(3)) {
        console.log(donna.text);
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", donna.bg)
        $('#outcome-content-text').text(donna.text);
    }
    else if (modes.includes(4)) {
        console.log(jessica);
        $('.outcome-container').css("display", "flex");
        $('#outcome-content-gif').css("background-image", jessica.bg)
        $('#outcome-content-text').text(jessica.text);
    }


  });

/*
 * Adapted from: https://www.w3schools.com/howto/howto_css_modals.asp
 * Closes modal box when user clicks outside it.
 */
var modal = document.getElementById("myModal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}