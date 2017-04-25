    // variable for dataAttr //

    var pageDataAttr = 'data_id';  

    var pageElement = $('.pages');

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

    function renderPage(page, pageIndex, pageTemplate, pageDataAttr) {   /* function renders the page element on the DOM */
      var element = $(pageTemplate);
      element.find('.page').text(page.heading);
      element.attr(pageDataAttr, pageIndex);
      return element;
    }
    
    function renderPages(state, pageElement, pageDataAttr) {
      var pagesHTML = state.pages.map(
        function(page, pageIndex) {
          return renderPage(page, pageIndex, pagesTemplate, pageDataAttr);  // why isn't pagesTemplate variable recognized? //
      });
      pageElement.html(pagesHTML);
    }

    function contentHandler(page, heading, paragraph) {
      $('.button_h').on('click', function() {
        $('h1').text(page.heading);
      });
      $('.button_p').on('click', function() {
        $('p').fadeIn('slow').text(page.paragraph);
      });
    }


    addPage('this is heading', 'paragraph content', 0);
    addPage('more heading content', 'additional content', 1);
    addPage('more heading', 'more paragraph', 2);
    console.log(renderPage(getPage(state, 0), 0, pagesTemplate, pageDataAttr));
    renderPages(state, pageElement, pageDataAttr);
    contentHandler((getPage(state, 0), getPage(state, 0), getPage(state, 0)));