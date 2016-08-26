angular.module('starter.controllers')

.controller('WeekTrackController', function($scope, WeekTrack, UserService, moment) {
	
	var _this = $scope;
	_this.prev_week = null;
	_this.curr_week = 4;
	_this.next_week = 5;
	_this.mother_text = '';
	_this.baby_text = '';

	var calculateNextAndPrevWeek = function() {
		_this.prev_week = null;
		_this.next_week = null;

		console.log('current week --->', _this.curr_week);
		if(_this.curr_week > 4) {
			_this.prev_week = _this.curr_week - 1;
		}
		if(_this.curr_week < 42) {
			_this.next_week = _this.curr_week + 1;
		}

		if(_this.curr_week != 4) {
			_this.prev_week_show = '<Week ' + ("0" + _this.prev_week).slice(-2);
		}
		
		if(_this.curr_week != 42) {
			_this.next_week_show = 'Week ' + ("0" + _this.next_week).slice(-2) + '>';
		}
		
		_this.curr_week_show = 'Week ' + ("0" + _this.curr_week).slice(-2);

	};

	var getWeekAndShowData = function() {
		var week = _this.curr_week;
		var data = WeekTrack.getTrackerForWeek(week.toString());
		_this.mother_text = data['motherText'];
		_this.baby_text = data['babyText'];
	};

	UserService.getUser(function(userObj){
		var startDate = userObj['pregnancy_start_date'];

		if(startDate) {
			// console.log('startDate--------->', startDate);
			// if startDate is present, means user is pregnant.
			// calculate current pregnancy week

			startDate = moment(startDate, 'LL');

			//get todays date
            var today = moment();
            _this.curr_week =  today.diff(startDate, 'week');
		}

		calculateNextAndPrevWeek();
		getWeekAndShowData();

	}, function(){
		// console.log('userObj-----------> ERROR');
		getWeekAndShowData();
	});

  	$scope.showPrev = function(){
  		if(_this.prev_week == null) {
  			return;
  		}
  		_this.curr_week -= 1;
  		calculateNextAndPrevWeek();
  		getWeekAndShowData();
  	};

  	$scope.showNext = function(){
  		if(_this.next_week == null) {
  			return;
  		}
  		_this.curr_week += 1;
  		calculateNextAndPrevWeek();
  		getWeekAndShowData();
  	};
});