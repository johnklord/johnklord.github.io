(function(){
  $(document).ready(function(){

    $("#coverLetter").load("../coverLetter.template.html",null,function(){
      $("#download-btn").click(function(e){
        console.log('cliekd');
        $("#page-size-selection-wrapper").toggleClass("invisible");
        $("#download-btn").toggleClass("hidden");
        $("#select-page-size-btn").toggleClass("hidden");
      })
      $("#select-page-size-btn").click(function(e){
        $("#page-size-selection-wrapper").toggleClass("invisible");
        $("#download-btn").toggleClass("hidden");
        $("#select-page-size-btn").toggleClass("hidden");
      })
      var companyName = window.location.pathname.slice(0,-1).split("/").pop();
      console.log(companyName);
      $("#a4-form").click(function(){
        window.location.href = '/pdfs/coverLetters/'+companyName+"/kyle_wang_"+companyName+"_coverLetter_a4.pdf";
      })
      $("#letter-form").click(function(){
        window.location.href = '/pdfs/coverLetters/'+companyName+"/kyle_wang_"+companyName+"_coverLetter_letter.pdf";
      })
      setTimeout(function(){
        document.body.dispatchEvent(new Event('view-ready'));
      },2000);
      $.ajax({
        url: "./coverLetter.md", 
        type: 'get', 
        dataType: 'html',
        async: true,
        success: function(data) {
          $("#markdown-content").html(marked(data));
        } 
      });
    });
  })
})();

