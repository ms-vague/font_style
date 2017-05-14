
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
            "<button class='delete'>Delete page</button>" +
        "</div>" 
   );

//var removeIdentifier = $('.delete');

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

function handlePageDeletes(pageDataAttr, pageElement, state) {
  $('.pages').on('click', '.delete', function(event) {
    console.log($(event.target));
    var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
    deletePage(state, pageIndex);
    renderPages(state, pageElement, pageDataAttr);
  });
}

addPage({
     heading: "heading name",
     paragraph: "paragraph",
     headingFont: 'Monospace',
     paragraphFont: 'Verdana'
   });
addPage({
     heading: "Cavafy",
     paragraph: "Blah blah blah in Greek",
     headingFont: 'Garamond',
     paragraphFont: 'Monospace'
   });
addPage({
     heading: "OB",
     paragraph: "Return June 10th",
     headingFont: 'Times New Roman',
     paragraphFont: 'Georgia'
   });
renderPages(state, pageElement, pageDataAttr);
//updatePage(state, 0, {heading: 'new heading'});
handlePageDeletes(pageDataAttr, pageElement, state);   

   // custom event handling //

   // heading class toggle //

$(function() {
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
});