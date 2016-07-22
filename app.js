$(function() {
// code for clicking button .etc

    $("#getJoke").click(
        function() {
            $.get("/jokes",function(data){
                // TODO:
                // modify this code to manipulate the HTML
                // to display the setup and punchline on the page
                // instead of using alerts!
               //alert(data.setup);
               //alert(data.punchline);
              $("#setup").html(data.setup);
              $("#punchline").html(data.punchline);
            },"json")
        }
    );
});