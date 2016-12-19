(function(){
  $(document).ready(function(){
    (function addEmailLink(){
      var email = $("#email");
      var emailAddr = email.text().trim();
      var subject= "Hey Kyle!";
      var body = "I saw your resume! I really liked it!";
      email.wrapInner('<a href="mailto:'+emailAddr+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)+'">');
    })();
    (function addGoogleMapLink(){
      var addressEle = $("#address");
      var address = addressEle.text().trim();
      var link = "http://maps.google.com/?q="+address;
      addressEle.wrapInner('<a target="_blank" href="'+link+'">');
    })();
    //setTimeout(function(){
      //document.body.dispatchEvent(new Event('view-ready'));
    //},3000);
  })
})();

