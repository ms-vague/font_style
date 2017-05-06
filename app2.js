var pageDataAttr = 'data_id';  

var pageElement = $('.pages');
   //console.log($('.pages'));
   //console.log(pageElement);

   // variable to hold pageTemplate //

var pagesTemplate = (
        "<div class='page_container'>" +
          "<button class='button_h'>Change heading</button>" +
            "<h1 class='heading on'>" +
            "</h1>" +
          "<button class='button_p'>Change paragraph</button>" +
            "<p class='paragraph on'>" +
            "</p>" +
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

   // custom event handling //

   // heading class toggle //

$('.pages').on('heading:toggle', '.heading', function(event) {
  var heading = $(this);
  if (heading.is('.on')) {
    heading.removeClass('on').addClass('off');
  } else {
    heading.removeClass('off').addClass('on');
  }
});

$('.pages').on('click', '.button_h', function(event) {
  event.preventDefault();
  var container = $(this).closest('.page_container');
  container.find('.heading').trigger('heading:toggle', {
    $element:container.find('.heading')
  });
});

  // paragraph class toggle //

  $('.pages').on('heading:toggle', '.paragraph', function(event) {
  var paragraph = $(this);
  if (paragraph.is('.on')) {
    paragraph.removeClass('on').addClass('off');
  } else {
    paragraph.removeClass('off').addClass('on');
  }
});

$('.pages').on('click', '.button_p', function(event) {
  event.preventDefault();
  var container = $(this).closest('.page_container');
  container.find('.paragraph').trigger('heading:toggle', {
    $element:container.find('.paragraph')
  });
});
