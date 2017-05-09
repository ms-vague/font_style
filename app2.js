
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

function addPage(spec) {
   state.pages.push(spec);
}

function getPage(state, pageIndex) {
   return state.pages[pageIndex];
}

function updatePage(state, pageIndex, newSpecs) {
   Object.keys(newSpecs).forEach(function(spec) {
    state.pages[pageIndex][spec] = newSpecs[spec];
   });
};

function deletePage(state, pageIndex) {
  state.pages.splice(pageIndex, 1);
};

   // DOM manipulation //

function renderPage(page, pageIndex, pageTemplate, pageDataAttr) {   /* function renders the page element on the DOM */
   var element = $(pageTemplate);
   element.find('h1')
    .text(page.heading)
    .css('font-family', page.headingFont);
   element.find('p')
    .text(page.paragraph)
    .css('font-family', page.paragraphFont);
   element.attr(pageDataAttr, pageIndex);
   return element;
}

function renderPages(state, pageElement, pageDataAttr) {
   var pagesHTML = state.pages.map(
     function(page, pageIndex) {
     return renderPage(page, pageIndex, pagesTemplate, pageDataAttr); 
   });
   pageElement.html(pagesHTML);
}

addPage({
     heading: "heading name",
     paragraph: "paragraph",
     id: 0,
     headingFont: 'Monospace',
     paragraphFont: 'Verdana'
   }, 0);
addPage({
     heading: "Cavafy",
     paragraph: "Blah blah blah in Greek",
     id: 0,
     headingFont: 'Garamond',
     paragraphFont: 'Monospace'
   }, 1);
addPage({
     heading: "OB",
     paragraph: "Back on June 10th",
     id: 0,
     headingFont: 'Times New Roman',
     paragraphFont: 'Georgia'
   }, 2);
updatePage(state, 0, {heading: 'new heading'});
//deletePage(state, 0);
renderPages(state, pageElement, pageDataAttr);

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

  $('.pages').on('click', '.button_h', function() {
    var container = $(this).closest('.page_container');
    container.find('.heading').trigger('heading:toggle');
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

  $('.pages').on('click', '.button_p', function() {
    var container = $(this).closest('.page_container');
    container.find('.paragraph').trigger('heading:toggle');
  });
