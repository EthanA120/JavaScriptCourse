$("h1").addClass("big-title margin-50"); /* Selects ALL the h1 in the HTML */
$("h1").removeClass("margin-50");
console.log($("h1").hasClass("margin-50"));
$("h1").text("Hi there"); /* Inside text */

$("h2").css("color", "red");

console.log($("img").attr("src")); /* Attribute selector */
$("a").attr("href", "https://Google.com"); /* Change attribute */

$("h1").click(function () { /* Instead of "onClick" function */
    $("h1").css("color", "Green");
});

$("button").click(function () {
    $("h1").css("color", "Purple"); /* All the buttons will get this function */
});

$("input").keydown(function (e) {
    $("h2").text(e.key);
});

$("h1").on("mouseover", function () {
    $("h1").css("color", "Blue");
});

$("h2").on("click", function () {
    $("button").html("<em>click</em>"); /* Change innerHTML of ALL buttons*/
    $("h1").before("<button>New</button>"); /* Add a button BEFORE the h1 tag */
    $("h1").after("<button>New</button>"); /* Add a button AFTER the h1 tag */
    $("h1").prepend("<button>New</button>"); /* Add a button INSIDE the h1 tag BEFORE the content of it */
    $("h1").append("<button>New</button>"); /* Add a button INSIDE the h1 tag AFTER the content of it */
});

$("button:eq(0)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("button").remove(); /* Removes All buttons from the page */
});

$("button:eq(1)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h2").hide(); /* Hides h2 */
});

$("button:eq(2)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h2").show(); /* Shows h2 */
});

$("button:eq(3)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h2").toggle(); /* Toggle show and hide h2 */
});

$("button:eq(4)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h1").fadeOut(); /* Fade Out h1 */
});

$("button:eq(5)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h1").fadeIn(); /* Fade In h1 */
});

$("button:eq(6)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h1").fadeToggle(); /* Toggle fade In and out h1 */
});

$("button:eq(7)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h1").slideToggle(); /* Toggle sliding up and down h1 */
});

$("button:eq(8)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h1").animate({ opacity: 0.5 }); /* Animating opacity change from what it is to 0.5 */
});

$("button:eq(9)").click(function () { /* :eq(i) Target the i-th element within a collection of elements */
    $("h1").animate({ marginLeft: "10%" }); /* Animating left margin change from what it is to 10% */
});  
