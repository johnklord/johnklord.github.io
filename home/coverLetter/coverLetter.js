(function(){
  $(document).ready(function(){
    var pageSizeSelectionWrapper = $("#page-size-selection-wrapper");
    var selectPageSizeBtn = $("#select-page-size-btn");
    var downloadBtn =  $("#download-btn");

    setTimeout(function(){
      document.body.dispatchEvent(new Event('view-ready'));
    },2000);

    downloadBtn.click(function(e){
      pageSizeSelectionWrapper.toggleClass("invisible");
      downloadBtn.toggleClass("hidden");
      selectPageSizeBtn.toggleClass("hidden");
    })
    selectPageSizeBtn.click(function(e){
      pageSizeSelectionWrapper.toggleClass("invisible");
      downloadBtn.toggleClass("hidden");
      selectPageSizeBtn.toggleClass("hidden");
    })
  })
})();

