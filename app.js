var index = 0;
 
$(function() {
    $("#getJoke").click(
        function() {
            $.get("/jokes",function(data){
                $("#setup").html(data.setup);
                $("#punchline").html(data.punchline);
                index = data._id;
                alert(index);
                //alert(index);
            },"json")
        }
    );
   
    $("#upvote").on('click', function() {
        //$.post('/upvote');
        $.ajax({
            url: '/upvote',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: index }),
            success: function(data, status, xhr) {
                $('#votes').html(data.votes);
            }
        });
    });
   
    $("#downvote").on('click', function() {
        // $.post('/downvote');
        $.ajax({
            url: '/downvote',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: index }),
                success: function(data, status, xhr) {
                    $('#votes').html(data.votes);
                }
        });
    });
});