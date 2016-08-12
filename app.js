$(function() {
    $("#setup, #punchline, #voting, #votes-container").hide();

    $("#getJoke").click(
        function() {
            $("#setup, #punchline, #voting, #votes-container").show();

            $.get("/jokes",function(data){
                $("#setup").html(data.setup);
                $("#punchline").html(data.punchline);

                if (data.votes === undefined) {
                    $("#votes").html(0);
                } else {
                    $("#votes").html(data.votes);
                }

                changeVoteColor(data.votes);

            },"json")
        }
    );

    $("#upvote").on("click", function() {

        $.ajax({
            url: '/upvote',
            type: 'get',

            success: function(data, status, xhr) {
                $("#votes").html(data.votes);

                changeVoteColor(data.votes);
            }
        });
		
		/* $.ajax({
			url: '/upvote',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({id:index})
		});   */
    });

    $("#downvote").on("click", function() {

        $.ajax({
            url: '/downvote',
            type: 'get',

            success: function(data, status, xhr) {
                $("#votes").html(data.votes);

                changeVoteColor(data.votes);
            }
        });
		/* $.ajax({
			url: '/downvote',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({id:index})
		});   */
    });

    function changeVoteColor(numVotes) {
        if (numVotes < 0) {
            $("#votes").css('color', 'red');
        } else if (numVotes > 0) {
            $("#votes").css('color', 'lightgreen');
        } else {
            $("#votes").css('color', 'white');
        }
    };
});