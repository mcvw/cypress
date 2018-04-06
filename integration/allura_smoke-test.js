//
// **** Allura Tests ****
//

var isLoggedIn = false;
var periods = ['Custom', 'Today', 'Yesterday', 'Last 7 days', 'This week', 'Last week', 'This month', 'Last month', 'QTD', 'YTD', 'Last year'];
var groupby = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
var statuses = ['Pending', 'Approved', 'Bonus', 'Total Value', 'Declined'];
var showing = ['Retailer revenue', 'Commission', 'Sales quantity'];

const alluraHome = () => {
	if (isLoggedIn === false)
		alluraLogin();
	
	// Click the 'intuAllura' button
	cy.get('span').contains('Allura').click();
	
	// Should display 'Welcome' text
	cy.get('h2').should('contain', 'Welcome');
	
	// Should be on the base URL which includes '/djanus/allura/'
	cy.url().should('include', '/djanus/allura/');
}

const alluraLogin = () => {
	if (isLoggedIn === false) {
		// Open url for Allura
		cy.visit('http://amigos.staging.intu.co.uk/djanus/allura/');
		
		// Should dislay the Login button
		cy.contains('Login');
				
		// Enter userid and password
		cy.get('input[name=username]')
			.type('root')
			.should('have.value', 'root');
		
		cy.get('input[name=password]')
			.type('passwordpassword')
			.should('have.value', 'passwordpassword');
			
		cy.get("input[name='csrfmiddlewaretoken']").then($input => {
			cy.setCookie('csrftoken', $input.val());
			cy.get('form').submit();
		});
		
		isLoggedIn = true;
	}
}

const alluraLogout = () => {
	cy.get('.dropdown').contains('root@toot.com').click();
	
	if (isLoggedIn === true)
		cy.contains('Logout').click();	
}

const analyticsPerformanceOverTime = (period, startDate, endDate, groupResults, txStatus, graphShowing) => {
	cy.get('.dropdown').contains('Analytics ').click();
	
	cy.contains('Performance over time').click();
	
	// Should be on a new URL which includes '/stats/performance-time'
	cy.url().should('include', '/stats/performance-time');
	
	potPeriod(period);
	potStartDate(startDate);
	potEndDate(endDate);
	potGroupResults(groupResults);
	potTxStatus(txStatus);
	potShowing(graphShowing);
	
	// Generate report
	cy.get('.btn-primary').should('contain', 'Generate Report').click();
}

const analyticsRetailerPerformance = () => {
	cy.get('.dropdown').contains('Analytics ');
	
	cy.contains('Retailer performance').click();
	
	// Should be on a new URL which includes '/stats/retailer-performance'
	cy.url().should('include', '/stats/retailer-performance');
	
	// Generate report
	cy.get('.btn-primary').should('contain', 'Generate Report').click()
}

const potPeriod = (period) => {
	cy.contains('Period');

	var str = 'select:eq(0) option:eq(PERIOD)';	
	var idx = periods.indexOf(period);
	var res = str.replace("PERIOD", idx);

	cy.get(res);
}

const potStartDate = (startDate) => {
	cy.contains('From');
	
	cy.get('input:eq(0)')
	.type(startDate)
	.should('have.value', startDate);
	
	/*
	cy.get('input:eq(0)').then(($el) => {
	
		const selector = cy.SelectorPlayground.getSelector($el);
	})
	*/
}

const potEndDate = (endDate) => {
	cy.contains('To');
	
	cy.get('input:eq(1)')
	.type(endDate)
	.should('have.value', endDate);
}

const potGroupResults = (groupResults) => {
	cy.contains('Group results');
	
	var str = 'select:eq(1) option:eq(GROUP)';	
	var idx = groupby.indexOf(groupResults);
	var res = str.replace("GROUP", idx);
	
	cy.get(res);
	/*
	if(groupBy == 'Daily')
		valueGroupBy = 'day'
		
	cy.get('select').then(function($select) {
		$select.val(valueGroupBy)
	})
	
	cy.get('select').should('have.value', valueGroupBy);
	*/
}

const potTxStatus = (txStatus) => {
	cy.contains('Status');

	var str = 'select:eq(2) option:eq(STATUS)';	
	var idx = statuses.indexOf(txStatus);
	var res = str.replace("STATUS", idx);
	
	cy.get(res);
}

const potShowing = (graphShowing) => {
	cy.contains('Graph showing');
	
	var str = 'select:eq(3) option:eq(SHOWING)';	
	var idx = showing.indexOf(graphShowing);
	var res = str.replace("SHOWING", idx);
	
	cy.get(res);
}


describe("Allura smoke test", function() {
	before(function() {
		// runs once before all tests in the block
		
		// Open url for Allura
		cy.visit('http://amigos.staging.intu.co.uk/djanus/allura/');
		
		// Should be on a new URL which includes '/stats/retailer-performance'
		cy.url().should('include', '/djanus/allura/');
	});
	
	after(function() {
		// runs once after all tests in the block
	})

	beforeEach(function() {
		// runs before each test in the block
	})

	afterEach(function() {
		// runs after each test in the block
	})
	  
	context('Setup', () => {	
		it('Login', function() {
			alluraLogin();
		});
		
		it('Allura Home', function() {
			alluraHome();
		});
	});
	
	context('Djanus Endpoints', () => {
		afterEach(() => {
			// Open url for Allura
			cy.visit('http://amigos.staging.intu.co.uk/djanus/allura/');
			
			// Should be on a new URL which includes '/stats/retailer-performance'
			cy.url().should('include', '/djanus/allura/');
		});
		
		/*
		it('Select Centres', function() {
			// Locate Centres and click
			cy.get('nav li').contains('Centres').click();
			
			// Should be on a new URL which includes '/allura/centres'
			cy.url().should('include', '/allura/centres');
		});

		
		it('Select Retailers', function() {
			// Locate Retailers and click
			cy.get('nav li').contains('Retailers').click();
			
			// Should be on a new URL which includes '/allura/retailers'
			cy.url().should('include', '/allura/retailers');
		});
		
		
		it('Select Affiliate networks', function() {
			// Locate Affiliate networks and click
			cy.get('.nav').contains('Affiliate networks').click();
			
			// Should be on a new URL which includes '/allura/affiliate_networks'
			cy.url().should('include', '/allura/affiliate_networks');
		});
		
		
		it('Select Integrations', function() {
			// Locate Integrations and click
			cy.get('.nav').contains('Integrations').click();
			
			// Should be on a new URL which includes '/allura/retailer_integrations'
			cy.url().should('include', '/allura/retailer_integrations');
		});
		*/
	});
	
	context('Djanus Analytics', () => {
		before(() => {
			// do something before ALL scenario
			//alluraHome();
		});

		beforeEach(() => {
			//cy.visit('http://amigos.staging.intu.co.uk/djanus/allura/');
		});
	
		it('Select Performance Over Time', function() {
			// Select PoT
			analyticsPerformanceOverTime('Last year', '2017-01-01', '2017-12-31', 'Daily', 'Total Value', 'Retailer revenue');
		});
		
		it('Select RetailerPerformance', function() {
			// Select Retailer Performance
			//analyticsRetailerPerformance();
		});
	});
	

	context('Teardown', () => {
		it('Home', function() {
			// Click the 'intuAllura' button
			//alluraHome(true);
		});

		it('Logout', function() {
			// Logout from Allura
			//alluraLogout(true)
		});
	});
})