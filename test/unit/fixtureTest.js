describe('Testing Machines', function(){
    'use strict';

    beforeEach(inject(function(){
        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures';
    }));


    it('list loading', function(){
        var fix = getJSONFixture('machine1.json');
        console.log(fix);

    });
});
