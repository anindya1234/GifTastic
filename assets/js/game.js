
  var stars = ["Sylvester Stallone","Tom Cruise", "Brad Pitt", "Jennifer Lawrence", "Will Smith"];
  
  
      
      // adding buttons with data attribute from array of stars
      function renderButtons() {

        // Deleting the div prior to adding new
         $("#buttons-view").empty();

        for (var i = 0; i < stars.length; i++) {

          var a = $("<button>");
          a.addClass("star");
          a.attr("data-name", stars[i]);
          a.text(stars[i]);
          $("#buttons-view").append(a);
          a.on('click',displayStarInfo); // on click button  calls function to display 10 gifs
        }
      }
// displayStarInfo function on clicking button makes ajax calls to api and shows gifs of actors
      function displayStarInfo() {
        var star = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + star + "&api_key=bSoMK18jMftqx9NcCPJTuT398TjN4ox4&limit=10&rating=pg";

        // Creating an AJAX call on click
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        // Creating a div to hold the star gifs
        //var starDiv = $("<div>");
        console.log(response);
        $("#star-view").empty();

        
         var data = response.data;
          // Retrieving the URL for the 10 gifs
          for(i=0;i<10;i++){
          var imgURL = data[i].images.fixed_width_small_still.url;
          var imgURL2= data[i].images.fixed_width_small.url;
          var starDiv = $("<div>");          // Creating an element to hold the image and adding all data attributes for animations adn state of anim
          var image = $("<img>").attr("src", imgURL);
          image.attr('type','nil'); //default state = nil 
          image.attr('nil',imgURL); //default  image no anim nil state assigned
          image.attr('animate',imgURL2); //animated gif on animate state
          image.on('click',displayType); //on clicking image call another function
          image.addClass('image');
          // Appending the image
          starDiv.append(image);
          // Storing the rating data
          var rating = data[i].rating;
          var r = $("<p>").text("Rating: " +  rating.toUpperCase());
          r.addClass('rate');
          starDiv.append(r);
          $("#star-view").append(starDiv);       
          }

        });

      }


      function displayType(){
       
        var condition = $(this).attr('type');
        //if state nil sets attribute to animate
        if (condition === 'nil') {
            var a = $(this).attr('animate'); //call attribute,variable a is a temp variable where animate attribute called and a gets imgurl2 value assigned
            $(this).attr('src', a);//set attribute to  element
            $(this).attr('type', 'animate');
        } 
        else {
            var s = $(this).attr('nil');
            $(this).attr('src', s); 
            $(this).attr('type', 'nil');
        }
    };

      // on submitting new star name- name  is pushed in stars array and button geenrated
      $("#add-star").on("click", function(event) {
        event.preventDefault();
        var star = $("#star-input").val().trim();
        stars.push(star);
        renderButtons();
        $("#star-input").val(''); //empty input box after submission
      });

      
     // Calling the renderButtons to show buttons  on page load
      renderButtons();