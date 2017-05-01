var pageDataAttr = 'data_id';  

var pageElement = $('.pages');
   //console.log($('.pages'));
   //console.log(pageElement);

   // variable to hold pageTemplate //

var pagesTemplate = (
       "<div class='page'>" +
         "<h1>" +
         "</h1>" +
         "<p>" + 
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

addPage('this is heading', 'paragraph content', 0);
addPage('more content for heading', 'this is additional content for paragraph', 1);

   // event handling //

$(function() {
 $('.button_h').click(function(font) {
   //alert('test');
   $('h1:first').addClass('.change_font').text('Something.');
 });
 $('.button_p').click(function(font) {
   //alert('test');
   $('p:first').addClass('.change_font').text('Something else.');
 });
});