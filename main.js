// Constants
var num_questions;
var error = {text: "Ooops! You missed a question! Go back and answer all the questions!", 
            bg: "url(images/error.gif)"};
var harvey = {text: "You are Harvey Specter!", bg: "url(images/harvey.gif)" };
var louis = {text: "You are Louis Litt!", bg: "url(images/louis.gif)" };
var donna = {text: "You are Donna Paulsen!", bg: "url(images/donna.gif)" };
var jessica = {text: "You are Jessica Pearson!", bg: "url(images/jessica.gif)" };
var michael = {text: "You are Michael Ross!", bg: "url(images/michael.gif)" };
var rachel = {text: "You are Rachel Zane!", bg: "url(images/rachel.gif)" };


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

/* Loading quiz through JSON file */

// Pre-condition: 
// - At least one question provided
// - At least some answers provided for any given question
$.getJSON("data1.json", function(data) {
    // now you can do something with this data. 
    // remember you can only work with the data in this callback
    // data.title has the title
    // maybe you want to loop through data.questions? 
    num_questions = data.questions.length;
    // Add quiz title in header
    $("div.header h1").text(data.title);

    // Append submit button and modal text
    var submit_button = `
    <div class="submit-button-container">
        <button type="button" id="submit-button"><span>What am I?</span></button>
    </div>
    `
    var modal_outcome = `
    <div id="myModal" class="outcome-container">
        <div class="outcome-content">
            <div id=outcome-content-gif></div>
            <div id="outcome-content-text" ></div>
        </div>
    </div>
    `
    $(".main").append(submit_button);
    $(".main").append(modal_outcome);

    // Build string containing all questions
    var questions = "";
    for (let i=0; i < data.questions.length; i++) {;
        var q = data.questions[i]

        // Build string containing one question
        var question_string = `
        <div class="${q.question_name} question-wrapper">
            <div class="${q.question_name} question-text-container" style='background-image: url(${q.question_img_url})'>
                <h2> ${q.question_text} </h2>
            </div>
        `;
        question_string += `
            <div class="${q.question_name} choices-container">
        `;

        // Loop through answer list
        for (let j=0; j < q.answers.length; j++) {
            let ans = q.answers[j];
            question_string += `
                <label>
                    <div id="${q.question_name}.${j+1}" class="choice-img" style="background-image: url(${ans.img_url})">
                        <div class="q-text"> ${ans.text} </div>
                    </div>
                    <input type="radio" name="${q.question_name}" value="${ans.outcome}">
                </label>
            `;
        }
        question_string += `
            </div>
        </div>
        `;
        console.log(question_string); // Print each question string
        questions += question_string;
    }

    console.log(questions); // Print overall question stirng
    $(".main").prepend(questions);

/* 
 * Defining select state for choice images/text
 *
 */
$('.choice-img').on('click', function(e) {

    let img_id = e.target.id;
    let question_num = `q${e.target.id[1]}`;
    console.log(img_id);

    console.log("HEYYYY");
        
    $(`.${question_num}.choices-container div.choice-img`).css("opacity", ".2");
    $(`.${question_num}.choices-container div[id="${e.target.id}"]`).css("opacity", "1");

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

    var outcome_bg;
    var outcome_text;

    if (choices.length != num_questions) {
        outcome_bg = error.bg;
        outcome_text = error.text;
    }
    else if (modes.includes(1) && modes.includes(2)) {
        outcome_bg = michael.bg;
        outcome_text = michael.text;
    }
    else if (modes.includes(3) && modes.includes(4)) {
        outcome_bg = rachel.bg;
        outcome_text = rachel.text;
    }
    else if (modes.includes(1)) {
        outcome_bg = harvey.bg;
        outcome_text = harvey.text;
    }
    else if (modes.includes(2)) {
        outcome_bg = louis.bg;
        outcome_text = louis.text;
    }
    else if (modes.includes(3)) {
        outcome_bg = donna.bg;
        outcome_text = donna.text;
    }
    else if (modes.includes(4)) {
        outcome_bg = jessica.bg;
        outcome_text = jessica.text;
    }

    $('.outcome-container').css("display", "flex");
    $('#outcome-content-gif').css("background-image", outcome_bg)
    $('#outcome-content-text').text(outcome_text);


  });

       
  });
