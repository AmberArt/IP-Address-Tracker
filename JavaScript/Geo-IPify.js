<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
{/* <script type="text/javascript"> */}
    var ip = "8.8.8.8";
    var api_key = "your_api_key";
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
               $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
           }
       });
    });