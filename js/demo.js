var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {

  $('.error').css("display", "none");
  $('.ErrorDiv').css("display", "none");
  $scope.loading= false;
  let params = (new URL(document.location)).searchParams;
  $scope.demoId = params.get("demoId");
  $scope.flag = 0;
  var date = new Date();
  var currentDate = date.toISOString().slice(0, 10);
  document.getElementById('currentDate').value = currentDate;

  $scope.appointmentDate = "";
  $scope.appointmentTime = "";
  $scope.companyName = "";
  $scope.companySize = "";
  $scope.currentTMSSystem = "";
  $scope.email = "";
  $scope.title = "";
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.location = "";
  $scope.phoneNumber = "";
  $scope.date = new Date();
  $scope.TodayDate = new Date();
  $scope.DatesList = [];
  $scope.TodayDatesList = [];

  $scope.ConstDatesList = [
    { time: "10:00", flag: 0 },
    { time: "11:00", flag: 0 },
    { time: "13:00", flag: 0 },
    { time: "14:00", flag: 0 },
    { time: "15:00", flag: 0 },
    { time: "16:00", flag: 0 }
  ];

  $scope.GetPageLoadData = function () {
    if ($scope.demoId != null || $scope.demoId != undefined || $scope.demoId == '') {
      $scope.flag = 1;
      $http({
        method: "Get",
        url: "https://uslfassvi0.execute-api.us-east-1.amazonaws.com/sandbox-test/demo?demoId=" + $scope.demoId,
        data: {}
      }).then(function mySuccess(response) {
        debugger
        var tempData = response.data.data;
        $scope.companyName = tempData.companyName;
        $scope.firstName = tempData.firstName;
        $scope.lastName = tempData.lastName;
        $scope.companySize = tempData.companySize;
        $scope.email = tempData.email;
        $scope.phoneNumber = tempData.phoneNumber;
        $scope.date = new Date(tempData.appointmentDate);
        $scope.appointmentTime = tempData.appointmentTime;
        $scope.currentTMSSystem = tempData.currentTMSSystem;
        $scope.ClearTimes1();
        var index = $scope.ConstDatesList.findIndex(t => t.time == $scope.appointmentTime)
        if (index > -1)
            $scope.ConstDatesList[index].flag = 0;
      },
        function myError(response) {
        });
    }
  }

  $scope.ChooseDate = function () {
    var date = new Date().toISOString().slice(0, 10);
    $http({
      method: "Get",
      url: "https://uslfassvi0.execute-api.us-east-1.amazonaws.com/sandbox-test/demo",
      data: {}
    }).then(function mySuccess(response) {
      $scope.DatesList = response.data;
      $scope.TodayDatesList = $scope.DatesList.filter(a => a.date == date);
      if ($scope.TodayDatesList.length) {
        for (var i = 0; $scope.ConstDatesList.length > i; ++i) {
          var index = $scope.ConstDatesList.findIndex(t => t.time == $scope.TodayDatesList[i].time)
          if (index > -1)
            $scope.ConstDatesList[index].flag = 1;
        }
        console.log($scope.ConstDatesList);
      }
    }, function myError(response) {
      //$scope.myWelcome = response.statusText;
    });
  }

  $scope.ChooseDate1 = function (date) {
    $scope.ClearTimes();
    var date = $scope.date.toISOString().slice(0, 10);
    $scope.TodayDatesList = $scope.DatesList.filter(a => a.date == date);
    if ($scope.TodayDatesList.length) {
      for (var i = 0; $scope.ConstDatesList.length > i; ++i) {
        var index = $scope.ConstDatesList.findIndex(t => t.time == $scope.TodayDatesList[i].time)
        if (index > -1)
          $scope.ConstDatesList[index].flag = 1;
      }
      //console.log($scope.ConstDatesList);
    }
  }

  $scope.DTime = "Select Time";
  $scope.TimeArray = {
    time: "Select Time"
  }

  $scope.SelectedTime = function (time) {
    $scope.appointmentTime = time;
  }

  function DateFormate(today) {
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    return today
  }


  $scope.submit = function () {
    if($scope.firstName === ""||$scope.firstName === undefined||$scope.firstName=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter First Name";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
    }
    if($scope.lastName === ""||$scope.lastName === undefined||$scope.lastName=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter Last Name";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
    }
    if($scope.companyName === ""||$scope.companyName === undefined||$scope.companyName=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter Company Name";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
    }
    if($scope.currentTMSSystem === ""||$scope.currentTMSSystem === undefined||$scope.currentTMSSystem=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter Current TMS ";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
      
    }
    if($scope.email === ""||$scope.email === undefined||$scope.email=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter Email";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
    }
    if($scope.phoneNumber === ""||$scope.phoneNumber === undefined||$scope.phoneNumber=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter Mobile Number";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
    }
    if($scope.companySize === ""||$scope.companySize === undefined||$scope.companySize=== null){
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage = "Please Enter Company Size";
      setTimeout(function () {
          $('.ErrorDiv').css("display", "none");
      }, 5000);
      return 0;
    }
    if($scope.date === ""||$scope.date === undefined||$scope.date=== null){
      alert("Please Select Date")
      return false;
    }
    if($scope.appointmentTime === ""||$scope.appointmentTime === undefined||$scope.appointmentTime=== null){
      alert("Please Select Time")
      return false;
    }
    $scope.loading=true;
    $http({
      method: "Post",
      url: "https://uslfassvi0.execute-api.us-east-1.amazonaws.com/sandbox-test/demo ",
      data: {
        "appointmentDate": DateFormate($scope.date),
        "appointmentTime": $scope.appointmentTime,
        "companyName": $scope.companyName,
        "companySize": $scope.companySize,
        "title": "",
        "email": $scope.email,
        "firstName": $scope.firstName,
        "lastName": $scope.lastName,
        "phoneNumber": $scope.phoneNumber,
        "currentTMSSystem": $scope.currentTMSSystem
      }
    }).then(function mySuccess(response) {
      $scope.loading = false;
      $scope.myWelcome = response.data;
      $('.ErrorDiv').css("display", "block");
      $scope.ErrorMessage ='Successfully scheduled a call. Email has been sent. If you do not see the email in a few minutes, check your “junk mail” folder or “spam” folder. We make every effort to ensure that these emails are delivered.'
      setTimeout(function () { location.reload(); }, 5000);
      //alert(response.data.message + " ! " + "mail has been sent")
    }, function myError(response) {
      $scope.loading= false;
      $scope.myWelcome = response.statusText;
      alert(response.data.message + " ! " +"server unavailable")
      setTimeout(function () { location.reload(); }, 2000);
    });
  }

  $scope.ClearTimes = function () {
    $scope.ConstDatesList = [
      { time: "10:00", flag: 0 },
      { time: "11:00", flag: 0 },
      { time: "13:00", flag: 0 },
      { time: "14:00", flag: 0 },
      { time: "15:00", flag: 0 },
      { time: "16:00", flag: 0 }
    ];
  }

  $scope.ClearTimes1 = function () {
    $scope.ConstDatesList = [
      { time: "10:00", flag: 1 },
      { time: "11:00", flag: 1 },
      { time: "13:00", flag: 1 },
      { time: "14:00", flag: 1 },
      { time: "15:00", flag: 1 },
      { time: "16:00", flag: 1 }
    ];
  }
});