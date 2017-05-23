var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

var state = {
   pages: []  
};

$.getJSON(googleFontUrl, function(data) {
   var getArray = data.items;
   var fontsArray = [];
   var filesArray = [];
   for (var i = 0; i < getArray.length; i++) {
       fontsArray.push(getArray[i]['family']);
       filesArray.push(getArray[i]['files']['regular']);
   } 

function makeWebFontConfig() { 
   return {
       google: {
           families: getRandomFont(fontsArray)
       },
       fontloading: function(familyName, fvd) {
       //console.log(familyName);  
       }
   }
}
WebFont.load(makeWebFontConfig());

function getRandomFont(fontArray) {
   var min = 1;
   var max = fontArray.length;
   var randomFont = [];
   randomFont.push(fontArray[Math.floor(Math.random() * (max - min + 1)) + min]);
   //console.log(randomFont);
   return randomFont;
}

var pageDataAttr = 'data_id';  

var pageElement = $('.pages');
   //console.log($('.pages'));
   //console.log(pageElement);

   // variable to hold pageTemplate //

var pagesTemplate = (
        "<div class='page_container'>" +
          "<button class='button_h'>Heading font</button>" +
            "<h1 class='heading on'>" +
            "</h1>" +
            "<span><textarea class='hidden heading-changer' type='text' placeholder='Change heading'></textarea></span>" +
          "<button class='button_p'>Paragraph font</button>" +
            "<p class='paragraph on'>" +
            "</p>" +
            "<span><textarea class='hidden paragraph-changer' type='text' placeholder='Change paragraph'></textarea></span>" +
          "<button class='delete'>" +
              "<span>Delete page</span>" +
          "</button>" +
        "</div>" 
   );

   // global state object //

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

/* show Ben */

function handleAddPage(spec) {
  addPage(spec);
  renderPages(state, pageElement, pageDataAttr);
}

  /* show Ben */

function handleFontChange(pageDataAttr, pageElement, state, font) {
  $('.pages').on('click', '.button_h', function(event) {
    event.preventDefault();
    var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
    updatePage(state, pageIndex, { headingFont: font }, {paragraphFont: font});
    renderPages(state, pageElement, pageDataAttr);
  });
}

function handleHeadingUpdates(pageDataAttr, pageElement, state) {
  $('.pages').on('keyup', '.heading-changer', function(event) {
    event.preventDefault();
    var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
    //console.log(($(this).val()));
    if (event.which === 13) { 
      updatePage(state, pageIndex, { heading: $(this).val() });
      renderPages(state, pageElement, pageDataAttr);
    }
  });
}

function handleParagraphUpdates(pageDataAttr, pageElement, state) {
  $('.pages').on('keyup', '.paragraph-changer', function(event) {
    event.preventDefault();
    var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
    //console.log(($(this).val()));
    if (event.which === 13) { 
      updatePage(state, pageIndex, { paragraph: $(this).val() });
      renderPages(state, pageElement, pageDataAttr);
    }
  });
}

function handlePageDeletes(pageDataAttr, pageElement, state) {
  $('.pages').on('click', '.delete', function(event) {
    var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
    deletePage(state, pageIndex);
    renderPages(state, pageElement, pageDataAttr);
  });
}

renderPages(state, pageElement, pageDataAttr);
handleAddPage({});
handleFontChange(pageDataAttr, pageElement, state);
handleHeadingUpdates(pageDataAttr, pageElement, state);
handleParagraphUpdates(pageDataAttr, pageElement, state);
handlePageDeletes(pageDataAttr, pageElement, state);   

$(function() {
  $('.add').on('click', function() {
    handleAddPage({});
  });
});

   // custom event handling //

   // heading class toggle //
/*$(function() {
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
});*/
//console.log(state.pages);
});
