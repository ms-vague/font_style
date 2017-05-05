var pageDataAttr = 'data_id';  

var pageElement = $('.pages');
   //console.log($('.pages'));
   //console.log(pageElement);

   // variable to hold pageTemplate //

var pagesTemplate = (
      "<div class='page_container'>" +
        "<div class='page_heading'>" +
          "<h1 class='on'>" +
          "</h1>" +
        "</div>" +
        "<div class='page_paragraph'>" +
          "<p class='on'>" +
          "</p>" +
        "</div>" +
      "</div>"
   );

   // global state object //

var state = {
   pages: []    
};

function addPage(heading, paragraph, id) {
   state.pages.push({
     heading: heading,
     paragraph: paragraph,
     id: id
   });
}

function getPage(state, pageIndex) {
   return state.pages[pageIndex];
}

   // DOM manipulation //

function renderPage(page, pageIndex, pageTemplate, pageDataAttr, font) {   /* function renders the page element on the DOM */
   var element = $(pageTemplate);
   element.find('h1').text(page.heading).css('font-family', font);
   element.find('p').text(page.paragraph).css('font-family', font);
   element.attr(pageDataAttr, pageIndex);
   return element;
}

function renderPages(state, pageElement, pageDataAttr, font) {
   var pagesHTML = state.pages.map(
     function(page, pageIndex) {
     return renderPage(page, pageIndex, pagesTemplate, pageDataAttr, font); 
   });
   pageElement.html(pagesHTML);
}

addPage('Heading', 'Paragraph', 0);

   // event handling //

$('h1').on('font:change', function(event) {
  var headingStyle = $(this);
  if (headingStyle.is('.on')) {
    headingStyle.removeClass('on').addClass('off');
  } else {
    headingStyle.removeClass('off').addClass('on'); 
  }
});

$('.button_h').click(function() {
  var heading = $(this).closest('.pages');
  heading.find('h1').trigger('font:change');
});

