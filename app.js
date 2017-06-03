var googleFontUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBxzFarVQQ7DZrN8SDz4wMuikwd4Abx51w';

   // global state object //

var state = {
   pages: [], 
   fonts: [],
   loadedFonts: []
};

$.getJSON(googleFontUrl, function(data) {
   var getArray = data.items;
   var filesArray = [];
   for (var i = 0; i < getArray.length; i++) {
       state.fonts.push(getArray[i]['family']);
       filesArray.push(getArray[i]['files']['regular']);
   } 

  function makeWebFontConfig() {
  //console.log(state.fonts); 
    return {
      google: {
          families: [getRandomFont(state.fonts)]
        },
        fontloading: function(familyName, fvd) {     
          console.log(familyName);
          addLoadedFont(familyName);
      }
    }
  } 
  WebFont.load(makeWebFontConfig());

  function getRandomFont(fontArray) {
    //console.log(fontArray);
     var min = 1;
     var max = fontArray.length;
     var randomFont = [];
     randomFont.push(fontArray[Math.floor(Math.random() * (max - min + 1)) + min]);
     var stringFont = randomFont.join('');
     //console.log(stringFont);
     return stringFont;
  }
  
  var pageDataAttr = 'data_id';  

  var pageElement = $('.pages');

     // variable to hold pageTemplate //

  var pagesTemplate = (
          "<div class='page_container'>" +
            "<button class='button_h'>Heading font</button>" +
              "<h1 class='heading on'>" +
              "</h1>" +
              "<p class='paragraph on'>" +
              "</p>" +
              "<button class='button_p'>Paragraph font</button>" +
              "<span><textarea class='hidden heading-changer' type='text' placeholder='Add heading text'></textarea></span>" +
              "<span><textarea class='hidden paragraph-changer' type='text' placeholder='Add paragraph text'></textarea></span>" +
            "<button class='delete'>" +
                "<span>Delete page</span>" +
            "</button>" +
          "</div>" 
     );

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
      .text(page.heading);
      renderHeadingFont(page, element.find('h1'));
     element.find('p')
      .text(page.paragraph)
      renderParagraphFont(page, element.find('p'));
     element.attr(pageDataAttr, pageIndex);
     return element;
  }

  function addLoadedFont(familyName) {
      state.loadedFonts.push(familyName);
  }

  function renderHeadingFont(page, element) {
    return element.css('font-family', page.headingFont);
  }

  function renderParagraphFont(page, element) {
    return element.css('font-family', page.paragraphFont);
  }

  function renderPages(state, pageElement, pageDataAttr) {
     var pagesHTML = state.pages.map(
       function(page, pageIndex) {
       return renderPage(page, pageIndex, pagesTemplate, pageDataAttr); 
     });
     pageElement.html(pagesHTML);
  }

    // event listeners //

  function handleAddPage(spec) {
    addPage(spec);
    renderPages(state, pageElement, pageDataAttr);
  }

  function handleHeadingText(pageDataAttr, pageElement, state) {
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

  function handleParagraphText(pageDataAttr, pageElement, state) {
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

  function handleHeadingFont(pageDataAttr, pageElement, state, font) {
    $('.pages').on('click', '.button_h', function(event) {
      event.preventDefault();
      var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
      WebFont.load(makeWebFontConfig());
      console.log(state.loadedFonts);
      updatePage(state, pageIndex, { headingFont: state.loadedFonts.splice(0, 818) }); 
      renderPages(state, pageElement, pageDataAttr);
    });
  }
  

  function handleParagraphFont(pageDataAttr, pageElement, state, font) {
    $('.pages').on('click', '.button_p', function(event) {
      event.preventDefault();
      var pageIndex = parseInt($(this).closest('.page_container').attr(pageDataAttr));
      WebFont.load(makeWebFontConfig());
      console.log(state.loadedFonts);
      updatePage(state, pageIndex, { paragraphFont: state.loadedFonts.splice(0, 818) });
      renderPages(state, pageElement, pageDataAttr);
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
  //handleAddPage({}); 
  handleHeadingText(pageDataAttr, pageElement, state);
  handleParagraphText(pageDataAttr, pageElement, state);
  handleHeadingFont(pageDataAttr, pageElement, state);
  handleParagraphFont(pageDataAttr, pageElement, state);
  handlePageDeletes(pageDataAttr, pageElement, state);   

  $(function() {
    $('.add').fadeIn('slow')
      .on('click', function() {
      handleAddPage({});
    });
  });
});  

