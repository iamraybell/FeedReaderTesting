
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        /* This tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a url', function(){
            allFeeds.forEach(function(item){
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            })
         })

        /* This loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name', function(){
            allFeeds.forEach(function(item){
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);

            })
         })

    });

    /*This this the menu
    */
    describe('The menu', function(){
        var menu;

        beforeEach(function(){
            menu = $('.slide-menu');
            console.log($('.slide-menu').offset());
        })

        /* This ensures the menu element is
         * hidden by default.
         */
        it('should start hidden', function(){
            expect(menu.offset().left).toBe(-192);
        })

         /* This ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and it hides when clicked again.
          */
        it('should change visibility correctly', function(){
            var body = $('body');
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect(body.attr('class')).not.toContain('menu-hidden');
            menuIcon.trigger('click');
            expect(body.attr('class')).toContain('menu-hidden');
        })
    })

    /* This tests the initial entries in the .feed container.
    */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            })
        })

        /* This tests that there is at least
         * a single .entry element within the .feed container.
         */

        it('contains a entry', function(done){
            var container = $('.feed');
            expect(container.html().length).not.toBe(0);
            done();
        })
    })

    // This tests the new feed changes.
    describe('New Feed Selection', function(){
        var startId  = 0;
        var oldEntries;
        beforeEach(function(done){
            loadFeed(startId, function(){
                oldEntries = $('.feed').html();
                done();
            })
        })
        beforeEach(function(done){
            loadFeed(startId+1, function(){
                newEntries = $('.feed').html();
                done();
            })
        })

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes contents', function(done){
            expect(newEntries).not.toBe(oldEntries);
            done();
        })
    })
}());
