# lab2-quizzical-musabshak
https://dartmouth-cs52-20s.github.io/lab2-quizzical-musabshak/

### Description
- Trying to ensure that the site works on different screen widths (13.5" laptop, 21" monitor, 6" phone) _while_ writing the first version of the website really slowed me down. For future, should focus on making it work for one screen width initially. Optimizations for different screen-widths can be done later.
- Adding images in CSS as div backgrounds vs as html tags: I found the CSS route to be easier because of easy to use properties like background-size: cover, background-position: center. 
- Need to have a better understanding of differences between and best-case uses for %, px, vw, vh units.


### Styling Focus (Option 2)
- Radio buttons hidden using 'checkbox hack'.
- Hovering over answer choices results in 'pop-up' effect.
- Output is a modal and is animated (fades into screen-middle from screen-top).
- Light sweep effect when hovering over submit button.
- Page works perfectly in mobile; answer choices arrange as columns instead of rows.


### Extra credit
- Why should `<script src="main.js"></script>` be placed right before the closing \</body> tag, rather than in \<head>\</head>?
    - If there is a lot of code in the JS file, the page may load visibly slowly. This is because browser reads HTML from top to bottom and loading a long JS file in the head section at the top will delay loading of the HTML page.
    - Not relevant for this assignment but if the JS file edits any HTML/CSS upon being read in, loading it in the head section may throw errors. This is because there will have been no HTML read at the time the JS script is loaded. 